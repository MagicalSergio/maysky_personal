<script setup>
import { onMounted, useTemplateRef } from "vue";
import BaseContainer from "../base/BaseContainer.vue";
import lottie from "lottie-web";

const animContainer = useTemplateRef("anim-container");

onMounted(() => {
  lottie.loadAnimation({
    container: animContainer.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/src/public/party-bot-anim.json",
  });
});
</script>

<template>
  <section class="party-bot-section">
    <BaseContainer>
      <div ref="anim-container" class="party-bot-section__anim-container"></div>
    </BaseContainer>
  </section>
</template>

<style lang="scss" scoped>
.party-bot-section {
  &__anim-container {
    width: 100%;
    height: 500px;
  }
}
</style>

<style lang="scss">
svg {
  & > g {
    & > g {
      &:last-child {
        display: none !important;
      }
    }
  }
}
</style>
