<script setup>
import PowerIcon from "../../assets/icons/power-icon.svg?component";
import IdenticIcon from "../../assets/icons/identic-icon.svg?component";
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import { getRandomInt } from "../../util/random";

const state = ref("disabled"); // disabled | loading | enabled

/**
 * Button handling
 */
const powerIconRef = ref(null);
let spinAnimation = null;
let rampInterval = null;

const connect = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, getRandomInt(500, 2000));
  });
};

const getEl = () => powerIconRef.value?.$el ?? powerIconRef.value;

const startSpin = () => {
  clearInterval(rampInterval);
  const el = getEl();
  if (!el) return;
  el.style.transform = "";
  el.style.transition = "";

  spinAnimation = el.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }], {
    duration: 800,
    iterations: Infinity,
    easing: "linear",
  });
  spinAnimation.playbackRate = 0;

  rampInterval = setInterval(() => {
    spinAnimation.playbackRate = Math.min(1, spinAnimation.playbackRate + 0.1);
    if (spinAnimation.playbackRate >= 1) clearInterval(rampInterval);
  }, 40);
};

const stopSpin = () => {
  clearInterval(rampInterval);
  if (!spinAnimation) return Promise.resolve();

  return new Promise((resolve) => {
    rampInterval = setInterval(() => {
      spinAnimation.playbackRate = Math.max(0, spinAnimation.playbackRate - 0.1);
      if (spinAnimation.playbackRate > 0) return;

      clearInterval(rampInterval);
      const currentAngle = ((spinAnimation.currentTime % 800) / 800) * 360;
      const el = getEl();
      spinAnimation.cancel();
      spinAnimation = null;

      if (!el || currentAngle < 1) return resolve();

      const targetAngle = currentAngle >= 180 ? 360 : 0;
      el.style.transform = `rotate(${currentAngle}deg)`;
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.25s ease-out";
        el.style.transform = `rotate(${targetAngle}deg)`;
        setTimeout(() => {
          el.style.transform = "";
          el.style.transition = "";
          resolve();
        }, 270);
      });
    }, 40);
  });
};

const enable = async () => {
  state.value = "loading";
  startSpin();
  await connect();
  await stopSpin();
  state.value = "enabled";
};

const handleButton = async () => {
  if (state.value === "loading") return;

  if (state.value === "enabled") {
    state.value = "disabled";
    return;
  }

  enable();
};

/**
 * Observer
 */
const root = useTemplateRef("root");
let observer = null;
const createObserver = () => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        enable();
        observer.unobserve(root.value);
      }
    },
    { threshold: 0.25 },
  );

  observer.observe(root.value);
};
onMounted(createObserver);
onUnmounted(() => observer?.disconnect());

const classes = computed(() => ({
  [`maysky-vpn_${state.value}`]: state.value,
}));
</script>

<template>
  <div ref="root" class="maysky-vpn" :class="classes">
    <div class="maysky-vpn__top">
      <button class="maysky-vpn__button" @click="handleButton">
        <PowerIcon ref="powerIconRef" class="maysky-vpn__power-icon" />
      </button>
    </div>

    <div class="maysky-vpn__bottom">
      <div class="maysky-vpn__identic">
        <div class="maysky-vpn__identic-logo">
          <IdenticIcon class="maysky-vpn__identic-icon" />
        </div>

        <div class="maysky-vpn__title">Maysky VPN</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.maysky-vpn {
  $root: &;

  font-family: "Open Sans", sans-serif;
  padding: 7rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  border-radius: 1rem;
  height: 100%;
  letter-spacing: 0;

  &__button {
    height: 7.5rem;
    width: 7.5rem;
    border: 1px solid rgba(#31b380, 0.17);
    background: rgba(#515151, 0.03);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: background-color 0.35s ease;

    &::before {
      position: absolute;
      transform: translate(-50%, -50%);
      content: "";
      display: block;
      width: 10rem;
      height: 10rem;
      top: 50%;
      left: 50%;
      background: rgba(#515151, 0.02);
      border-radius: 50%;
      border: 1px solid rgba(#515151, 0.17);
      z-index: 1;
    }

    &::after {
      position: absolute;
      transform: translate(-50%, -50%);
      content: "";
      display: block;
      width: 12rem;
      height: 12rem;
      top: 50%;
      left: 50%;
      background: rgba(#23483c, 0.9);
      border-radius: 50%;
      opacity: 0;
      filter: blur(100px);
      transition: all 1s ease-in-out;
      z-index: -1;
      transform: scale(0);
      will-change: transform, opacity;
    }
  }

  &__power-icon {
    width: 3.2rem;
    height: 3.2rem;
    color: #7c3131;
    transform-origin: center;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__identic {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  &__identic-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid rgba(#515151, 0.5);
    background: rgba(#285942, 0.25);
    height: 2.5rem;
    width: 2.5rem;
  }

  &__identic-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: #31b380;
  }

  &__title {
    color: #ffffff;
    font-size: 1rem;
  }

  &_enabled {
    #{$root}__button {
      background: rgba(#51d374, 0.14);

      &::after {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.75);
      }
    }

    #{$root}__power-icon {
      color: #31b380;
    }
  }
}
</style>

<style lang="scss">
.maysky-vpn {
  svg {
    transition: color 0.35s ease;
  }

  .power-icon__line {
    transition: opacity 0.35s ease;
  }

  &_loading {
    svg {
      color: gray !important;
    }

    .power-icon__line {
      opacity: 0;
    }
  }
}
</style>
