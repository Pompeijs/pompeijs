import { PompeiError } from '../../utils/errors';

import Renderer from '../../Renderer';
import Scene from '../../Scene';

import { Vector3 } from '../../Core/Vector';
import Quaternion from '../../Core/Quaternion';
import Matrix from '../../Core/Matrix';

import Core from '../../Core/Core';

import SceneNode from '../../SceneNodes/SceneNode';
import MeshSceneNode from '../../SceneNodes/MeshSceneNode';
import LightSceneNode from '../../SceneNodes/LightSceneNode';

import Mesh from '../../Mesh/Mesh';
import VertexBuffer from '../../Core/VertexBuffer';

import GlTFShadersSupport from './GlTFShadersSupport';

import Loader from '../Loader';
import LoaderPlugin from '../Loader';

class EComponentType {
  static get BYTE() { return 5120; }
  static get UNSIGNED_BYTE() { return 5121; }
  static get SHORT() { return 5122; }
  static get UNSIGNED_SHORT() { return 5123; }
  static get FLOAT() { return 5126; }
}

let getByteStrideFromType = (accessor) => {
    // Needs this function since "byteStride" isn't requiered in glTF format
    let type = accessor.type;

    switch (type) {
        case "VEC2": return 2;
        case "VEC3": return 3;
        case "VEC4": return 4;
        case "MAT2": return 4;
        case "MAT3": return 9;
        case "MAT4": return 16;
        default: return 1;
    }
};

let getBufferFromAccessor = (gltfRuntime, accessor) => {
    let bufferView = gltfRuntime.bufferViews[accessor.bufferView];
    let arrayBuffer = gltfRuntime.loadedArrayBuffers[bufferView.buffer];

    var byteOffset = accessor.byteOffset + bufferView.byteOffset;
    var count = accessor.count * getByteStrideFromType(accessor);
    
    switch (accessor.componentType) {
        case EComponentType.BYTE: return new Int8Array(arrayBuffer, byteOffset, count);
        case EComponentType.UNSIGNED_BYTE: return new Uint8Array(arrayBuffer, byteOffset, count);
        case EComponentType.SHORT: return new Int16Array(arrayBuffer, byteOffset, count);
        case EComponentType.UNSIGNED_SHORT: return new Uint16Array(arrayBuffer, byteOffset, count);
        default: return new Float32Array(arrayBuffer, byteOffset, count);
    }
};

let createMeshes = (gltfRuntime, device) => {
  let gltfMeshes = gltfRuntime.meshes;
  let meshes = [];
  
  if (!gltfMeshes) {
    return meshes;
  }
  
  for (let meshKey in gltfMeshes) {
    let gltfMesh = gltfMeshes[meshKey];
    let vertexBuffers = [];
    
    for (let i=0; i < gltfMesh.primitives.length; i++) {
      let gltfPrimitive = gltfMesh.primitives[i];
      if (gltfPrimitive.primitive !== 4) {
        continue;
      }
      
      let vertexBuffer = new VertexBuffer();
      
      // Positions, normals and uvs
      for (let semantic in gltfPrimitive.attributes) {
        let accessor = gltfRuntime.accessors[gltfPrimitive.attributes[semantic]];
        let buffer = getBufferFromAccessor(gltfRuntime, accessor);
        
        if (semantic === "NORMAL") {
          vertexBuffer.normals = buffer;
        }
        else if (semantic === "POSITION") {
          vertexBuffer.positions = buffer;
        }
        else if (semantic.indexOf("TEXCOORD_") !== -1) {
          vertexBuffer.uvs = buffer;
        }
      }
      
      // Indices
      let accessor = gltfRuntime.accessors[gltfPrimitive.indices];
      let buffer = getBufferFromAccessor(gltfRuntime, accessor);
      vertexBuffer.indices = buffer;
      
      vertexBuffers.push(vertexBuffer);
    }
    
    if (vertexBuffers.length === 0) {
      continue;
    }
    
    let mesh = new Mesh(vertexBuffers, device.scene);
    mesh.id = meshKey;
    mesh.name = gltfMesh.name;
    mesh.finish();
    meshes.push(mesh);
  }
};

let createNodes = (gltfRuntime, device) => {
  // Create nodes
  for (let nodeKey in gltfRuntime.nodes) {
    
    let node = null;
    let gltfNode = gltfRuntime.nodes[nodeKey];
    let shaderMaterials = [];
    
    // Lights
    if (gltfNode.light) {
      node = new LightSceneNode(gltfNode.name, device.scene);
    }
    // MeshSceneNode
    else if (gltfNode.meshes) {
      let meshCache = device.scene.meshCache;
      let meshes = [];
      
      node = new MeshSceneNode(gltfNode.name, device.scene);
      
      for (let i=0; i < gltfNode.meshes.length; i++) {
        let mesh = meshCache.getMeshById(gltfNode.meshes[i]);
        if (!mesh) {
          continue;
        }
        meshes.push(mesh);
        
        let gltfMesh = gltfRuntime.meshes[gltfNode.meshes[i]];
        for (let i=0; i < gltfMesh.primitives.length; i++) {
          shaderMaterials.push(device.renderer.materialRenderer.getShaderMaterialById(gltfMesh.primitives[i].material));
        }
      }
      
      node.meshes = meshes;
      
      for (let i=0; i < shaderMaterials.length; i++) {
        node.materials[i].shaderMaterial = shaderMaterials[i];
      }
    }
    else {
      node = new SceneNode(gltfNode.name, device.scene);
    }
    
    // Configure node transforms
    if (node) {
      node.id = nodeKey;
      
      if (gltfNode.matrix) {
        node.worldMatrix = new Matrix(gltfNode.matrix);
      }
      else {
        node.position.set(gltfNode.translation);
        node.scale.set(gltfNode.scale);
        
        let gltfRotation = gltfNode.rotation;
        let axis = new Vector3(gltfRotation[0], gltfRotation[1], gltfRotation[2]);
        let angle = gltfRotation[3];
        let rotationQuaternion = new Quaternion().fromAngleAxis(axis, angle);
        rotationQuaternion.toEuler(node.rotation);
      }
    }
  }
  
  // Resolve parenting
  for (let nodeKey in gltfRuntime.nodes) {
    let gltfNode = gltfRuntime.nodes[nodeKey];
    
    let parent = device.scene.getNodeById(nodeKey);
    if (!parent) {
      continue;
    }
    
    for (let i=0; i < gltfNode.children.length; i++) {
      let child = device.scene.getNodeById(gltfNode.children[i]);
      if (!child) {
        continue;
      }
      
      child.parent = parent;
      child.updateAbsoluteTransformation();
    }
  }
};

let loadBuffers = (gltfRuntime, device, rootUrl, onSuccessCallback) => {
  let loadedBuffersCount = 0;
  
  let loadBuffer = (bufferKey) => {
    return () => {
      let gltfBuffer = gltfRuntime.buffers[bufferKey];
      
      if (Core.isBase64(gltfBuffer.uri)) {
        gltfRuntime.loadedArrayBuffers[bufferKey] = Core.decodeArrayBuffer(gltfBuffer.uri.split(',')[1]);
        loadedBuffersCount++;
        
        if (loadedBuffersCount === gltfRuntime.arrayBuffersCount) {
          createMeshes(gltfRuntime, device);
          createNodes(gltfRuntime, device);
          
          if (onSuccessCallback) {
            onSuccessCallback();
          }
        }
      }
      else {
        Core.LoadFile(rootUrl + gltfBuffer.uri, true, (data) => {
          
          gltfRuntime.loadedArrayBuffers[bufferKey] = data;
          loadedBuffersCount++;
          
          if (loadedBuffersCount === gltfRuntime.arrayBuffersCount) {
            createMeshes(gltfRuntime, device);
            createNodes(gltfRuntime, device);
            
            if (onSuccessCallback) {
              onSuccessCallback();
            }
          }
          
        }, () => {
          console.error("glTF file loader: Cannot load buffer located at " + rootUrl + gltfBuffer.uri);
        });
      }
      
      
    };
  };
  
  for (let bufferKey in gltfRuntime.buffers) {
      gltfRuntime.arrayBuffersCount++;
      loadBuffer(bufferKey)();
    }
};

export default class GlTFFileLoader extends LoaderPlugin {
  constructor (device) {
    super();
    this.extension = ".gltf";
  }
  
  load (device, rootUrl, data, onSuccessCallback) {
    let gltfRuntime = JSON.parse(data);
    
    gltfRuntime.loadedArrayBuffers = { };
    gltfRuntime.arrayBuffersCount = 0;
    
    gltfRuntime.loadedShaders = { };
    gltfRuntime.shadersCount = 0;
    
    gltfRuntime.rootUrl = rootUrl;
    
    // Load shaders before and then load buffers
    let shadersSupport = new GlTFShadersSupport(device);
    shadersSupport.load(gltfRuntime, rootUrl, () => {
      loadBuffers(gltfRuntime, device, rootUrl, onSuccessCallback);
    });
  }
}

Loader.RegisterPlugin(new GlTFFileLoader());
