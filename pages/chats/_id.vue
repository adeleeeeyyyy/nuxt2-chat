<template>
  <div>
      <header v-if="user" class="bg-white shadow">
          <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <h1 class="text-2xl font-bold">{{ user.name }}</h1>
          </div>
      </header>

      <div class="flex flex-col items-center py-5">
          <div class="container w-full h-full p-8 space-y-3 bg-white rounded-xl">
              <!-- Chat Messages -->
              <div v-if="currentUser">
                  <div class="flex flex-col justify-end h-80">
                      <div ref="messagesContainer" class="p-4 overflow-y-auto max-h-fit">
                          <div v-for="message in messages" :key="message.id" class="flex items-center mb-2">
                              <div v-if="message.sender_id === currentUser.id"
                                  class="p-2 ml-auto text-white bg-blue-500 rounded-lg">
                                  {{ message.text }}
                              </div>
                              <div v-else class="p-2 mr-auto bg-gray-200 rounded-lg">
                                  {{ message.text }}
                              </div>
                          </div>
                      </div>
                  </div>

                  <div class="flex-shrink-0">
                      <span v-if="user && isUserTyping" class="text-gray-500">
                          {{ user.name }} sedang mengetik...
                      </span>
                      <div class="flex items-center justify-between w-full p-4 border-t border-gray-200">
                          <input type="text" v-model="newMessage" @keydown="sendTypingEvent"
                              @keyup.enter="sendMessage"
                              class="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Ketik pesan..." />
                          <button @click.prevent="sendMessage"
                              class="inline-flex items-center justify-center w-12 h-12 ml-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                          </button>
                      </div>
                  </div>
              </div>
              <!-- /Chat Messages -->
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          currentUser: null,
          user: null,
          messages: [],
          newMessage: "",
          isUserTyping: false,
          typingTimeout: null,
      };
  },
  async asyncData({ params, $axios, store }) {
      const userID = params.id;
      const token = store.state.auth.token; // Ambil token dari store atau state
      console.log(token);
      console.log(userID);
      // Ambil data user
      const { data: user } = await $axios.get(`/universal/users/${userID}`);
      const { data: messages } = await $axios.get(`/user/chat/messages/${token}/${userID}`);

      return {
          user,
          messages,
      };
  },
  methods: {
      async sendMessage() {
          if (!this.newMessage.trim()) {
              return;
          }

          const response = await this.$axios.post(`/user/chat/messages/${this.user.id}`, {
              message: this.newMessage,
          });

          this.messages.push(response.data.message);
          this.newMessage = "";
      },
      sendTypingEvent() {
          if (this.typingTimeout) {
              clearTimeout(this.typingTimeout);
          }

          this.isUserTyping = true;

          this.typingTimeout = setTimeout(() => {
              this.isUserTyping = false;
          }, 1000);
      },
  },
  mounted() {
      // Logika untuk menyambung dengan WebSocket atau Echo di sini
  },
};
</script>

<style scoped>
/* Tambahkan gaya tambahan di sini jika perlu */
</style>
