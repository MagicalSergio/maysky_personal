<script setup>
import * as THREE from "three";
import { onMounted, useTemplateRef } from "vue";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import scroll from "../scripts/scroll";

const canvas = useTemplateRef("canvas");

onMounted(() => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0B0B0B");
  const camera = new THREE.PerspectiveCamera(
    50,
    canvas.value.getBoundingClientRect().width /
      canvas.value.getBoundingClientRect().height,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(
    canvas.value.getBoundingClientRect().width,
    canvas.value.getBoundingClientRect().height,
  );
  canvas.value.appendChild(renderer.domElement);

  // const controls = new OrbitControls(camera, renderer.domElement);
  // camera.position.set(0, 20, 100);
  // controls.update();

  // Size of one tile along Z axis
  const TILE_SIZE = 5;
  const SPEED = 0.002;
  const LINE_WIDTH = 0.00055;
  const LINE_STEP = 0.1;

  function createGridTile() {
    const tile = new THREE.Group();

    const range = [-5, 5];
    for (
      let l = range[0];
      l <= range[1];
      l = Math.round((l + LINE_STEP) * 1000) / 1000
    ) {
      const linePath = new THREE.LineCurve3(
        new THREE.Vector3(l, 0.25, 0),
        new THREE.Vector3(l, 0.25, TILE_SIZE),
      );
      const lineGeometry = new THREE.TubeGeometry(
        linePath,
        1,
        LINE_WIDTH,
        8,
        false,
      );
      const lineMaterial = new THREE.MeshBasicMaterial({ color: "#666666" });
      tile.add(new THREE.Mesh(lineGeometry, lineMaterial));
    }

    for (
      let l = 0;
      l <= TILE_SIZE;
      l = Math.round((l + LINE_STEP) * 1000) / 1000
    ) {
      const linePath = new THREE.LineCurve3(
        new THREE.Vector3(-5, 0.25, l),
        new THREE.Vector3(5, 0.25, l),
      );
      const lineGeometry = new THREE.TubeGeometry(
        linePath,
        1,
        LINE_WIDTH,
        8,
        false,
      );
      const lineMaterial = new THREE.MeshBasicMaterial({ color: "#666666" });
      tile.add(new THREE.Mesh(lineGeometry, lineMaterial));
    }

    return tile;
  }

  const BASE_Y = 0.4;
  const SCROLL_Y = 0.0001;
  const SCROLL_Z = 0.00001;

  const BASE_ROT_X = -0.2;
  const SCROLL_ROT_X = -0.001;
  const SCROLL_ROT_Y = 0;
  const SCROLL_ROT_Z = 0;

  let currentSpeed = SPEED;

  camera.position.y = BASE_Y;
  camera.rotation.set(BASE_ROT_X, 0, 0);

  const tiles = [
    createGridTile(),
    createGridTile(),
    createGridTile(),
    createGridTile(),
  ];

  // 2 behind: +2T, +T; 2 in front: 0, -T
  tiles.forEach((tile, i) => {
    tile.scale.z = -1;
    tile.position.z = camera.position.z + 2 * TILE_SIZE - i * TILE_SIZE;
    scene.add(tile);
  });

  function animate() {
    tiles.forEach((tile) => {
      tile.position.z += currentSpeed;
    });

    const minZ = Math.min(...tiles.map((t) => t.position.z));
    tiles.forEach((tile) => {
      if (tile.position.z > camera.position.z + 2 * TILE_SIZE) {
        tile.position.z = minZ - TILE_SIZE;
      }
    });

    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  scroll.on("scroll", (ev) => {
    camera.position.y = Math.min(BASE_Y + ev.scroll * SCROLL_Y, 0.5);
    camera.position.z = ev.scroll * SCROLL_Z;
    const rotX = THREE.MathUtils.clamp(
      BASE_ROT_X + ev.scroll * SCROLL_ROT_X,
      -Math.PI / 2,
      Math.PI / 2,
    );
    const progress = (rotX - BASE_ROT_X) / (-Math.PI / 2 - BASE_ROT_X);
    currentSpeed = SPEED * (1 - THREE.MathUtils.clamp(progress, 0, 1));
    camera.rotation.set(
      rotX,
      ev.scroll * SCROLL_ROT_Y,
      ev.scroll * SCROLL_ROT_Z,
    );
  });
});
</script>

<template>
  <div class="dynamic-background">
    <div class="dynamic-background__canvas" ref="canvas"></div>
    <div class="dynamic-background__gradient"></div>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-background {
  position: relative;
  width: 100%;
  height: 100vh;

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to bottom,
      #0b0b0b 0%,
      #0b0b0b 35%,
      transparent 100%
    ),
    linear-gradient(
      to bottom,
      transparent 0%,
      transparent 90%,
      #0b0b0b 100%
    ),
  }
}
</style>
