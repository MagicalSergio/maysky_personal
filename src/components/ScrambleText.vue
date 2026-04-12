<script setup>
import { ref, computed, defineProps, watch } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  trigger: {
    default: false,
  },
});

const chars =
  "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const resultText = ref(props.text);

const getRandChar = () => chars[Math.floor(Math.random() * chars.length)];
const getRandInterval = () => Math.floor(Math.random() * 250);
const getRandAmount = () => Math.floor(Math.random() * (10 - 2) + 10);
const intervals = ref(Array.from({ length: props.text.length }));

const scrambleChar = (index) => {
  let i = 0;
  let limit = getRandAmount();
  clearInterval(intervals.value[index]);
  intervals.value[index] = setInterval(() => {
    const splitted = resultText.value.split("");
    if (i < limit) {
      splitted[index] = getRandChar();
    } else {
      splitted[index] = props.text.charAt(index);
      clearInterval(intervals.value[index]);
    }
    resultText.value = splitted.join("");
    i++;
  }, getRandInterval());
};

const scramble = () => {
  const initial = props.text;
  initial.split("").forEach((c, i) => {
    scrambleChar(i);
  });
};

watch(
  () => props.trigger,
  () => {
    scramble();
  },
);
</script>

<template>
  <div class="scramble-text">
    <span
      v-for="(char, i) in resultText"
      :key="char"
      class="scramble-text__char"
      :class="{ 'scramble-text__char_initial': char === text.charAt(i) }"
      @mouseenter.stop="scrambleChar(i)"
    >
      {{ char }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.scramble-text {
  cursor: pointer;

  &__char {
    background: #4d4d4d;
    line-height: 75%;
    display: inline-block;
    color: black;

    &_initial {
      background: transparent;
      color: white;
      // color: rgb(255, 0, 140);
    }
  }
}
</style>
