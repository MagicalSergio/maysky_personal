<script setup>
import { ref, defineProps, watch, onMounted } from "vue";
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
  randomScramble: {
    type: Boolean,
    default: true,
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
  initial.split("").forEach((_, i) => {
    scrambleChar(i);
  });
};

const initRandomScrambling = () => {
  const initial = props.text;

  const iterate = () => {
    Array.from({ length: props.randomScrambleCount }).forEach(() => {
      const timeout = setTimeout(
        () => {
          const randomIndex = getRandomInt(0, initial.length);
          scrambleChar(randomIndex);
          clearTimeout(timeout);
        },
        getRandomInt(1000, 3000),
      );
    });
  };

  iterate();

  setInterval(() => {
    iterate();
  }, 2000);
};

watch(
  () => props.trigger,
  () => {
    scramble();
  },
);

onMounted(() => {
  if (props.randomScramble) initRandomScrambling();
});
</script>

<template>
  <div class="scramble-text">
    <div
      v-for="(char, i) in resultText"
      :key="char"
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
