<template>
  <div>
    <section class="flex flex-col">
      <Modal
        class="z-40"
        v-if="this.isModalVisible"
        @toggleModal="toggle_modal"
      >
        <div class="flex flex-col ">
          <!-- Edit item Modal-->
          <div v-if="this.editModal">
            <form action="" @submit.prevent="save_item_edit">
              <div class="flex justify-between space-x-2">
                <TextField placeholder="Titre" v-model="editItem.title" />
                <TextField placeholder="prix" v-model.number="editItem.price" />
              </div>
              <div>
                <label>
                  Description:
                </label>
                <textarea
                  maxlength="300"
                  class="textarea"
                  v-model="editItem.description"
                  v-autogrow
                ></textarea>
              </div>
              <button type="submit">Sauvegarder</button>
            </form>
          </div>
        </div>
        <!-- New item Modal-->

        <div v-if="!this.editModal">
          <form action="" @submit.prevent="new_item">
            <div class="flex justify-between space-x-2">
              <TextField
                placeholder="Titre"
                class="w-10/12"
                v-model="newItem.title"
              />
              <TextField
                placeholder="prix"
                class="w-2/12"
                v-model.number="newItem.price"
                v-on:keypress="test($event)"
              />
            </div>
            <div>
              <label>
                Description:
              </label>
              <textarea
                maxlength="300"
                class="textarea"
                v-model="newItem.desc"
                v-autogrow
              ></textarea>
            </div>
            <button type="submit">Nouvelle objet</button>
          </form>
        </div>
      </Modal>
      <div class="grid justify-items-center pr-2 pl-2">
        <div
          class="m-2 px-2 lg:max-w-3xl sm:max-w-3xl w-full flex justify-between space-x-4"
        >
          <div
            class="m-2 px-2 lg:max-w-3xl sm:max-w-3xl bg-green-50 border-b-2 border-green-400 w-full"
          >
            <div class="mt-4 flex justify-between">
              <div class="block">
                <p v-if="!edit" class="text-xlg font-bold">{{ post.title }}</p>
                <p class="text-gray-600">
                  {{ localDate }}
                  <span class="">{{ post.margin }} </span>
                </p>
                <TextField v-if="edit" :value="post.title" />
              </div>
              <div class="flex flex-row-reverse mt-0 h-9 ">
                <button class="btn w-8 bg-red-500 hover:bg-red-400 ml-1">
                  <Trash />
                </button>
                <button
                  v-on:click="toggle_edit"
                  class="btn w-8 bg-yellow-400 hover:bg-yellow-300"
                >
                  <Edit />
                </button>
              </div>
            </div>
            <div class="mt-2 break-all">
              <p v-if="!edit">{{ post.description }}</p>
              <TextArea
                v-if="edit"
                :text="post.description"
                v-bind:value="newItem.desc"
              />

              <button v-if="edit">Sauvegarder changement</button>
            </div>
          </div>
        </div>
        <div
          class="m-2 px-2 lg:max-w-3xl sm:max-w-3xl w-full flex justify-between items-center space-x-4"
        >
          <button v-on:click="toggle_modal">
            <span class="text-lg w-full">+</span>Nouveaux objet
          </button>
          <TextField placeholder="Chercher" v-model="search" />
          <DropDown class="z-20">
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
          </DropDown>
        </div>
        <div
          :key="item.id"
          v-for="item in filteredList"
          class="m-2 px-2 lg:max-w-3xl sm:max-w-3xl bg-blue-50 border-b-2 border-blue-400 w-full"
        >
          <div>
            <div class="flex justify-between p-1">
              <p>
                <span class="font-bold">{{ item.title }}</span>
                {{ item.price }}€
              </p>
              <div class="flex flex-row-reverse mt-0 h-9 ">
                <button
                  v-on:click="delete_item(item.id)"
                  class="btn w-8 bg-red-500 hover:bg-red-400 ml-1"
                >
                  <Trash />
                </button>
                <button
                  v-on:click="edit_modal(item.id)"
                  class="btn w-8 bg-yellow-400 hover:bg-yellow-300"
                >
                  <Edit />
                </button>
              </div>
            </div>
          </div>

          {{ item.description }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { TextareaAutogrowDirective } from "vue-textarea-autogrow-directive";

export default {
  directives: {
    autogrow: TextareaAutogrowDirective
  },

  data() {
    return {
      id: this.$route.params.id,
      post: "",
      items: [],
      margin: 0,
      edit: false,
      search: "",
      isModalVisible: false,
      editModal: false,

      newItem: {
        title: "",
        price: null,
        desc: ""
      },

      editItem: {
        id: 0,
        title: "",
        price: Number,
        description: ""
      }
    };
  },

  methods: {
    test(ev) {
      alert(ev);
    },
    new_item() {
      console.log({
        title: this.newItem.title,
        price: this.newItem.price,
        description: this.newItem.desc,
        devi_id: this.id
      });
      try {
        this.$axios
          .$post("/api/devis/" + this.id + "/item", {
            headers: {
              "Content-Type": "application/json"
            },

            body: {
              title: this.newItem.title,
              price: this.newItem.price,
              description: this.newItem.desc,
              devi_id: this.id
            }
          })
          .catch(err => console.log(err))
          .then(response => {
            this.items.push(response.item), (this.post = response.devi);
          });
        this.toggle_modal();
      } catch (e) {
        console.log(e);
      }
    },

    toggle_modal() {
      this.editModal = false;
      this.isModalVisible = !this.isModalVisible;
    },

    toggle_edit() {
      this.edit = !this.edit;
    },

    edit_modal(id) {
      this.isModalVisible = true;
      this.editModal = true;
      this.editItem = this.items.find(item => {
        return item.id === id;
      });
    },

    save_item_edit() {
      this.$axios
        .patch("/api/items/" + this.editItem.id, {
          headers: { "Content-Type": "application/json" },
          body: this.editItem
        })
        .catch(err => {
          console.log(err.code);
        })
        .then(response => {
          console.log(response);
          this.items = this.items.filter(item => {
            return item.title !== response.data.title;
          });
          this.items.push(response.data);
        }),
        this.toggle_modal();
        this.post.margin += 0
    },

    descending() {
      this.items.sort((a, b) => a.price - b.price);
    },

    ascending() {
      this.items.sort((a, b) => b.price - a.price);
    },

    delete_item(id) {
      this.$axios
        .delete("/api/items/" + id)
        .catch(err => console.log(err))
        .then(response => {
          this.post.margin += response.data.price;

          this.items = this.items.filter(item => {
            return item.id !== response.data.id;
          });
        });
    }
  },

  mounted() {
    try {
      this.$axios
        .get("/api/devis/" + this.id, {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          this.post = response.data.devi;
          this.items = response.data.items;
          console.log(this.item);
        });
    } catch (e) {
      console.log(e);
    }
  },

  computed: {
    localDate() {
      return new Date(this.post.date).toLocaleDateString("fr-FR");
    },

    filteredList() {
      return this.items.filter(item => {
        return item.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style lang="postcss">
.btn {
  @apply p-1 text-lg font-bold  text-white cursor-pointer;
}

.textarea {
  @apply outline-none w-full bg-gray-200 resize-none overflow-hidden border-b-2 focus:bg-white focus:border-blue-400 border-gray-200 p-2 hover:border-blue-200;
}
</style>
