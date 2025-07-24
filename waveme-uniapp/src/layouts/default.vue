<template>
  <wd-config-provider :themeVars="themeVars">
    <slot />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {}
</script>