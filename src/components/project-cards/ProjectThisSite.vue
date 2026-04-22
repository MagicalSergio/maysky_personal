<script setup>
import TerminalWrapper from "../misc/TerminalWrapper.vue";
import BaseContainer from "../base/BaseContainer.vue";
import TextWriter from "../misc/TextWriter.vue";
</script>

<template>
  <div class="project-this-site">
    <BaseContainer class="project-this-site__container">
      <TerminalWrapper title="https://maysky.dev/" class="project-this-site__terminal">
        <TextWriter class="project-this-site__title" text="https://maysky.dev/" keep-cursor :speed="25" />
      </TerminalWrapper>
    </BaseContainer>
  </div>
</template>

<style lang="scss" scoped>
.project-this-site {
  height: 85vh;
  max-height: 85vh;
  min-height: 85vh;

  &__container {
    height: 100%;
  }

  &__terminal {
    height: 100%;
  }

  &__title {
    font-size: 5rem;
    text-align: center;
    width: 100%;
    color: $color-font-base;
  }
}
</style>

<style lang="scss">
.project-this-site {
  .terminal-wrapper__content {
    background: $color-bg-base;
  }
}
</style>
