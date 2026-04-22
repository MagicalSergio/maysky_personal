<script setup>
import { ref, computed, onMounted, onUnmounted, useTemplateRef, watch } from "vue";
import { getScroll } from "../../scripts/scroll";

const props = defineProps({
  height: {
    type: Number,
    required: true,
  },
});

const progress = ref(0.5);

const rail = useTemplateRef("rail");
const standardCell = useTemplateRef("standard-cell");

const isMountCompleted = ref(false);
const cells = ref([]);

const heightPX = computed(() => `${props.height}px`);

const computeCells = () => {
  const cellHeight = standardCell.value.offsetHeight;
  const cellsAmount = Math.ceil(props.height / (cellHeight + cellHeight * 0.6));
  cells.value = Array.from({ length: cellsAmount }).map(() => false);
};

const updateCellsByProgress = () => {
  cells.value = cells.value.map((_, i) => i < Math.ceil(cells.value.length * progress.value));
};

let scrollHandler = null;
const initScrollHandler = () => {
  scrollHandler = (ev) => {
    const offset = window.innerHeight / 2;
    const length = rail.value.getBoundingClientRect().height;
    const start = ev.actualScroll + rail.value.getBoundingClientRect().top - offset;
    progress.value = (ev.actualScroll - start) / length;
  };
  getScroll().on("scroll", scrollHandler);
};

watch(() => progress.value, updateCellsByProgress);
watch(() => props.height, computeCells);

onMounted(() => {
  computeCells();
  updateCellsByProgress();
  initScrollHandler();
  isMountCompleted.value = true;
});

onUnmounted(() => {
  if (scrollHandler) getScroll().off("scroll", scrollHandler);
});
</script>

<template>
  <div class="vertical-timeline">
    <div ref="rail" class="vertical-timeline__rail">
      <div v-if="!isMountCompleted" ref="standard-cell" class="vertical-timeline__cell" />

      <template v-else>
        <div
          v-for="(c, i) in cells"
          :key="`cell-${i}`"
          class="vertical-timeline__cell"
          :class="{ 'vertical-timeline__cell_active': c }"
        ></div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vertical-timeline {
  &__rail {
    height: v-bind(heightPX);
    width: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  &__cell {
    height: 0.5rem;
    flex-shrink: 0;
    border: 1px solid $color-bg-add-3;

    &_active {
      background: $color-bg-add-3;
    }
  }
}
</style>
