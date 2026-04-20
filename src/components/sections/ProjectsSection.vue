<script setup>
import { onMounted, useTemplateRef } from "vue";
import lottie from "lottie-web";
import BaseContainer from "../base/BaseContainer.vue";
import TextWriter from "../misc/TextWriter.vue";
import ScrambleText from "../misc/ScrambleText.vue";
import GHIcon from "../../assets/icons/gh.svg?component";
import LinkArrow from "../../assets/icons/link-arrow.svg?component";
import trueNewsPreviewImg from "../../assets/images/true-news-preview@15x.png?url";
import mayskyVpnPreviewImg from "../../assets/images/maysky-vpn@15xnew.jpg?url";

const partyBotAnimationContainer = useTemplateRef("party-bot-anim-container");

onMounted(() => {
  lottie.loadAnimation({
    container: partyBotAnimationContainer.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/src/public/party-bot-anim.json",
  });
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
    <div class="projects-section__project project">
      <BaseContainer>
        <div class="project__container">
          <div class="project__party-bot-anim">
            <div class="party-bot-anim">
              <div
                ref="party-bot-anim-container"
                class="party-bot-anim__container"
              />
            </div>
          </div>

          <div class="project__info">
            <div class="project__head">
              <h2 class="project__title">party-bot</h2>

              <a
                href="https://github.com/MagicalSergio/super-party-bot"
                target="_blank"
                class="project__link"
              >
                <GHIcon />
                <LinkArrow />
              </a>
            </div>

            <div class="project__subtitle">an AI-chat assistant</div>

            <ul class="project__features">
              <li>\1 multiple switchable AI personalities</li>
              <li>\2 context saving and updating</li>
              <li>\3 proxied by shadowsocks (_outdated)</li>
            </ul>

            <div class="project__stack">
              <ScrambleText :random-scramble="false" text="node" />
              <ScrambleText :random-scramble="false" text="ts" />
              <ScrambleText :random-scramble="false" text="sqlite" />
              <ScrambleText :random-scramble="false" text="typeorm" />
              <ScrambleText :random-scramble="false" text="shadowsocks" />
              <ScrambleText :random-scramble="false" text="grok" />
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
    <!-- PartyBot END -->

    <!-- TrueNews BEGIN -->
    <div class="projects-section__project project project_dark">
      <BaseContainer>
        <div class="project__container">
          <div class="project__true-news-media">
            <img :src="trueNewsPreviewImg" alt="truenews preview" />
          </div>

          <div class="project__info">
            <div class="project__head">
              <h2 class="project__title">true-news</h2>

              <a
                href="https://github.com/MagicalSergio/TrueNews"
                target="_blank"
                class="project__link"
              >
                <GHIcon />
                <LinkArrow />
              </a>
            </div>

            <div class="project__subtitle">
              an AI-powered news analyzer and aggregator
            </div>

            <ul class="project__features">
              <li>\1 news scraping and parsing from multiple sources</li>
              <li>\2 handles anti-scraping mechanisms</li>
              <li>\3 flexible parsers’ setup</li>
              <li>\4 admin panel</li>
              <li>\5 AI news clustering and rating (_wip)</li>
            </ul>

            <div class="project__stack">
              <ScrambleText :random-scramble="false" text="python" />
              <ScrambleText :random-scramble="false" text="flask" />
              <ScrambleText :random-scramble="false" text="sqlite" />
              <ScrambleText :random-scramble="false" text="sqlalchemy" />
              <ScrambleText :random-scramble="false" text="playwright" />
              <ScrambleText :random-scramble="false" text="curl-cffi" />
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
    <!-- TrueNews END -->

    <!-- Maysky VPN BEGIN -->
    <div class="projects-section__project project">
      <BaseContainer>
        <div class="project__container">
          <div class="project__true-news-media">
            <img :src="mayskyVpnPreviewImg" alt="truenews preview" />
          </div>

          <div class="project__info">
            <div class="project__head">
              <h2 class="project__title">maysky-vpn</h2>
            </div>

            <div class="project__subtitle">
              family VPN for censorship fooling
            </div>

            <ul class="project__features">
              <li>\1 mimics common http/tls traffic</li>
              <li>\2 fake destination domain</li>
              <li>\3 while enabled, works only for unavailable resources</li>
            </ul>

            <div class="project__stack">
              <ScrambleText :random-scramble="false" text="xray" />
              <ScrambleText :random-scramble="false" text="vless" />
              <ScrambleText :random-scramble="false" text="xhttp" />
              <ScrambleText :random-scramble="false" text="reality" />
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
    <!-- Maysky VPN END -->
  </section>
</template>

<style lang="scss" scoped>
.project {
  font-size: 1.6rem;

  &__title {
    font-size: 4rem;
    color: $color-font-accent;
    font-weight: 400;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(8, minmax(0, 1fr));
    padding: 7rem 0;
    align-items: start;
  }

  &__party-bot-anim {
    padding-right: 1rem;
    grid-column: 2 / span 3;
  }

  &__info {
    grid-column: span 4;
    padding-left: 1rem;
    position: sticky;
    top: 7rem;
  }

  &__head {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  &__link {
    display: flex;
    align-items: flex-start;
    gap: 0.1rem;
    color: $color-font-add-2;

    img {
      flex-shrink: 0;
    }

    &:hover {
      color: $color-font-accent;
    }
  }

  &__subtitle {
    margin-bottom: 3rem;
  }

  &__features {
    margin-bottom: 3rem;
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
    grid-column: 1 / span 4;
    padding-right: 1rem;
  }

  &_dark {
    background: $color-bg-add-1;
  }
}

.party-bot-anim {
  height: 40rem;
  max-height: 40rem;
  overflow: hidden;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;

  &__container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: $color-bg-add-1;

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
}
</style>
