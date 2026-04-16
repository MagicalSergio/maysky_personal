<script setup>
import { ref, computed, defineProps, watch, onMounted } from "vue";
import { getRandomInt } from "../util/random";

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

const getRandChar = () => chars[getRandomInt(0, chars.length - 1)];
const intervals = ref(Array.from({ length: props.text.length }));

const scrambleChar = (index) => {
  let i = 0;
  let limit = getRandomInt(2, 10);
  clearInterval(intervals.value[index]);
  intervals.value[index] = setInterval(
    () => {
      const splitted = resultText.value.split("");
      if (i < limit) {
        splitted[index] = getRandChar();
      } else {
        splitted[index] = props.text.charAt(index);
        clearInterval(intervals.value[index]);
      }
      resultText.value = splitted.join("");
      i++;
    },
    getRandomInt(50, 150),
  );
};

const scramble = () => {
  const initial = props.text;
  initial.split("").forEach((c, i) => {
    scrambleChar(i);
  });
};

const initRandomScrambling = () => {
  const f = () => {
    const initial = props.text;
    const randomIndex = getRandomInt(0, initial.length);
    scrambleChar(randomIndex);
    clearTimeout(timeout);
    timeout = setTimeout(f, getRandomInt(1000, 3000));
  };

  let timeout = setTimeout(f, getRandomInt(1000, 3000));
};

watch(
  () => props.trigger,
  () => {
    scramble();
  },
);

onMounted(() => {
  initRandomScrambling();
});
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
