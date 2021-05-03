<template>
  <div>
  <textarea spellcheck="false" class="textarea"  v-autogrow />
  </div>
</template>

<script>
import { TextareaAutogrowDirective } from "vue-textarea-autogrow-directive";
export default {
  name: "MyComponent",
  directives: {
    autogrow: TextareaAutogrowDirective
  },

  data(){
    return {
      text: ''
    }
  }
};
</script>

<style lang="postcss">
.textarea {
  @apply outline-none w-full bg-gray-200 resize-none overflow-hidden border-b-2 focus:bg-white border-gray-200 p-2 hover:border-blue-200;
}
</style>
