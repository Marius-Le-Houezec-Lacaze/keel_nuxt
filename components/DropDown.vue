<template>
  <div class="dropdown text-center ">
    <div v-on:click="toggle" class="bg-blue-600 text-white p-1 w-36 cursor-pointer ">
      Trier part:
    </div>
    <ul v-if="isMenuVisible" class="absolute w-48 cursor-pointer md:-ml-28 lg:ml-0 sm:-ml-28 shadow-inner bg-white">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuVisible: false,
    };
  },
  methods: {
    toggle() {
      this.isMenuVisible = !this.isMenuVisible;
    },
  },
};
</script>

<style>
</style>