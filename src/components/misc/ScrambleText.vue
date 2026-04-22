<script setup>
import { ref, watch, onMounted, onUnmounted, useTemplateRef } from "vue";
import { getRandomInt } from "../../util/random";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  trigger: {
    default: false,
  },
  randomScrambleCount: {
    type: Number,
    default: 1,
  },
  randomScrambleFreq: {
    type: Number,
    default: 2000,
  },
  randomScramble: {
    type: Boolean,
    default: true,
  },
});

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const getRandChar = () => chars[getRandomInt(0, chars.length - 1)];

const charArray = ref([...props.text]);

// Per-char state: remaining ticks + next fire timestamp
const tasks = Array.from({ length: props.text.length }, () => ({
  remaining: 0,
  nextAt: 0,
}));

const rootEl = useTemplateRef("root-el");
let isVisible = false;
let destroyed = false;
let rafId = null;

const tick = (now) => {
  let hasActive = false;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.remaining <= 0) continue;
    hasActive = true;
    if (now < task.nextAt) continue;

    task.remaining--;
    charArray.value[i] = task.remaining === 0 ? props.text[i] : getRandChar();
    task.nextAt = now + getRandomInt(50, 150);
  }

  rafId = hasActive ? requestAnimationFrame(tick) : null;
};

const ensureRaf = () => {
  if (!rafId && isVisible && !destroyed && typeof requestAnimationFrame !== "undefined") rafId = requestAnimationFrame(tick);
};

const scrambleChar = (index) => {
  tasks[index].remaining = getRandomInt(2, 10) + 1;
  tasks[index].nextAt = 0;
  ensureRaf();
};

const scramble = () => {
  props.text.split("").forEach((_, i) => scrambleChar(i));
};

let randomScrambleTimer = null;
const initRandomScrambling = () => {
  const iterate = () => {
    for (let k = 0; k < props.randomScrambleCount; k++) {
      setTimeout(() => scrambleChar(getRandomInt(0, props.text.length - 1)), getRandomInt(1000, 3000));
    }
  };

  iterate();
  randomScrambleTimer = setInterval(iterate, props.randomScrambleFreq);
};

watch(
  () => props.trigger,
  () => scramble(),
  { immediate: true, flush: "sync" },
);

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible) {
      ensureRaf();
    } else if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });
  observer.observe(rootEl.value);

  if (props.randomScramble) initRandomScrambling();
});

onUnmounted(() => {
  destroyed = true;
  observer?.disconnect();
  if (rafId) cancelAnimationFrame(rafId);
  clearInterval(randomScrambleTimer);
});
</script>

<template>
  <div ref="root-el" class="scramble-text">
    <div
      v-for="(char, i) in charArray"
      :key="i"
      class="scramble-text__char"
      :class="{ 'scramble-text__char_initial': char === text.charAt(i) }"
      @mouseenter.stop="scrambleChar(i)"
    >
      {{ char }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scramble-text {
  user-select: none;
  display: inline-block;
  line-height: 1;

  &__char {
    background: black;
    line-height: 1;
    display: inline-block;
    color: $color-font-base;

    &_initial {
      background: inherit;
      color: inherit;
    }
  }
}
</style>
