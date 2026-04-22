<script setup>
import { useTemplateRef, ref, onMounted, onUnmounted } from "vue";
import BaseContainer from "../base/BaseContainer.vue";
import TerminalWrapper from "./TerminalWrapper.vue";
import TextWriter from "./TextWriter.vue";
import ScrambleText from "./ScrambleText.vue";
import GHIcon from "../../assets/icons/gh.svg?component";
import LinkArrow from "../../assets/icons/link-arrow.svg?component";

const props = defineProps({
  href: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  features: {
    type: Array,
    default: () => [],
  },
  stack: {
    type: Array,
    default: () => [],
  },
});

const stackWrap = useTemplateRef("stack");
const scrambleTrigger = ref(false);

let observer = null;
const initStackObserver = () => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      scrambleTrigger.value = true;
      observer.unobserve(stackWrap.value);
    }
  });
  observer.observe(stackWrap.value);
};

onMounted(initStackObserver);
onUnmounted(() => observer?.disconnect());
</script>

<template>
  <div class="project-card">
    <BaseContainer class="project-card__base-container">
      <TerminalWrapper :title="title" class="project-card__terminal-wrap">
        <div class="project-card__container">
          <div class="project-card__media">
            <slot></slot>
          </div>

          <div class="project-card__info">
            <div class="project-card__head">
              <component :is="href ? 'a' : 'div'" :href="href" target="_blank" class="project-card__link">
                <h2 class="project-card__title">
                  <TextWriter :text="title" :speed="20" />
                </h2>

                <div v-if="href" class="project-card__gh-link">
                  <GHIcon class="project-card__gh-icon" />
                  <LinkArrow class="project-card__gh-arrow" />
                </div>
              </component>
            </div>

            <div class="project-card__subtitle">
              <TextWriter :text="subtitle" :speed="25" />
            </div>

            <ul class="project-card__features">
              <li v-for="(f, i) in features" :key="f">\{{ i + 1 }}<TextWriter :text="f" :speed="50" /></li>
            </ul>

            <div ref="stack" :style="{ opacity: scrambleTrigger ? '1' : '0' }" class="project-card__stack">
              <ScrambleText
                v-for="(item, i) in stack"
                :key="`${item}-${i}`"
                :random-scramble="false"
                :trigger="scrambleTrigger"
                :text="item"
              />
            </div>
          </div>
        </div>
      </TerminalWrapper>
    </BaseContainer>
  </div>
</template>

<style lang="scss" scoped>
@use "/src/styles/utils.scss" as *;

.project-card {
  font-family: "JetBrains Mono", sans-serif;
  font-size: 1.6rem;
  height: 85vh;
  max-height: 85vh;
  min-height: 85vh;

  &__title {
    font-size: 4rem;
    color: $color-font-accent;
    font-weight: 400;
    white-space: nowrap;
  }

  &__base-container {
    height: 100%;
  }

  &__terminal-wrap {
    height: 100%;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
    width: 100%;
    height: 80%;

    @media #{$media-mobile} {
      flex-direction: column-reverse;
      height: 80%;
    }
  }

  &__media {
    height: 100%;
    flex-shrink: 0;
    flex-grow: 1;
    flex-basis: 0;

    @media #{$media-mobile} {
      width: 100%;
      height: auto;
      display: none; // because f**k mobile
    }
  }

  &__info {
    flex-shrink: 0;
    flex-grow: 1;
    flex-basis: 0;
  }

  &__head {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__gh-link {
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;

    img {
      flex-shrink: 0;
    }
  }

  &__gh-icon {
    width: 2rem;
    height: 2rem;
  }

  &__gh-arrow {
    width: 1rem;
    height: 1rem;
  }

  &__link {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    color: $color-font-add-2;
    text-decoration: none;

    &:hover {
      color: $color-font-accent;
    }
  }

  &__subtitle {
    margin-bottom: 3rem;
  }

  &__features {
    margin-bottom: 3rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
  }

  &__stack {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;

    & > * {
      color: $color-font-accent;
      background: $color-bg-add-2;
    }
  }

  &__true-news-media {
    flex-shrink: 0;
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    justify-content: flex-end;

    img {
      width: auto;
      object-fit: contain;
      object-position: right;
    }
  }

  &__maysky-vpn {
    height: 100%;
    max-height: 40rem;
    flex-shrink: 0;
    flex-grow: 1;
    flex-basis: 0;
  }

  &_dark {
    background: $color-bg-add-1;
  }
}
</style>
