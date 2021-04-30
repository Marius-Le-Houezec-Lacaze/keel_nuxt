<template>
  <section class="flex flex-col">
    <div class="grid justify-items-center pr-2 pl-2">
      <div class="m-2 px-2 lg:max-w-3xl sm:max-w-3xl w-full">
        <DropDown />
      </div>
    </div>
    <div
      :key="post.id"
      v-for="post in posts"
      class="grid justify-items-center pr-2 pl-2"
    >
      <div
        class="m-2 px-2 lg:max-w-3xl sm:max-w-3xl bg-green-50 border-b-2 border-green-400 w-full"
      >
        test
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      posts: null,
      isModalVisible: false,
    };
  },

  methods: {
    toggle() {
      this.isModalVisible = !this.isModalVisible;
    },
  },

  mounted() {
    this.$nuxt.$on("auth", (auth) => {
      if (auth) {
        this.$axios
          .get("/api/devis", {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => (this.posts = response.data));
      } else {
        this.$router.push("/login");
      }
    });
  },
};
</script>
