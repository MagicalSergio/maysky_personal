<!-- ScrambleText.vue -->
<script setup>
import { ref, watch, onUnmounted } from "vue";

const props = defineProps({
  trigger: true,
  speed: 50,
  scrambleChars:
    "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  staggerFromCenter: true,
  revealDuration: 800,
});

const emit = defineEmits(["complete"]);

const displayText = ref(props.text);

let intervalId = null;

function getRandomChar() {
  const chars = props.scrambleChars;
  return chars[Math.floor(Math.random() * chars.length)];
}

function scramble() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  console.log('props.text: ', props.text);
  const original = props.text;
  const len = original.length;
  const center = len / 2;

  const revealTimes = [];
  for (let i = 0; i < len; i++) {
    if (props.staggerFromCenter) {
      const distFromCenter = Math.abs(i - center) / (len / 2);
      revealTimes.push(distFromCenter * props.revealDuration);
    } else {
      revealTimes.push((i / len) * props.revealDuration);
    }
  }

  const startTime = performance.now();
  const revealed = new Array(len).fill(false);

  intervalId = setInterval(() => {
    const elapsed = performance.now() - startTime;
    let allRevealed = true;
    const chars = [];

    for (let i = 0; i < len; i++) {
      if (original[i] === " ") {
        chars.push(" ");
        continue;
      }

      if (revealed[i]) {
        chars.push(original[i]);
        continue;
      }

      if (elapsed >= revealTimes[i]) {
        revealed[i] = true;
        chars.push(original[i]);
      } else {
        allRevealed = false;
        chars.push(getRandomChar());
      }
    }

    displayText.value = chars.join("");

    if (allRevealed) {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
      emit("complete");
    }
  }, props.speed);
}

watch(
  () => props.trigger,
  (val) => {
    if (val) scramble();
    else displayText.value = props.text;
  },
  { immediate: true },
);

watch(
  () => props.text,
  () => {
    displayText.value = props.text;
  },
);

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <span>{{ displayText }}</span>
</template>
