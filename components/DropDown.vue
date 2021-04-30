<template>
  <div class="dropdown text-center ">
    <div v-on:click="toggle" class="bg-red-100 w-20 cursor-pointer border-t-2 border-l-2 border-r-2">
      Trier part:
    </div>
    <ul v-if="isMenuVisible" class="absolute w-20 bg-white">
      <li>test</li>
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