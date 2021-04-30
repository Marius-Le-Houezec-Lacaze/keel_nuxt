<template>
  <div>
    <Nav />
    <Nuxt />
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
  </div>
</template>


<script>
export default {
  date() {
    return {
      message: '',
    };
  },
  mounted() {
    try {
      this.$axios
        .get("/api/user", { headers: { "Content-Type": "application/json" } })
        .then((response) => {
          if (response.status === 200) {
            this.$nuxt.$emit("auth", true);
          }
        })
        .catch((e) => {
          this.message = "Veuiller vous authentifier";
          this.$nuxt.$emit("auth", false);
        });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>