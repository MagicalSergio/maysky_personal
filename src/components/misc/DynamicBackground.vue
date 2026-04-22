<script setup>
import * as THREE from "three";
import { computed, onMounted, onUnmounted, useTemplateRef } from "vue";
import { getScroll } from "../../scripts/scroll";

const props = defineProps({
  immediate: {
    type: Boolean,
    default: false,
  },
  mod: {
    type: String,
    default: "",
  },
});

const TILE_SIZE = 5;
const SPEED = 0.002;
const LINE_WIDTH = 0.00055;
const LINE_STEP = 0.1;
const GRID_RANGE = [-5, 5];

const BASE_Y = 0.4;
const SCROLL_Y = 0.0001;
const SCROLL_Z = 0.00001;
const BASE_ROT_X = -0.2;
const SCROLL_ROT_X = -0.001;
const SCROLL_ROT_Y = 0;
const SCROLL_ROT_Z = 0;

const canvas = useTemplateRef("canvas");

const createGridLine = (from, to, material) => {
  const path = new THREE.LineCurve3(from, to);
  const geometry = new THREE.TubeGeometry(path, 1, LINE_WIDTH, 8, false);
  return new THREE.Mesh(geometry, material);
};

const createGridTile = (material) => {
  const tile = new THREE.Group();

  for (let l = GRID_RANGE[0]; l <= GRID_RANGE[1]; l = Math.round((l + LINE_STEP) * 1000) / 1000) {
    tile.add(createGridLine(new THREE.Vector3(l, 0.25, 0), new THREE.Vector3(l, 0.25, TILE_SIZE), material));
  }

  for (let l = 0; l <= TILE_SIZE; l = Math.round((l + LINE_STEP) * 1000) / 1000) {
    tile.add(createGridLine(new THREE.Vector3(GRID_RANGE[0], 0.25, l), new THREE.Vector3(GRID_RANGE[1], 0.25, l), material));
  }

  return tile;
};

const initScene = (el) => {
  const { width, height } = el.getBoundingClientRect();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#0B0B0B");

  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.y = BASE_Y;
  camera.rotation.set(BASE_ROT_X, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  el.appendChild(renderer.domElement);

  const lineMaterial = new THREE.MeshBasicMaterial({ color: "#666666" });
  const tiles = Array.from({ length: 4 }, (_, i) => {
    const tile = createGridTile(lineMaterial);
    tile.scale.z = -1;
    tile.position.z = camera.position.z + 2 * TILE_SIZE - i * TILE_SIZE;
    scene.add(tile);
    return tile;
  });

  return { scene, camera, renderer, tiles, lineMaterial };
};

const initScrollHandler = (camera, tiles, canvasEl) => {
  const lenis = getScroll();
  const canvasTop = canvasEl.getBoundingClientRect().top + lenis.scroll;
  let currentSpeed = SPEED;
  let firstRenderDone = false;

  const animate = (renderer, scene) => {
    let minZ = Infinity;
    for (const tile of tiles) {
      tile.position.z += currentSpeed;
      if (tile.position.z < minZ) minZ = tile.position.z;
    }
    for (const tile of tiles) {
      if (tile.position.z > camera.position.z + 2 * TILE_SIZE) {
        tile.position.z = minZ - TILE_SIZE;
      }
    }

    renderer.render(scene, camera);

    if (!firstRenderDone) {
      firstRenderDone = true;
      window.dispatchEvent(new CustomEvent('app:scene-ready'));
    }
  };

  const scrollHandler = (ev) => {
    const localScroll = Math.max(0, ev.scroll - canvasTop);

    camera.position.y = Math.min(BASE_Y + localScroll * SCROLL_Y, 0.5);
    camera.position.z = localScroll * SCROLL_Z;

    const rotX = THREE.MathUtils.clamp(BASE_ROT_X + localScroll * SCROLL_ROT_X, -Math.PI / 2, Math.PI / 2);
    const progress = (rotX - BASE_ROT_X) / (-Math.PI / 2 - BASE_ROT_X);
    currentSpeed = SPEED * (1 - THREE.MathUtils.clamp(progress, 0, 1));
    camera.rotation.set(rotX, localScroll * SCROLL_ROT_Y, localScroll * SCROLL_ROT_Z);
  };
  lenis.on("scroll", scrollHandler);

  return { animate, scrollHandler, lenis };
};

onMounted(() => {
  const { scene, camera, renderer, tiles, lineMaterial } = initScene(canvas.value);
  const { animate, scrollHandler, lenis } = initScrollHandler(camera, tiles, canvas.value);

  if (props.immediate) renderer.setAnimationLoop(animate(renderer, scene));

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    renderer.setAnimationLoop(entry.isIntersecting ? () => animate(renderer, scene) : null);
  });
  visibilityObserver.observe(canvas.value);

  onUnmounted(() => {
    visibilityObserver.disconnect();
    renderer.setAnimationLoop(null);
    lenis.off("scroll", scrollHandler);
    scene.traverse((obj) => { if (obj.geometry) obj.geometry.dispose(); });
    lineMaterial.dispose();
    renderer.dispose();
  });
});

const classes = computed(() => ({
  [`dynamic-background_${props.mod}`]: props.mod,
}));
</script>

<template>
  <div class="dynamic-background" :class="classes">
    <div class="dynamic-background__canvas" ref="canvas"></div>
    <div class="dynamic-background__gradient"></div>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-background {
  $root: &;

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
    background:
      linear-gradient(to bottom, $color-bg-base 0%, $color-bg-base 35%, transparent 100%),
      linear-gradient(to bottom, transparent 0%, transparent 90%, $color-bg-base 100%);
  }

  &_footer {
    #{$root}__canvas {
    }

    #{$root}__gradient {
      background:
        linear-gradient(to bottom, $color-bg-base 0%, $color-bg-base 35%, transparent 100%),
        linear-gradient(to bottom, transparent 0%, transparent 70%, $color-bg-base 90%);
    }
  }
}
</style>
