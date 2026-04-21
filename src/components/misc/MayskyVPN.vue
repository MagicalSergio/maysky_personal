<script setup>
import PowerIcon from "../../assets/icons/power-icon.svg?component";
import IdenticIcon from "../../assets/icons/identic-icon.svg?component";
import { ref } from "vue";

const state = ref("disabled");
</script>

<template>
  <div class="maysky-vpn">
    <div class="maysky-vpn__top">
      <div class="maysky-vpn__button">
        <PowerIcon class="maysky-vpn__power-icon" />
      </div>
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
  font-family: "Open Sans", sans-serif;
  padding: 7rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  overflow: hidden;
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
    }
  }

  &__power-icon {
    width: 3.2rem;
    height: 3.2rem;
    color: #31b380;
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
}
</style>
