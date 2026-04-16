<script setup>
import { onMounted, useTemplateRef, ref, computed } from "vue";
import { cubicBezier } from "../util/cubicBezier";
import scroll from "../scripts/scroll";

const root = useTemplateRef("root");
const fixedContainer = useTemplateRef("fixed-container");

const text = "no stack religion -- applying experience -- creating solutions;";
const underlines = [
  { start: 0, end: 8 },
  { start: 30, end: 40 },
  { start: 53, end: 62 },
];

const mounted = ref(false);

const state = ref("pending"); // pending | scrolling | scrolled

const scrollProgress = ref(0);

const updateState = () => {
  const top = root.value.getBoundingClientRect().top;
  const rootHeight = root.value.getBoundingClientRect().height;
  const containerHeight = fixedContainer.value.getBoundingClientRect().height;

  if (top > 0) return (state.value = "pending");
  if (Math.abs(top) + containerHeight >= rootHeight)
    return (state.value = "scrolled");
  return (state.value = "scrolling");
};

const updateProgress = () => {
  if (state.value === "pending") return (scrollProgress.value = 0);
  if (state.value === "scrolled") return (scrollProgress.value = 1);

  const rootTop = root.value.getBoundingClientRect().top;
  const rootHeight = root.value.getBoundingClientRect().height;
  const containerHeight = fixedContainer.value.getBoundingClientRect().height;
  const scrollLength = rootHeight - containerHeight;

  scrollProgress.value = Math.abs(rootTop / scrollLength);
};

const translation = computed(() => {
  if (!mounted.value) return;
  const rootWidth = root.value.getBoundingClientRect().width;
  const containerWidth = fixedContainer.value.getBoundingClientRect().width;
  const translationLength = Math.abs(containerWidth - rootWidth);
  return translationLength * scrollProgress.value;
});

const EASING = { x1: 0, y1: 0.10, x2: 0.05, y2: 0.20 };
const ease = cubicBezier(EASING);
const computedText = computed(() => {
  const splitted = text.split("");
  const showLength = Math.ceil(splitted.length * ease(scrollProgress.value));
  return splitted.slice(0, showLength).join("");
});

const calculateUnderlineWidth = (i) => {
  if (!underlines.map((l) => l.start).includes(i)) return 0;

  const underline = underlines.find((l) => l.start === i);
  const underlineCharWidth = underline.end - underline.start;

    console.log('underlineCharWidth: ', underlineCharWidth);
  console.log("computedText.value.length: ", computedText.value.length);
  if (computedText.value.length < i + underlineCharWidth) return 0;

  return underlineCharWidth * char.value[0].offsetWidth;
};

const char = useTemplateRef("char");
const paddingRight = ref(0);
const calculatePadding = () => {
  const words = text.split(" ");
  const last = words[words.length - 1];
  const charWidth = char.value[0].getBoundingClientRect().width;
  const wordLength = charWidth * last.length;
  paddingRight.value = Math.floor((document.body.offsetWidth - wordLength) / 2);
};

const onScroll = () => {
  updateState();
  updateProgress();
};

onMounted(() => {
  updateState();
  calculatePadding();
  scroll.on("scroll", onScroll);
  mounted.value = true;
});

const classes = computed(() => ({
  pending: state.value === "pending",
  scrolling: state.value === "scrolling",
  scrolled: state.value === "scrolled",
}));
</script>

<template>
  <div ref="root" class="usp-section" :class="classes">
    <div
      ref="fixed-container"
      class="usp-section__fixed-container"
      :style="{
        transform: `translateX(-${translation}px)`,
        'padding-right': `${paddingRight}px`,
      }"
    >
      <div class="usp-section__content">
        <span class="usp-section__input">></span>
        <span class="usp-section__text-container">
          <span class="usp-section__fake-text"
            ><span
              v-for="(c, i) in text"
              :key="`${c}-${i}`"
              ref="char"
              class="usp-section__char"
            >
              <span>{{ c }}</span>
            </span>
          </span>
          <span class="usp-section__text"
            ><span
              v-for="(c, i) in computedText"
              :key="`${c}-${i}`"
              class="usp-section__char"
              ><span>{{ c }}</span
              ><span
                class="usp-section__char-underline"
                :style="{ width: `${calculateUnderlineWidth(i)}px` }"
              ></span></span
            ><span class="usp-section__cursor"></span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.usp-section {
  $root: &;
  height: 400vh;
  overflow-x: hidden;
  display: flex;
  align-items: flex-start;

  &.pending {
    //
  }

  &.scrolling {
    #{$root}__fixed-container {
      position: fixed;
      top: 0;
      left: 0;
    }
  }

  &.scrolled {
    align-items: flex-end;
  }

  &__fixed-container {
    height: 100vh;
    padding: 0 calc(50vw / 2) 0 200px;
    width: max-content;
    display: flex;
    align-items: center;
  }

  &__content {
    white-space: nowrap;
    font-weight: bold;
    letter-spacing: -2%;
    font-size: 10rem;
    line-height: 1;
  }

  &__text-container {
    position: relative;
  }

  &__fake-text {
    visibility: hidden;

    span {
      vertical-align: middle;
    }
  }

  &__text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    span {
      vertical-align: middle;
    }
  }

  &__cursor {
    display: inline-block;
    width: 0.55em;
    height: 0.1lh;
    background: currentColor;
    vertical-align: text-bottom !important;
    margin-left: 0.1em;
    animation: cursor-blink 1s step-end infinite;
  }

  &__char {
    position: relative;
  }

  &__char-underline {
    position: absolute;
    left: 0;
    bottom: -10px;
    height: 1rem;
    background: white;
    transition: width .4s ease-in-out;
    width: 0;
  }

  @keyframes cursor-blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
}
</style>
