<script setup>
import AbstractProjectCard from "../misc/AbstractProjectCard.vue";
import trueNewsPreviewImg from "../../assets/images/true-news-preview@2x.png?url";

const DATA = {
  href: "https://github.com/MagicalSergio/TrueNews",
  title: "true-news",
  subtitle: "an AI-powered news analyzer and aggregator",
  features: [
    "news scraping and parsing from multiple sources",
    "handles anti-scraping mechanisms",
    "flexible parsers’ setup",
    "admin panel",
    "AI news clustering and rating (_wip)",
  ],
  stack: ["python", "flask", "sqlite", "sqlalchemy", "alembic", "playwright", "curl-cffi"],
};
</script>

<template>
  <AbstractProjectCard v-bind="DATA" class="project-true-news">
    <img :src="trueNewsPreviewImg" alt="truenews preview" />
  </AbstractProjectCard>
</template>

<style lang="scss">
.project-true-news {
  //
}
</style>
