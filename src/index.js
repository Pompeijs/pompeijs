import Device from './Device';
import Renderer from './Renderer';
import Scene from './Scene';

import MaterialRenderer from './Rendering/MaterialRenderer';
import ShadowsHandler from './Rendering/ShadowsHandler';
import PostProcessHandler from './Rendering/PostProcessHandler';

import Quaternion from './Core/Quaternion';
import Matrix from './Core/Matrix';
import { Vector2, Vector3, Dimension2 } from './Core/Vector';
import Line from './Core/Line';
import Color from './Core/Color';

import Vertex from './Core/Vertex';
import VertexBuffer from './Core/VertexBuffer';

import Material from './Material/Material';
import ShaderMaterial from './Material/ShaderMaterial';
import SolidMaterial from './Material/SolidMaterial';
import StandardMaterial from './Material/StandardMaterial';

import PostProcess from './PostProcess/PostProcess';
import PostProcessPipeline from './PostProcess/PostProcessPipeline';
import BrightPassPostProcess from './PostProcess/PostProcesses/BrightPass';
import BlurPostProcess from './PostProcess/PostProcesses/Blur';
import BloomPostProcess from './PostProcess/PostProcesses/Bloom';

import MeshCache from './Mesh/MeshCache';
import Mesh from './Mesh/Mesh';
import ScreenQuad from './PostProcess/ScreenQuad';

import Animator from './Animators/Animator';
import RotationAnimator from './Animators/RotationAnimator';
import RotationCameraAnimator from './Animators/RotationCameraAnimator';

import CameraSceneNode from './SceneNodes/CameraSceneNode';
import SceneNode from './SceneNodes/SceneNode';
import MeshSceneNode from './SceneNodes/MeshSceneNode';
import LightSceneNode from './SceneNodes/LightSceneNode';
import SpotLightSceneNode from './SceneNodes/SpotLightSceneNode';

import Texture from './Textures/Texture';
import RenderTargetTexture from './Textures/RenderTargetTexture';

import Loader from './Loaders/Loader';
import GlTFFileLoader from './Loaders/glTF/GlTFFileLoader';

import { PompeiError, WebGLSupportError } from './utils/errors';

export default {
  Device,
  Renderer,
  Scene,

  ShadowsHandler,
  MaterialRenderer,
  PostProcessHandler,

  Quaternion,
  Matrix,
  Vector3,
  Vector2,
  Dimension2,
  Color,

  Vertex,
  VertexBuffer,
  
  Material,
  ShaderMaterial,
  SolidMaterial,
  StandardMaterial,
  
  PostProcess,
  PostProcessPipeline,
  BrightPassPostProcess,
  BlurPostProcess,
  BloomPostProcess,

  MeshCache,
  Mesh,
  ScreenQuad,
  
  Animator,
  RotationAnimator,
  RotationCameraAnimator,

  CameraSceneNode,
  SceneNode,
  MeshSceneNode,
  LightSceneNode,
  SpotLightSceneNode,
  
  Texture,
  RenderTargetTexture,
  
  Loader,
  GlTFFileLoader,

  PompeiError,
  WebGLSupportError
};
