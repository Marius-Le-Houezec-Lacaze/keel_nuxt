<template>
  <section class="flex flex-col">
    <WideModal v-if="this.isModalVisible"         @toggleModal="toggle_modal"
> </WideModal>
    <div class="grid justify-items-center pr-2 pl-2 ">
      <div
        class="m-2 px-2 lg:max-w-3xl sm:max-w-3xl w-full flex justify-between items-center space-x-4 z-10 bg-white"
      >
        <button v-on:click="toggle_modal">
          <span class="text-lg w-full">+</span>Nouveaux devis: {{ test }}
        </button>
        <TextField placeholder="Chercher" v-model="search" />
        <DropDown class="z-40">
          <li
            v-on:click="descending"
            class="bg-gray-50 hover:bg-blue-600 hover:text-white "
          >
            Total: croissant
          </li>
          <li
            v-on:click="ascending"
            class="bg-gray-50 hover:bg-blue-600 hover:text-white "
          >
            Total: decroissant
          </li>
          <li
            v-on:click="descending_margin"
            class="bg-gray-50 hover:bg-blue-600 hover:text-white "
          >
            Marge: croissante
          </li>
          <li
            v-on:click="ascending_margin"
            class="bg-gray-50 hover:bg-blue-600 hover:text-white "
          >
            Marge: decroissante
          </li>
        </DropDown>
      </div>
    </div>
    <div
      :key="post.id"
      v-for="post in filteredList"
      class="grid justify-items-center pr-2 pl-2 z-10"
    >
      <div
        :class="post.margin > 0 ? 'positive' : 'negative'"
        class="max-h-60 overflow-hidden z-30 "
      >
        <div class="flex justify-between break-all z-10 overflow-hidden  ">
          <div>
            <p class="ml-4 mt-4 text-xl text-bold flex justify-between ">
              {{ post.title
              }}<span class="text-gray-800">{{ post.price }}€</span>
            </p>
            <div class="flex flex-nowrap h-20 ">
              <p class="ml-4  mt-4 text-m text-gray-600 ">
                {{ post.description }}
              </p>
            </div>
          </div>
          <div class="pt-4">
            <Bar :set="[[post.price], [post.margin]]" :title="post.margin" />
          </div>
        </div>
        <div
          :class="post.margin > 0 ? 'bg-green-50' : 'bg-red-50'"
          class="flex justify-center z-10 h-10 fadeout pb-2 hover:underline hover:text-gray-900 text-gray-800"
        >
          <NuxtLink
            :to="/devi/ + post.id"
            class=" absolute mb-3 z-40 flex self-center"
            >Afficher plus
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ["is_auth"],
  data() {
    return {
      posts: [],
      isModalVisible: false,
      search: ``
    };
  },

  methods: {
    toggle_modal() {
      this.isModalVisible = !this.isModalVisible;
    },

    descending() {
      this.posts.sort((a, b) => a.price - b.price);
    },

    ascending() {
      this.posts.sort((a, b) => b.price - a.price);
    },

    descending_margin() {
      this.posts.sort((a, b) => a.margin - b.margin);
    },

    ascending_margin() {
      this.posts.sort((a, b) => b.margin - a.margin);
    }
  },

  mounted() {
    this.$axios
      .get("/api/devis", {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => (this.posts = response.data));
  },

  computed: {
    test() {
      return this.$store.state.is_logged;
    },

    localDate(post) {
      return Date(post.date).toLocaleDateString("fr-FR");
    },

    filteredList() {
      return this.posts.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style lang="postcss">
.positive {
  @apply m-2 pop-in px-2 lg:max-w-3xl sm:max-w-3xl bg-green-50 border-b-2 border-green-400 w-full;
}

.negative {
  @apply m-2 pop-in px-2 lg:max-w-3xl sm:max-w-3xl bg-red-50 border-b-2 border-red-400 w-full;
}

@-webkit-keyframes pop-in {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.5);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1);
  }
}
@-moz-keyframes pop-in {
  0% {
    opacity: 0;
    -moz-transform: scale(0.5);
  }
  100% {
    opacity: 1;
    -moz-transform: scale(1);
  }
}
@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.pop-in {
  -webkit-animation: pop-in 0.5s;
  -moz-animation: pop-in 0.5s;
  -ms-animation: pop-in 0.5s;
}

.fadeout {
  background-image: url("https://css-tricks.com/examples/FadeOutBottom/bottom-fade.png");
}
</style>
