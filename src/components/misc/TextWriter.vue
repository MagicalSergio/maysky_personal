<script setup>
import { onMounted, ref, useTemplateRef } from "vue";
import { cubicBezier } from "../../util/cubicBezier";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 1200,
  },
  keepCursor: {
    type: Boolean,
    default: false,
  },
});

const textEl = useTemplateRef("text");
const actualText = ref("");

const EASING = { x1: 0, y1: 0.1, x2: 0.05, y2: 0.2 };
const ease = cubicBezier(EASING);

const show = () => {
  const total = props.text.length;
  const duration = props.duration;
  const start = performance.now();

  const animate = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const progress = ease(t);
    actualText.value = props.text.slice(0, Math.round(progress * total));

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      actualText.value = props.text + (props.keepCursor ? '<span class="u">_</span>' : "");
    }
  };

  requestAnimationFrame(animate);
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          observer.disconnect();
          show();
        }
      });
    },
    { rootMargin: "-25% 0px -25% 0px" },
  );

  observer.observe(textEl.value);
});
</script>

<template>
  <div ref="text" class="text-writer">
    <div class="text-writer__fake" v-html="props.text" />
    <div class="text-writer__real" v-html="actualText" />
  </div>
</template>

<style lang="scss" scoped>
.text-writer {
  position: relative;

  :deep(.u) {
    animation: blink 1s step-end infinite;
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

  &__fake {
    visibility: hidden;
  }

  &__real {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
