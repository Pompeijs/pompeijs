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

import StandardMaterial from '../../Material/StandardMaterial';

import Loader from '../Loader';
import LoaderPlugin from '../Loader';

let arrayFromTo = (array, from, to, result) => {
  for (let i=from; i < from + to; i++) {
    result.push(array[i]);
  }
}

let getMaterialById = (materials, id) => {
  for (let i=0; i < materials.length; i++) {
    if (materials[i].id === id) {
      return materials[i];
    }
  }
  
  return null;
};

let importMesh = (device, rootUrl, babylonScene, babylonMesh, shaderMaterial) => {
  let vertexBuffers = [];
  let materials = [];
  
  if (!babylonMesh.subMeshes && babylonMesh.positions && babylonMesh.indices) {
    babylonMesh.subMeshes = [{
      indexStart: 0,
      indexCount: babylonMesh.indices.length,
      verticesStart: 0,
      verticesCount: babylonMesh.positions.length / 3
    }];
  }
  
  for (let i=0; babylonMesh.subMeshes && i < babylonMesh.subMeshes.length; i++) {
    let subMesh = babylonMesh.subMeshes[i];
    let vertexBuffer = new VertexBuffer();
    
    if (babylonMesh.positions) {
      arrayFromTo(babylonMesh.positions, subMesh.verticesStart * 3, subMesh.verticesCount * 3, vertexBuffer.positions);
    }
    if (babylonMesh.normals) {
      arrayFromTo(babylonMesh.normals, subMesh.verticesStart * 3, subMesh.verticesCount * 3, vertexBuffer.normals);
    }
    if (babylonMesh.uvs) {
      arrayFromTo(babylonMesh.uvs, subMesh.verticesStart * 2, subMesh.verticesCount * 2, vertexBuffer.uvs);
    }
    
    arrayFromTo(babylonMesh.indices, subMesh.indexStart, subMesh.indexCount, vertexBuffer.indices);
    
    vertexBuffers.push(vertexBuffer);
    
    materials.push(getMaterialById(babylonScene.materials, babylonMesh.materialId));
  }
  
  let mesh = new Mesh(vertexBuffers, device.scene);
  mesh.name = babylonMesh.name;
  mesh.id = babylonMesh.id;
  device.scene.geometryCreator.invertFaces(mesh, true);
  
  let node = new MeshSceneNode(babylonMesh.name, device.scene, null, mesh)
  node.id = babylonMesh.id;
  node.position.setXYZ(babylonMesh.position[0], babylonMesh.position[1], babylonMesh.position[2]);
  node.rotation.setXYZ(babylonMesh.rotation[0] * Core.RadToDeg(), babylonMesh.rotation[1] * Core.RadToDeg(), babylonMesh.rotation[2] * Core.RadToDeg());
  node.scale.setXYZ(babylonMesh.scaling[0], babylonMesh.scaling[1], babylonMesh.scaling[2]);
  
  // Materials
  for (let i=0; i < node.materials.length; i++) {
    node.materials[i].shaderMaterial = shaderMaterial;
    
    if (materials[i]) {
      if (materials[i].diffuseTexture) {
        node.materials[i].textures[0] = device.renderer.createTexture(rootUrl + materials[i].diffuseTexture.name);
      }
      if (materials[i].emissiveTexture) {
        node.materials[i].textures[0] = device.renderer.createTexture(rootUrl + materials[i].emissiveTexture.name);
      }
      if (materials[i].bumpTexture) {
        node.materials[i].textures[1] = device.renderer.createTexture(rootUrl + materials[i].bumpTexture.name);
      }
      if (materials[i].reflectionTexture) {
        var textures = [
          rootUrl + materials[i].reflectionTexture.name + "_px.jpg",
          rootUrl + materials[i].reflectionTexture.name + "_nx.jpg",
          rootUrl + materials[i].reflectionTexture.name + "_py.jpg",
          rootUrl + materials[i].reflectionTexture.name + "_nx.jpg",
          rootUrl + materials[i].reflectionTexture.name + "_pz.jpg",
          rootUrl + materials[i].reflectionTexture.name + "_nz.jpg",
        ];
        
        node.materials[i].textures[2] = device.renderer.createCubeTexture(materials[i].reflectionTexture.name, textures, null, false);
      }
    }
  }
  
  return node;
};

export default class BabylonFileLoader extends LoaderPlugin {
  constructor (device) {
    super();
    this.extension = ".babylon";
  }
  
  load (device, rootUrl, data, onSuccessCallback) {
    let babylonScene = JSON.parse(data);
    let meshSceneNodes = [];
    let shaderMaterial = new StandardMaterial(device.scene);
    
    // Create mesh scene nodes
    for (let i=0; i < babylonScene.meshes.length; i++) {
      meshSceneNodes.push(importMesh(device, rootUrl, babylonScene, babylonScene.meshes[i], shaderMaterial));
    }
    
    // Resolve parenting
    for (let i=0; i < babylonScene.meshes.length; i++) {
      let mesh = babylonScene.meshes[i];
      if (mesh.parentId !== '') {
        meshSceneNodes[i].parent = device.scene.getNodeById(mesh.parentId);
        meshSceneNodes[i].updateAbsoluteTransformation();
      }
    }
    
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  }
}

Loader.RegisterPlugin(new BabylonFileLoader());
