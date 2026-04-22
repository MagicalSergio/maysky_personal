<script setup>
import AbstractProjectCard from "../misc/AbstractProjectCard.vue";
import MayskyVPNInterface from "../misc/MayskyVPNInterface.vue";

const DATA = {
  title: "maysky-vpn",
  subtitle: "family VPN for censorship fooling",
  features: ["mimics common http/tls traffic", "fake destination domain", "while enabled, works only for unavailable resources"],
  stack: ["xray", "vless", "xhttp", "reality"],
};
</script>

<template>
  <AbstractProjectCard v-bind="DATA" class="project-maysky-vpn">
    <MayskyVPNInterface />
  </AbstractProjectCard>
</template>

<style lang="scss" scoped>
.project-maysky-vpn {
  //
}
</style>
