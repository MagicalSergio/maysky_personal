<script setup>
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import BaseContainer from "../base/BaseContainer.vue";
import ScrambleText from "../misc/ScrambleText.vue";
import CVTimeline from "../misc/VerticalTimeline.vue";
import TextWriter from "../misc/TextWriter.vue";

const data = {
  items: [
    {
      name: 'Coffee house \"Owl\"',
      description: "installed the g++ compiler <br>on a cash register;",
      decoration: 'std::cout << "Hello, World!" << std::endl;',
      time: "october 2018 — may 2019 (8 months)",
    },
    {
      name: "SERVICE CLOUD",
      field: "1c, cloud, bitrix",
      description: `
        immersed myself in&nbsp;the world <br>
        of&nbsp;web technologies;
        <br><br>
        passed internal exams <br>
        and probationary period <br>
        assessments with <span>top marks</span>;
        <br><br>
        <span>mastered</span> numerous tools <br>
        in&nbsp;a&nbsp;short time and quickly <br>
        got up&nbsp;to&nbsp;speed on&nbsp;real production tasks;
      `,
      stack: ["html", "css", "js", "ts", "angular", "php", "mysql"],
      decoration: "import { Component } from '@angular/core';",
      time: "june 2019 — march 2020 (10 months)",
    },
    {
      name: "VIGROM",
      field: "e-gaming",
      description: `
        lead developer of&nbsp;a&nbsp;frontend <br>
        platform/templating engine <br>
        for accelerating MVP project development, <br>
        result:&nbsp;<span>ttm&nbsp;reduced&nbsp;by&nbsp;20%</span>;
        <br><br>
        development of&nbsp;<span>complex, high-load <br>
        and interactive UIs</span>;
      `,
      stack: ["vue", "js", "ts", "nuxt", "php"],
      decoration: "&lt;DeveloperWorkflow v-model=”developer” /&gt;",
      time: "october 2020 — september 2023 (3 years)",
    },
    {
      name: "UPLAB",
      field: "design studio",
      description: `
        as&nbsp;a&nbsp;senior frontend developer, <br>
        <span>implemented</span> the frontend of&nbsp;a&nbsp;multi-page <br>
        <span>website</span> for a&nbsp;<span>large enterprise client</span> <br>
        under tight resource and time constraints;
      `,
      stack: ["vue", "js", "ts", "nuxt", "gsap", "jest"],
      decoration: "gsap.to('.box', { x: 100, duration: 1 });",
      time: "july 2024 — september 2024 (3 months)",
    },
    {
      name: "INTENSA",
      field: "e-commerce",
      description: `
        actively participated in&nbsp;the <span>development</span> <br>
        of&nbsp;a&nbsp;<span>reusable multi-page frontend template</span> <br>
        for e-commerce stores;
        <br><br>
        initiated an&nbsp;improved code review process;
      `,
      stack: ["vue", "js", "ts", "nuxt", "php", "laravel"],
      decoration: "await fetch('/api/get_site_settings/')",
      time: "september 2024 — may 2025 (9 months)",
    },
    {
      name: "YOU?",
      field: "??????",
      description: `kR7#mX2@vL9$nQ4&wP6!jT8*hF3%yB5^zA1(eC0)uD+sGoW=iM~rN<kJ>tK[pU]Qw!3Xm@8Lp#5Zt$2Rn%7Vc^1Hy&4Fd*9Bj(6Ks)0Ug+EoIa=Mw~Nt<Dq>Yr[Cf]Th{Sv}Px|JlGb/Wu.Ok,m@8Lp#5Zt$2Rn%7Vc^1Hy&)0Ug+EoIa=Mw~Nt<Dq>Yr[Cf|JlGb/Wu.Ok,m@8Lp#5Zt$`,
      stack: ["???", "???", "?????", "??"],
      time: "now — ???",
    },
  ],
};

const cvItems = useTemplateRef("cv-items");
const itemsContainerHeight = ref(0);

const calculateHeight = () => {
  itemsContainerHeight.value = cvItems.value.reduce((acc, cv, i) => {
    if (i + 1 === cvItems.value.length) {
      return acc + cv.getBoundingClientRect().height / 2;
    }

    return acc + cv.getBoundingClientRect().height;
  }, 0);
};

const adjustLastDateMargin = () => {
  const cvItem = cvItems.value[cvItems.value.length - 1];
  const dateItem = cvItem.querySelector(".cv-section__item-date");
  const parent = dateItem.parentElement;
  const parentStyle = getComputedStyle(parent);
  const innerHeight = parent.clientHeight - parseFloat(parentStyle.paddingTop) - parseFloat(parentStyle.paddingBottom);
  dateItem.style.setProperty("margin-bottom", `${innerHeight / 2 - dateItem.offsetHeight / 2}px`);
};

let observer = null;
const triggers = ref(data.items.map(() => false));
const initStackItemsScrambling = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const index = cvItems.value.indexOf(e.target);
          if (index !== -1) {
            triggers.value[index] = true;
          }
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" },
  );

  cvItems.value.forEach((el) => observer.observe(el));
};

onMounted(() => {
  calculateHeight();
  adjustLastDateMargin();
  initStackItemsScrambling();
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <section class="cv-section">
    <div class="cv-section__head">
      <TextWriter :text="'6 years: from brewing coffee <br /> to <span>versatile engineer</span>'" />
    </div>

    <div class="cv-section__items">
      <BaseContainer class="cv-section__timeline-container">
        <CVTimeline :height="itemsContainerHeight" class="cv-section__timeline" />
      </BaseContainer>

      <div ref="cv-items" v-for="(cv, i) in data.items" :key="cv.name" class="cv-section__item">
        <BaseContainer>
          <div class="cv-section__item-content">
            <div class="cv-section__item-date">
              <template v-if="i !== data.items.length - 1">
                {{ cv.time }}
              </template>
              <template v-else>
                <ScrambleText :text="cv.time.replaceAll(' ', '&nbsp;')" :random-scramble-count="2" />
              </template>
            </div>

            <div class="cv-section__item-info">
              <div class="cv-section__item-title">
                <template v-if="i !== data.items.length - 1">
                  <TextWriter :text="cv.name" :speed="10" />
                </template>
                <template v-else>
                  <ScrambleText :text="cv.name" />
                </template>
              </div>

              <div v-if="cv.field" class="cv-section__item-field">
                <template v-if="i !== data.items.length - 1">
                  <TextWriter :text="`# ${cv.field}`" />
                </template>
                <template v-else>
                  <ScrambleText :text="`#&nbsp;${cv.field}`" />
                </template>
              </div>

              <template v-if="i !== data.items.length - 1">
                <div class="cv-section__item-text">
                  <TextWriter :text="cv.description" />
                </div>
              </template>
              <template v-else>
                <div class="cv-section__item-text">
                  <ScrambleText :text="cv.description" :random-scramble-count="200" />
                </div>
              </template>

              <div v-if="cv.stack" class="cv-section__item-stack">
                <span v-for="item in cv.stack" :key="item">
                  <template v-if="i !== data.items.length - 1">
                    <ScrambleText
                      :style="{
                        visibility: triggers[i] ? 'visible' : 'hidden',
                      }"
                      :text="item"
                      :trigger="triggers[i]"
                      :random-scramble="false"
                    />
                  </template>
                  <template v-else>
                    <ScrambleText :text="item" />
                  </template>
                </span>
              </div>

              <div v-if="cv.decoration" class="cv-section__decoration">
                <TextWriter :text="cv.decoration" />
              </div>
            </div>
          </div>
        </BaseContainer>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cv-section {
  $root: &;

  &__head {
    padding: 6rem 0;
    padding-left: calc(50% + 1rem);
    background: $color-bg-add-1;
    font-size: 1.625rem;

    :deep(span) {
      color: $color-font-accent;
    }
  }

  &__item {
    font-size: 1.625rem;

    &:nth-child(2n) {
      background: $color-bg-add-1;
    }

    &:nth-child(2) {
      #{$root}__item-content {
        padding-top: 0;
      }
    }

    &:last-child {
      #{$root}__item-date {
        //
      }

      #{$root}__item-text {
        word-wrap: break-word;
      }
    }
  }

  &__item-content {
    padding: 6rem 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 2rem;
    align-items: start;
    justify-items: start;
  }

  &__timeline-container {
    position: relative;
  }

  &__timeline {
    position: absolute;
    top: 0;
    left: 5rem;
  }

  &__item-date {
    margin-left: 2rem;
    background: $color-bg-add-2;
    color: $color-font-add-1;
    font-weight: 700;
    font-size: 0.8rem;
    position: sticky;
    top: calc(50vh);
  }

  &__item-text {
    margin: 2rem 0 4rem;

    &:deep(span) {
      color: $color-font-accent;
    }
  }

  &__item-title {
    color: $color-font-accent;
    text-transform: uppercase;
    font-weight: bold;
  }

  &__item-field {
    color: $color-font-add-2;
  }

  &__item-stack {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      flex-shrink: 1;
      color: $color-font-accent;
      background: $color-bg-add-2;
    }
  }

  &__item-info {
    max-width: 100%;
  }

  &__decoration {
    margin-top: 4rem;
    color: $color-font-add-2;
    white-space: nowrap;
    font-size: 1.2rem;
  }
}
</style>
