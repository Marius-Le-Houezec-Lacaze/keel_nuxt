<template>
  <button class="btn " v-on:click="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    click() {
      this.$emit("buttonClick");
    },
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  @apply my-3 p-1 text-lg font-bold space-y-6 w-40 bg-blue-500 hover:bg-blue-300 text-white cursor-pointer;
}
</style>