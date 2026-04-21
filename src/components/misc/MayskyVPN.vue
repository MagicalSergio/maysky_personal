<script setup>
import PowerIcon from "../../assets/icons/power-icon.svg?component";
import IdenticIcon from "../../assets/icons/identic-icon.svg?component";
import { computed, ref } from "vue";
import { getRandomInt } from "../../util/random";

const state = ref("disabled"); // loading | enabled
const powerIconRef = ref(null);
let spinAnimation = null;
let rampInterval = null;

const handleButton = async () => {
  if (state.value === "loading") return;

  if (state.value === "enabled") {
    state.value = "disabled";
    return;
  }

  state.value = "loading";
  startSpin();
  await connect();
  await stopSpin();
  state.value = "enabled";
};

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

  let rate = 0;
  rampInterval = setInterval(() => {
    rate = Math.min(1, rate + 0.1);
    spinAnimation.playbackRate = rate;
    if (rate >= 1) clearInterval(rampInterval);
  }, 40);
};

const stopSpin = () => {
  clearInterval(rampInterval);
  if (!spinAnimation) return Promise.resolve();

  const anim = spinAnimation;
  return new Promise((resolve) => {
    let rate = anim.playbackRate;
    rampInterval = setInterval(() => {
      rate = Math.max(0, rate - 0.1);
      anim.playbackRate = rate;
      if (rate > 0) return;

      clearInterval(rampInterval);
      const currentAngle = ((anim.currentTime % 800) / 800) * 360;
      const el = getEl();
      anim.cancel();
      spinAnimation = null;

      if (!el || currentAngle < 1) return resolve();

      const targetAngle = currentAngle >= 180 ? 360 : 0;
      el.style.transform = `rotate(${currentAngle}deg)`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.transition = "transform 0.25s ease-out";
          el.style.transform = `rotate(${targetAngle}deg)`;
          setTimeout(() => {
            el.style.transform = "";
            el.style.transition = "";
            resolve();
          }, 270);
        }),
      );
    }, 40);
  });
};

const classes = computed(() => ({
  [`maysky-vpn_${state.value}`]: state.value,
}));
</script>

<template>
  <div class="maysky-vpn" :class="classes">
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

      <button class="maysky-vpn__ping-button">Test ping</button>
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
  justify-content: space-between;
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
      transition: all 1s ease;
      z-index: -1;
      transform: scale(0);
      will-change: transform, opacity;
    }
  }

  &__power-icon {
    width: 3.2rem;
    height: 3.2rem;
    color: #31b380;
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

  &__ping-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid rgba(#2f6d4a, 0.5);
    border-radius: 0.8rem;
    color: #ffffff;
    font-size: 1rem;
    width: 17rem;
    height: 2.6rem;
  }

  &_enabled {
    #{$root}__button {
      background: rgba(#51d374, 0.14);

      &::after {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.75);
      }
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
