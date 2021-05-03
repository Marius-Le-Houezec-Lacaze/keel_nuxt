<template>
  <button v-on:click="logout" class="btn-red">Déconnexion</button>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$axios
        .delete("/api/user/")
        .catch(err => console.log(err))
        .then(
          this.$router.push("/login")
        );
    }
  }
};
</script>

<style lang="postcss">
.btn-red {
  @apply my-3 p-1 text-lg font-bold space-y-6 w-40 bg-blue-500 hover:bg-blue-300 text-white cursor-pointer;
}
</style>
