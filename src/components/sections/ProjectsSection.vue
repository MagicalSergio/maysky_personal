<script setup>
import { onMounted, useTemplateRef, ref, onUnmounted, watch } from "vue";
import { getScroll } from "../../scripts/scroll";
import lottie from "lottie-web";
import BaseContainer from "../base/BaseContainer.vue";
import TextWriter from "../misc/TextWriter.vue";
import ScrambleText from "../misc/ScrambleText.vue";
import GHIcon from "../../assets/icons/gh.svg?component";
import LinkArrow from "../../assets/icons/link-arrow.svg?component";
import trueNewsPreviewImg from "../../assets/images/true-news-preview@2x.png?url";
import MayskyVPN from "../misc/MayskyVPN.vue";
import TerminalWrapper from "../misc/TerminalWrapper.vue";

/**
 * Partybot animation
 */
const partyBotAnimationContainer = useTemplateRef("party-bot-anim-container");
let partyBotObserver = null;

const loadAnimation = () => {
  lottie.loadAnimation({
    name: "chat",
    container: partyBotAnimationContainer.value,
    renderer: "svg",
    loop: true,
    path: "/src/public/party-bot-anim.json",
  });

  lottie.stop("chat");

  partyBotObserver = new IntersectionObserver(([entry]) => {
    entry.isIntersecting ? lottie.play("chat") : lottie.stop("chat");
  }, { threshold: 0.2 });

  partyBotObserver.observe(partyBotAnimationContainer.value);
};

onMounted(loadAnimation);
onUnmounted(() => partyBotObserver?.disconnect());

/**
 * Tech stacks observer
 */
let stacksObserver = null;
const stackBlocks = [];
const triggers = ref([]);
const initStacksObserver = () => {
  stacksObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const i = stackBlocks.indexOf(e.target);
        triggers.value[i] = true;
        stacksObserver.unobserve(e.target);
      }
    });
  });

  stackBlocks.forEach((sb) => {
    triggers.value.push(false);
    stacksObserver.observe(sb);
  });
};

const disconnectStacksObserver = () => {
  if (stacksObserver) stacksObserver.disconnect();
};

onMounted(initStacksObserver);
onUnmounted(disconnectStacksObserver);

/**
 * Sticky stack cards
 */
const scrollViewport = useTemplateRef("cards-scroll-viewport");
const scrollRail = useTemplateRef("cards-scroll-rail");
const progress = ref(0);
const initScrollListener = () => {
  const viewportRect = scrollViewport.value.getBoundingClientRect();
  const railRect = scrollRail.value.getBoundingClientRect();
  const length = railRect.height - viewportRect.height;
  const scrollStart = railRect.top + window.scrollY - window.innerHeight * 0.075;

  getScroll().on("scroll", (ev) => {
    const raw = (ev.actualScroll - scrollStart) / length;
    progress.value = Math.min(Math.max(raw, 0), 1);
  });
};

const keyframes = {
  partyBot: {
    active: { brightness: 1, y: 0, scale: 1 },
    exit: { brightness: 0.6, y: -10, scale: 0.89 },
  },
  trueNews: {
    enter: { brightness: 0.8, y: 100, scale: 1 },
    active: { brightness: 1, y: 0, scale: 1 },
    exit: { brightness: 0.6, y: -5.5, scale: 0.94 },
  },
  vpn: {
    enter: { brightness: 0.8, y: 100, scale: 1 },
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
});

watch(
  () => progress.value,
  (p) => {
    const pbOut = easeInOut(remap(p, .1, 0.3));
    cardsStyles.value.partyBot = toStyle(
      lerpKf(keyframes.partyBot.active, keyframes.partyBot.exit, pbOut),
      p < 0.3 ? "2" : "1",
    );

    const tnIn = easeInOut(remap(p, 0.2, 0.5));
    const tnOut = easeInOut(remap(p, 0.5, 0.7));
    const tn = lerpKf(
      lerpKf(keyframes.trueNews.enter, keyframes.trueNews.active, tnIn),
      keyframes.trueNews.exit,
      tnOut,
    );
    cardsStyles.value.trueNews = toStyle(tn, p < 0.6 ? "2" : "1");

    const vpnIn = easeInOut(remap(p, 0.6, 1));
    cardsStyles.value.vpn = toStyle(lerpKf(keyframes.vpn.enter, keyframes.vpn.active, vpnIn), p >= 0.8 ? "2" : "1");
  },
);

onMounted(() => {
  initScrollListener();
});
</script>

<template>
  <section class="projects-section">
    <div class="projects-section__head">
      <BaseContainer>
        <TextWriter
          text='i build purposeful tools for myself and my <span class="l">loved</span> ones'
          :duration="4000"
          keep-cursor
        />
      </BaseContainer>
    </div>

    <!-- PartyBot BEGIN -->
    <div class="projects-section__scroll-rail" ref="cards-scroll-rail">
      <div class="projects-section__scroll-container" ref="cards-scroll-viewport">
        <div class="projects-section__project project" :style="cardsStyles.partyBot">
          <BaseContainer class="project__base-container">
            <TerminalWrapper title="party-bot" class="project__terminal-wrap">
              <div class="project__container">
                <div class="project__party-bot-anim">
                  <div class="party-bot-anim">
                    <div ref="party-bot-anim-container" class="party-bot-anim__container" />
                  </div>
                </div>

                <div class="project__info">
                  <div class="project__head">
                    <a href="https://github.com/MagicalSergio/super-party-bot" target="_blank" class="project__link">
                      <h2 class="project__title">
                        <TextWriter text="party-bot" />
                      </h2>

                      <div class="project__gh-link">
                        <GHIcon class="project__gh-icon" />
                        <LinkArrow class="project__gh-arrow" />
                      </div>
                    </a>
                  </div>

                  <div class="project__subtitle">
                    <TextWriter text="an AI-chat assistant" />
                  </div>

                  <ul class="project__features">
                    <li>\1<TextWriter text="multiple switchable AI personalities" /></li>
                    <li>\2<TextWriter text="context saving and updating" /></li>
                    <li>\3<TextWriter text="proxied by shadowsocks (_outdated)" /></li>
                  </ul>

                  <div
                    :ref="(el) => stackBlocks.push(el)"
                    :style="{ opacity: triggers[0] ? '1' : '0' }"
                    class="project__stack"
                  >
                    <ScrambleText :random-scramble="false" :trigger="triggers[0]" text="node" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[0]" text="ts" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[0]" text="sqlite" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[0]" text="typeorm" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[0]" text="shadowsocks" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[0]" text="grok" />
                  </div>
                </div>
              </div>
            </TerminalWrapper>
          </BaseContainer>
        </div>
        <!-- PartyBot END -->

        <!-- TrueNews BEGIN -->
        <div class="projects-section__project project" :style="cardsStyles.trueNews">
          <BaseContainer class="project__base-container">
            <TerminalWrapper title="true-news" class="project__terminal-wrap">
              <div class="project__container">
                <div class="project__true-news-media">
                  <img :src="trueNewsPreviewImg" alt="truenews preview" />
                </div>

                <div class="project__info">
                  <div class="project__head">
                    <a href="https://github.com/MagicalSergio/TrueNews" target="_blank" class="project__link">
                      <h2 class="project__title">
                        <TextWriter text="true-news" />
                      </h2>

                      <div class="project__gh-link">
                        <GHIcon class="project__gh-icon" />
                        <LinkArrow class="project__gh-arrow" />
                      </div>
                    </a>
                  </div>

                  <div class="project__subtitle">
                    <TextWriter text="an AI-powered news analyzer and aggregator" />
                  </div>

                  <ul class="project__features">
                    <li>\1<TextWriter text="news scraping and parsing from multiple sources" /></li>
                    <li>\2<TextWriter text="handles anti-scraping mechanisms" /></li>
                    <li>\3<TextWriter text="flexible parsers’ setup" /></li>
                    <li>\4 <TextWriter text="admin panel" /></li>
                    <li>\5<TextWriter text="AI news clustering and rating (_wip)" /></li>
                  </ul>

                  <div
                    :ref="(el) => stackBlocks.push(el)"
                    :style="{ opacity: triggers[1] ? '1' : '0' }"
                    class="project__stack"
                  >
                    <ScrambleText :random-scramble="false" :trigger="triggers[1]" text="python" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[1]" text="flask" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[1]" text="sqlite" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[1]" text="sqlalchemy" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[1]" text="playwright" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[1]" text="curl-cffi" />
                  </div>
                </div>
              </div>
            </TerminalWrapper>
          </BaseContainer>
        </div>
        <!-- TrueNews END -->

        <!-- Maysky VPN BEGIN -->
        <div class="projects-section__project project" :style="cardsStyles.vpn">
          <BaseContainer class="project__base-container">
            <TerminalWrapper title="maysky-vpn" class="project__terminal-wrap">
              <div class="project__container">
                <div class="project__maysky-vpn">
                  <MayskyVPN />
                </div>

                <div class="project__info">
                  <div class="project__head">
                    <h2 class="project__title">
                      <TextWriter text="maysky-vpn" />
                    </h2>
                  </div>

                  <div class="project__subtitle">
                    <TextWriter text="family VPN for censorship fooling" />
                  </div>

                  <ul class="project__features">
                    <li><TextWriter text="\1 mimics common http/tls traffic" /></li>
                    <li><TextWriter text="\2 fake destination domain" /></li>
                    <li><TextWriter text="\3 while enabled, works only for unavailable resources" /></li>
                  </ul>

                  <div
                    :ref="(el) => stackBlocks.push(el)"
                    :style="{ opacity: triggers[2] ? '1' : '0' }"
                    class="project__stack"
                  >
                    <ScrambleText :random-scramble="false" :trigger="triggers[2]" text="xray" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[2]" text="vless" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[2]" text="xhttp" />
                    <ScrambleText :random-scramble="false" :trigger="triggers[2]" text="reality" />
                  </div>
                </div>
              </div>
            </TerminalWrapper>
          </BaseContainer>
        </div>
        <!-- Maysky VPN END -->
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "/src/styles/utils.scss" as *;

.project {
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
  }

  &__party-bot-anim {
    height: 100%;
    flex-shrink: 0;
    flex-grow: 1;
    flex-basis: 0;
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
    max-height: 100%;
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

.party-bot-anim {
  overflow: hidden;
  position: relative;
  overflow: hidden;
  height: 100%;

  &__container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    :deep(svg) {
      display: block;

      & > g {
        & > g {
          &:last-child {
            display: none !important;
          }
        }
      }
    }
  }
}

.projects-section {
  &__head {
    font-size: 4rem;
    text-indent: calc(50% + 1rem);
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    background: $color-bg-add-1;

    :deep(.l) {
      color: $color-font-accent-2;
    }
  }

  &__scroll-rail {
    position: relative;
    height: 300vh;
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
