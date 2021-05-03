<template>
  <input class="text_field" v-model="localValue" />
</template>

<script>
export default {
  props: {
    value: String
  },

  data() {
    return {
      localValue: ""
    };
  },
  created() {
    this.localValue = this.value;
    this.$watch("localValue", value => {
      this.$emit("input", value);
    });
  }
};
</script>

<style lang="postcss" scoped>
.text_field {
  @apply hover:border-blue-200 bg-gray-200 border-b-2 border-gray-300  focus:bg-white focus:bg-white outline-none focus:border-blue-400 block w-full pl-2 pt-1 pb-1;
}
</style>
