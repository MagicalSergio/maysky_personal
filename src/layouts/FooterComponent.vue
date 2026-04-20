<script setup>
import DynamicBackground from "../components/misc/DynamicBackground.vue";
import GHIcon from "../assets/icons/gh.svg?component";
import TGIcon from "../assets/icons/tg.svg?component";
import VKIcon from "../assets/icons/vk.svg?component";
import HHIcon from "../assets/icons/hh.svg?component";
</script>

<template>
  <footer class="footer">
    <DynamicBackground class="footer__bg" mod="footer" />

    <div class="footer__main">
      <span>contact</span>

      <div class="footer__socials">
        <a href="#" target="_blank" class="footer__socials-link"><GHIcon /></a>
        <a href="#" target="_blank" class="footer__socials-link"><TGIcon /></a>
        <a href="#" target="_blank" class="footer__socials-link"><VKIcon /></a>
        <a href="#" target="_blank" class="footer__socials-link"><HHIcon /></a>
      </div>

      <span>me</span>
    </div>

    <div class="footer__copyright"></div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  padding: 12rem 0;

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  &__main {
  }
}
</style>
