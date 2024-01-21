export default function vueTemplate(typescript, style) {
  return `<template>
</template>
<script ${typescript ? 'lang="ts"' : ""}>
export default {
data() {
  return {}
}
}
</script>
<style ${
    style !== "css" || style !== "none" ? `lang="${style}"` : ""
  }></style>`;
}
