<template>
  <section class="flex flex-col">
    <div v-if="isModalVisible">
      <Modal class="first:flex first:items-center" @toggleModal="toggle">
        <AlertCircle color="red" />
        <div class="flex justify-between w-full items-center text-red-300">
          <p>Mot de passe ou email incorrect</p>
          <button class="text-lg hover:underline" v-on:click="toggle" toggle="toggle">✖</button>
        </div>
      </Modal>
    </div>
    <div class="flex flex-1 items-center justify-center" v-if="!auth">
      <div
        class="m-2 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center"
      >
        <form class="text-center" @submit.prevent="login">
          <h1
            class="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600"
          >
            Se connecter
          </h1>
          <div class="py-2 text-left"></div>
          <div class="py-2 text-left">
            <TextField
              :class="{ error: error }"
              v-model="mail"
              placeholder="Email"
              required
            />
          </div>
          <div class="py-2 text-left">
            <TextField
              :class="{ error: error }"
              v-model="password"
              placeholder="Mot de passe"
              type="password"
              required
            />
          </div>
          <div class="py-2">
            <button class="btn" type="submit">Login</button>
          </div>
        </form>
        <div class="text-center">
          <a href="#" class="hover:underline">Mot de passe oublier ?</a><br />
          <a
            href="#"
            class="font-light text-md text-blue-400 underline font-semibold hover:text-gray-400"
            >Se creer un compte
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      mail: "",
      password: "",
      error: null,
      isModalVisible: false,
      auth: false
    };
  },

  beforeMount(){
    this.$nuxt.$on('auth', auth =>  {
      if(auth){
        this.auth = true
        this.$router.push('/')
      }
    })
  },

  methods: {
    toggle() {
      this.isModalVisible = !this.isModalVisible;
    },

    login() {
      try {
        this.$axios
          .post("/api/login", {
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              mail: this.mail,
              password: this.password,
            },
            credentials: "include",
          })
          .then((response) => {
            if (response.status === 200) {
              this.$router.push("/");
            }
          })
          .catch((error) => {
            this.error = true;
            this.isModalVisible = true;
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="postcss" scope>
.btn {
  @apply my-3 p-1 text-lg font-bold space-y-6 w-40 bg-blue-500 hover:bg-blue-300 text-white cursor-pointer block w-full;
}

.error {
  @apply bg-red-200 border-red-400 !important;
}
</style>