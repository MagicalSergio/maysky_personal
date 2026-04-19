<script setup>
import { onMounted, useTemplateRef } from "vue";
import BaseContainer from "../base/BaseContainer.vue";
import TextWriter from "../misc/TextWriter.vue";
import lottie from "lottie-web";
import gh from "../../assets/icons/gh.svg?url";
import linkArrow from "../../assets/icons/link-arrow.svg?url";

const partyBotAnimationContainer = useTemplateRef("party-bot-anim-container");

onMounted(() => {
  lottie.loadAnimation({
    container: partyBotAnimationContainer.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/src/public/party-bot-anim.json",
  });
});
</script>

<template>
  <section class="projects-section">
    <div class="projects-section__head">
      <BaseContainer>
        <TextWriter
          text='i build purposeful tools for myself and my <span class="l">loved</span> ones<span class="u">_</span>'
          :duration="5000"
        />
      </BaseContainer>
    </div>

    <div class="projects-section__project project">
      <BaseContainer>
        <div class="project__container">
          <div class="project__party-bot-anim">
            <div class="party-bot-anim">
              <div
                ref="party-bot-anim-container"
                class="party-bot-anim__container"
              />
            </div>
          </div>

          <div class="project__info">
            <div class="project__head">
              <div class="project__title">party-bot</div>

              <a
                href="https://github.com/MagicalSergio"
                target="_blank"
                class="project__link"
              >
                <img :src="gh" alt="github" />
                <img :src="linkArrow" alt="arrow" />
              </a>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.project {
  &__title {
    font-size: 4rem;
    color: $color-font-accent;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    padding: 7rem 0;
  }

  &__party-bot-anim {
    padding-right: 1rem;
    grid-column: 2 / span 3;
  }

  &__info {
    grid-column: span 4;
    padding-left: 1rem;
  }

  &__head {
    display: flex;
    align-self: center;
    gap: 1rem;
  }

  &__link {
    display: flex;
    align-items: flex-start;
    gap: 0.1rem;

    img {
      flex-shrink: 0;
    }

    &:hover {
      
    }
  }
}

.party-bot-anim {
  height: 40rem;
  max-height: 40rem;
  overflow: hidden;
  position: relative;

  &__container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    :deep(svg) {
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

.projects-section {
  &__head {
    padding: 7rem 0;
    font-size: 4rem;
    text-indent: calc(50% + 1rem);
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: flex-end;
    background: $color-bg-add-1;

    :deep(.l) {
      color: $color-font-accent-2;
    }

    :deep(.u) {
      animation: blink 1s step-end infinite;
    }
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
