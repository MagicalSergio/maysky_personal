<script setup>
import { onMounted, onUnmounted, useTemplateRef, ref, watch } from "vue";
import { getScroll } from "../../scripts/scroll";
import BaseContainer from "../base/BaseContainer.vue";
import TextWriter from "../misc/TextWriter.vue";
import ProjectPartyBot from "../project-cards/ProjectPartyBot.vue";
import ProjectTrueNews from "../project-cards/ProjectTrueNews.vue";
import ProjectMayskyVPN from "../project-cards/ProjectMayskyVPN.vue";
import ProjectThisSite from "../project-cards/ProjectThisSite.vue";

const scrollViewport = useTemplateRef("cards-scroll-viewport");
const scrollRail = useTemplateRef("cards-scroll-rail");
const thisSiteCard = useTemplateRef("this-site-card");

const progress = ref(0);
const expandScale = ref(1);

let scrollHandler = null;
const initScrollListener = () => {
  const viewportRect = scrollViewport.value.getBoundingClientRect();
  const railRect = scrollRail.value.getBoundingClientRect();
  const length = railRect.height - viewportRect.height;
  const scrollStart = railRect.top + window.scrollY - window.innerHeight * 0.075;

  scrollHandler = (ev) => {
    const raw = (ev.actualScroll - scrollStart) / length;
    progress.value = Math.min(Math.max(raw, 0), 1);
  };
  getScroll().on("scroll", scrollHandler);
};

const computeExpandScale = () => {
  const terminalEl = thisSiteCard.value?.$el?.querySelector(".terminal-wrapper");
  if (!terminalEl) return;
  const { width: tw, height: th } = terminalEl.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  expandScale.value = Math.max((vw + 240) / tw, (vh + 120) / th);
};

const keyframes = {
  partyBot: {
    active: { brightness: 1, y: 0, scale: 1 },
    exit: { brightness: 0.6, y: -15, scale: 0.85 },
  },
  trueNews: {
    enter: { brightness: 0.8, y: 105, scale: 1 },
    active: { brightness: 1, y: 0, scale: 1 },
    exit: { brightness: 0.75, y: -10, scale: 0.9 },
  },
  vpn: {
    enter: { brightness: 0.8, y: 105, scale: 1 },
    active: { brightness: 1, y: 0, scale: 1 },
    exit: { brightness: 0.9, y: -5, scale: 0.95 },
  },
  thisSite: {
    enter: { brightness: 0.8, y: 105, scale: 1 },
    active: { brightness: 1, y: 0, scale: 1 },
  },
};

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const remap = (t, a, b) => Math.min(Math.max((t - a) / (b - a), 0), 1);
const lerp = (a, b, t) => a + (b - a) * t;
const lerpKf = (from, to, t) => ({
  brightness: lerp(from.brightness, to.brightness, t),
  y: lerp(from.y, to.y, t),
  scale: lerp(from.scale, to.scale, t),
});

const toStyle = ({ brightness, y, scale }, zIndex) => ({
  filter: `brightness(${brightness})`,
  transform: `translateY(${y}%) scale(${scale})`,
  zIndex,
});

const cardsStyles = ref({
  partyBot: toStyle(keyframes.partyBot.active, "2"),
  trueNews: toStyle(keyframes.trueNews.enter, "1"),
  vpn: toStyle(keyframes.vpn.enter, "1"),
  thisSite: toStyle(keyframes.thisSite.enter, "1"),
});

watch(
  () => progress.value,
  (p) => {
    const pbOut = easeInOut(remap(p, 0, 0.3));
    cardsStyles.value.partyBot = toStyle(lerpKf(keyframes.partyBot.active, keyframes.partyBot.exit, pbOut), p < 0.3 ? "2" : "1");

    const tnIn = easeInOut(remap(p, 0.1, 0.3));
    const tnOut = easeInOut(remap(p, 0.3, 0.6));
    const tn = lerpKf(lerpKf(keyframes.trueNews.enter, keyframes.trueNews.active, tnIn), keyframes.trueNews.exit, tnOut);
    cardsStyles.value.trueNews = toStyle(tn, p < 0.3 ? "4" : "1");

    const vpnIn = easeInOut(remap(p, 0.4, 0.6));
    const vpnOut = easeInOut(remap(p, 0.6, 0.9));
    const vpn = lerpKf(lerpKf(keyframes.vpn.enter, keyframes.vpn.active, vpnIn), keyframes.vpn.exit, vpnOut);
    cardsStyles.value.vpn = toStyle(vpn, p < 0.4 ? "3" : "1");

    const tsIn = easeInOut(remap(p, 0.72, 0.88));
    const tsExpand = easeInOut(remap(p, 0.88, 1));
    const tsActive = lerpKf(keyframes.thisSite.enter, keyframes.thisSite.active, tsIn);
    const tsExpanded = { ...keyframes.thisSite.active, scale: expandScale.value };
    cardsStyles.value.thisSite = toStyle(lerpKf(tsActive, tsExpanded, tsExpand), p >= 0.8 ? "2" : "1");
  },
);

onMounted(() => {
  initScrollListener();
  computeExpandScale();
});

onUnmounted(() => {
  getScroll().off("scroll", scrollHandler);
});
</script>

<template>
  <section class="projects-section">
    <div class="projects-section__head">
      <BaseContainer>
        <TextWriter text='i build purposeful tools for myself and my <span class="l">loved</span> ones' keep-cursor :speed="20" />
      </BaseContainer>
    </div>

    <div class="projects-section__scroll-rail" ref="cards-scroll-rail">
      <div class="projects-section__scroll-container" ref="cards-scroll-viewport">
        <ProjectPartyBot :style="cardsStyles.partyBot" class="projects-section__project" />
        <ProjectTrueNews :style="cardsStyles.trueNews" class="projects-section__project" />
        <ProjectMayskyVPN :style="cardsStyles.vpn" class="projects-section__project" />
        <ProjectThisSite ref="this-site-card" :style="cardsStyles.thisSite" class="projects-section__project" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.projects-section {
  contain: paint;

  &__head {
    font-size: 4rem;
    text-indent: calc(50% + 1rem);
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    background: $color-bg-add-1;

    @media #{$media-mobile} {
      text-indent: 0;
      height: auto;
      padding: 6rem 0;
    }

    :deep(.l) {
      color: $color-font-accent-2;
    }
  }

  &__scroll-rail {
    position: relative;
    height: 400vh;
    padding-top: 7.5vh;
  }

  &__scroll-container {
    height: 92.5vh;
    position: sticky;
    top: 7.5vh;
  }

  &__project {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    will-change: opacity, transform;
  }
}
</style>
