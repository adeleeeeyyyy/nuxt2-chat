<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-xl">
          <h1 class="text-2xl font-bold text-center">Login</h1>
          <form @submit.prevent="login">
              <div class="flex flex-col space-y-1">
                  <label for="email" class="text-sm font-medium">Email</label>
                  <input id="email" type="email" v-model="email" autocomplete="off"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <span class="text-sm text-red-600" v-if="errors.email">
                      {{ errors.email }}
                  </span>
              </div>

              <div class="flex flex-col mt-3 space-y-1">
                  <label for="password" class="text-sm font-medium">Password</label>
                  <input id="password" type="password" v-model="password"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  <span class="text-sm text-red-600" v-if="errors.password">
                      {{ errors.password }}
                  </span>
              </div>

              <button type="submit"
                  class="w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-md" :class="{
                      'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300': !busy,
                      'opacity-50 cursor-not-allowed': busy
                  }">
                  Login
              </button>
          </form>
      </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    email: '',
    password: '',
    busy: false,
    errors: {}
  };
},
methods: {
  async login() {
    this.busy = true;
    this.errors = {};

    try {
      const response = await this.$axios.post('/auth/login', {
        email: this.email,
        password: this.password
      });

      if (response.data.status === 'success') {
        localStorage.setItem('auth_token', response.data.data.token);
        // this.$store.commit('auth/setToken', token);
        this.$axios.setToken(response.data.data.token, 'Bearer');
        this.$router.push('/dashboard');
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        this.errors = error.response.data.errors;
      } else {
        alert('An error occurred during login');
      }
    } finally {
      this.busy = false;
    }
  }
}
};
</script>
