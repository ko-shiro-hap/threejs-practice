import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import earthTexture from '/textures/earth.jpg';


let scene, camera, renderer, pointLight, controls;

window.addEventListener('load', init);

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, +500);

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  // renderer.render(scene, camera);

  // テキスチャーを読み込む
  let textures = new THREE.TextureLoader().load(earthTexture);

  // ジオメトリを作成
  let ballGeometry = new THREE.SphereGeometry(100, 64, 32);
  // マテリアルを作成
  let ballMaterial = new THREE.MeshPhysicalMaterial({map: textures});
  // メッシュ化
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ballMesh);

  //並行光源を追加
  let directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 0xは今から書く色が16進数であることを示す
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ポイント光源を追加
  pointLight = new THREE.PointLight(0xffffff, 5);
  // pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);
  // ポイント光源がどこにあるのかを可視化するためのヘルパー
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);

  // マウス操作ができるようにコントローラを追加
  controls = new OrbitControls(camera, renderer.domElement);

  scene.add(pointLightHelper);
  // ポイント光源を球の周りを巡回させる


  window.addEventListener('resize', onWindowResize);

  animate();
}

// プラウザのリサイズに対応
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

  // レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

