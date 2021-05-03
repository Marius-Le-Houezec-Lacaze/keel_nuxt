<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    @keydown.esc="$emit('toggleModal')"
    class="modal fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        v-on:click="close"

      ></div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white w-full rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-6/12 sm:w-full"
      >
        <div
          class="bg-white p-4 flex justify-items-center items-center"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["toggle"],

  methods: {
    close() {
      this.$emit("toggleModal");
    },

    test(){
      alert("test")
    }
  },
};
</script>

<style>
</style>