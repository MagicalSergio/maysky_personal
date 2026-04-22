<script setup>
import DynamicBackground from "../components/misc/DynamicBackground.vue";
import GHIcon from "../assets/icons/gh.svg?component";
import TGIcon from "../assets/icons/tg.svg?component";
import VKIcon from "../assets/icons/vk.svg?component";
import HHIcon from "../assets/icons/hh.svg?component";
import ScrambleText from "../components/misc/ScrambleText.vue";
import BaseContainer from "../components/base/BaseContainer.vue";
import TextWriter from "../components/misc/TextWriter.vue";
</script>

<template>
  <footer class="footer">
    <DynamicBackground class="footer__bg" mod="footer" />

    <div class="footer__main">
      <div class="footer__main-line">
        <span><TextWriter text='rdy to build smthng <span class="p">great</span>?' :speed="20" /></span>
      </div>

      <div class="footer__main-line">
        <span><ScrambleText text="contact" /></span>

        <div class="footer__socials">
          <a href="https://github.com/MagicalSergio" target="_blank" class="footer__socials-link"><GHIcon class="gh" /></a>
          <a href="https://t.me/mg_guy" target="_blank" class="footer__socials-link"><TGIcon class="tg" /></a>
          <a href="https://vk.com/smaysk" target="_blank" class="footer__socials-link"><VKIcon class="vk" /></a>
          <a href="https://hh.ru/resume/2ac681e1ff1056ea180039ed1f546d4773626c" target="_blank" class="footer__socials-link"
            ><HHIcon class="hh"
          /></a>
        </div>

        <span><ScrambleText text="me" :random-scramble-freq="5000" /></span>
      </div>
    </div>

    <div class="footer__copyright">
      <BaseContainer class="footer__copyright-container">
        <div class="footer__copyright-group">
          <span>maysky.dev</span>
          <span>designed and coded by me</span>
          <a href="https://github.com/MagicalSergio/maysky_personal" target="_blank">source code</a>
        </div>

        <div class="footer__copyright-group">
          <span class="footer__copyright-text">copyright © Sergei “Maysky” Grechishkin 2026. all rights reserved_</span>
        </div>
      </BaseContainer>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  align-items: flex-end;

  @media #{$media-mobile} {
    // height: 40rem;
  }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  &__main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    @media #{$media-mobile} {
      gap: 2rem;
    }
  }

  &__main-line {
    display: inline-flex;
    align-items: baseline;
    gap: 1rem;
    font-size: 4rem;
    color: $color-font-accent;
    white-space: nowrap;

    @media #{$media-mobile} {
      font-size: 2rem;
      align-items: flex-start;
      flex-direction: column;
      white-space: wrap;
      font-size: 4rem;
      text-align: center;
      align-items: center;
      gap: 0;
    }

    :deep(.p) {
      color: $color-font-accent-2;
    }
  }

  &__socials {
    gap: 0.5rem;
    display: flex;
    background: $color-bg-add-1;

    @media #{$media-mobile} {
      gap: 1rem;
    }
  }

  &__socials-link {
    display: flex;
    height: 2.5rem;
    width: 2.5rem;
    opacity: 0.33;

    @media #{$media-mobile} {
      height: 3rem;
      width: 3rem;
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    .gh {
      color: #b4b4b4;
    }

    .tg {
      color: #3bb0e2;
    }

    .vk {
      color: #0077ff;
    }

    .hh {
      color: #ff0002;
    }
  }

  &__copyright {
    position: relative;
    width: 100%;
    color: #323232;

    @media #{$media-mobile} {
      height: auto;
    }
  }

  &__copyright-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media #{$media-mobile} {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
  }

  &__copyright-group {
    display: flex;
    align-items: center;
    gap: 2rem;
    height: 4rem;

    @media #{$media-mobile} {
      justify-content: space-between;
      width: 100%;
      gap: 0.25rem;
      height: auto;
    }

    a {
      color: inherit;

      &:hover {
        color: $color-bg-add-2;
      }
    }
  }

  &__copyright-text {
    //
  }
}
</style>
