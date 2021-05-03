<template>
  <nav
    class="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-green-400 shadow sm:items-baseline w-full"
  >
    <div class="mb-2 sm:mb-0">
      <a
        href="/home"
        class="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
        >Keel</a
      >
    </div>
    <div>
      <div v-if="!auth">
        <a
          href="/one"
          class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
          >Creer un compte</a
        >
        <a
          href="/two"
          class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
          >Se connecter</a
        >
      </div>

      <div>
        <Logout v-if="auth"/>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: "Nav",

  data() {
    return { auth: false };
  },

  beforeCreate() {
    this.$nuxt.$on("auth", (auth) => {
      if (auth) {
        this.auth = auth;
      }
    });
  },
};
</script>

<style>
</style>