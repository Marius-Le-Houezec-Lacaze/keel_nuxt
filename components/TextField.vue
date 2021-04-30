<template>
  <input class="text_field" v-model="localValue" type="text"/>
</template>

<script>
export default {
  props: {
    value: String // 1. Receives the value as a prop
  },
  data() {
    return {
      localValue: ""
    };
  },
  created() {
    this.localValue = this.value; // 2. Copy the value in a local value variable

    // Set a watcher to emit the changes to the parent component
    this.$watch("localValue", value => {
      this.$emit("input", value);
    });
  }
};
</script>

<style lang="postcss" scoped>

.text_field {
  @apply hover:border-blue-200 bg-gray-200 border-b-2 border-gray-300  focus:bg-white focus:bg-white outline-none focus:border-blue-400 block w-full p-2
  }
</style>