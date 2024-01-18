export default function vueTemplate(ts, lang) {
  return `<template>
</template>
<script ${ts ? 'lang="ts"' : ""}>
export default {
data() {
  return {}
}
}
</script>
<style ${lang !== "css" ? `lang="${lang}"` : ""}></style>`;
}
