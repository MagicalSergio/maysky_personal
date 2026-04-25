<script setup>
import { useTemplateRef, onMounted, onUnmounted } from "vue";
import lottie from "lottie-web";
import AbstractProjectCard from "../misc/AbstractProjectCard.vue";

const DATA = {
  href: "https://github.com/MagicalSergio/super-party-bot",
  title: "party-bot",
  subtitle: "an AI-chat assistant",
  features: ["multiple switchable AI personalities", "context saving and updating", "proxied by shadowsocks (_outdated)"],
  stack: ["node", "ts", "sqlite", "typeorm", "shadowsocks", "grok"],
};

const partyBotAnimationContainer = useTemplateRef("party-bot-anim-container");
let partyBotObserver = null;

const loadAnimation = () => {
  lottie.loadAnimation({
    name: "chat",
    container: partyBotAnimationContainer.value,
    renderer: "svg",
    loop: true,
    path: "/src/public/party-bot-anim.json",
    autoplay: false,
  });

  lottie.stop("chat");

  partyBotObserver = new IntersectionObserver(
    ([entry]) => {
      entry.isIntersecting ? lottie.play("chat") : lottie.stop("chat");
    },
    { threshold: 0.45 },
  );

  partyBotObserver.observe(partyBotAnimationContainer.value);
};

onMounted(loadAnimation);
onUnmounted(() => partyBotObserver?.disconnect());
</script>

<template>
  <AbstractProjectCard v-bind="DATA" class="project-party-bot">
    <div class="project-party-bot__anim">
      <div ref="party-bot-anim-container" class="project-party-bot__anim-container" />
    </div>
  </AbstractProjectCard>
</template>

<style lang="scss" scoped>
.project-party-bot {
  //
}
</style>

<style lang="scss">
.project-party-bot {
  &__anim {
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  &__anim-container {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    @media #{$media-mobile} {
      // height: 100%;
    }

    svg {
      & > g {
        & > g {
          &:last-child {
            display: none !important;
          }
        }
      }
    }
  }
}
</style>
