<script setup>
import TerminalWrapper from "../misc/TerminalWrapper.vue";
import BaseContainer from "../base/BaseContainer.vue";
</script>

<template>
  <div class="project-this-site">
    <BaseContainer class="project-this-site__container">
      <TerminalWrapper class="project-this-site__terminal">прив</TerminalWrapper>
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
}
</style>

<style lang="scss">
.project-this-site {
  .terminal-wrapper__content {
    background: black;
  }
}
</style>
