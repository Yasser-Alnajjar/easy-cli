export default function vueTemplate(typescript, lang) {
  return `<template>
</template>
<script ${typescript ? 'lang="ts"' : ""}>
export default {
data() {
  return {}
}
}
</script>
<style ${lang !== "css" ? `lang="${lang}"` : ""}></style>`;
}
