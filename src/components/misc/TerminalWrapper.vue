<script setup>
import CloseIcon from "../../assets/images/terminal/close.svg?component";
import ExpandIcon from "../../assets/images/terminal/expand.svg?component";
import HideIcon from "../../assets/images/terminal/hide.svg?component";
import BatteryFullIcon from "../../assets/images/terminal/battery-full.svg?component";
import BatteryEmptyIcon from "../../assets/images/terminal/battery-empty.svg?component";

const props = defineProps({
  title: {
    type: String,
    default: "terminal",
  },
});
</script>

<template>
  <div class="terminal-wrapper">
    <div class="terminal-wrapper__head">
      <div class="terminal-wrapper__icons">
        <div class="terminal-wrapper__icon"><HideIcon /></div>
        <div class="terminal-wrapper__icon"><ExpandIcon /></div>
        <div class="terminal-wrapper__icon"><CloseIcon /></div>
      </div>

      <div class="terminal-wrapper__title">{{ title }}</div>

      <div class="terminal-wrapper__statuses">
        <div class="terminal-wrapper__status-item">
          <div class="terminal-wrapper__status-text">PWR</div>
          <div class="terminal-wrapper__status-icon"><BatteryFullIcon /></div>
        </div>

        <div class="terminal-wrapper__status-item terminal-wrapper__status-item_gray">
          <div class="terminal-wrapper__status-text">HDD</div>
          <div class="terminal-wrapper__status-icon"><BatteryEmptyIcon /></div>
        </div>
      </div>
    </div>

    <div class="terminal-wrapper__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.terminal-wrapper {
  $root: &;

  border-radius: 0.25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #404040;

  &__head {
    height: 1.5rem;
    min-height: 1.5rem;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #404040;
    width: 100%;
    background: #2a2a2a;
  }

  &__title {
    font-family: "Open Sans", sans-serif;
    font-size: 0.8rem;
    letter-spacing: 5%;
    flex-grow: 1;
  }

  &__icons {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__icon {
    display: inline-flex;
  }

  &__statuses {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__status-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  &__status-text {
    font-family: "Open Sans", sans-serif;
    font-size: 0.5rem;
    letter-spacing: 0;
  }

  &__status-icon {
    width: 1rem;
    display: inline-flex;
  }

  &__content {
    max-height: 100%;
    display: flex;
    align-items: center;
    padding: 0 4rem;
    flex-grow: 1;
    width: 100%;
    background: radial-gradient(
      ellipse 100% 100% at center,
      rgba(#1f1f1f, 1) 0%,
      rgba(#000000, 1) 100%
    );
  }
}
</style>
