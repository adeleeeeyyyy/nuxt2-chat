<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 space-y-3 bg-white shadow-lg rounded-xl">
        <h1 class="text-2xl font-bold text-center">Register</h1>
        <form @submit.prevent="register">
          <!-- Field: Name -->
          <div class="flex flex-col space-y-1">
            <label for="name" class="text-sm font-medium">Name</label>
            <input
              id="name"
              type="text"
              v-model="name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <!-- Field: Username -->
          <div class="flex flex-col mt-3 space-y-1">
            <label for="username" class="text-sm font-medium">Username</label>
            <input
              id="username"
              type="text"
              v-model="username"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <!-- Field: Email -->
          <div class="flex flex-col mt-3 space-y-1">
            <label for="email" class="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <!-- Field: Password -->
          <div class="flex flex-col mt-3 space-y-1">
            <label for="password" class="text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <!-- Field: Repassword -->
          <div class="flex flex-col mt-3 space-y-1">
            <label for="repassword" class="text-sm font-medium">Confirm Password</label>
            <input
              id="repassword"
              type="password"
              v-model="repassword"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <!-- Field: Phonenumber -->
          <div class="flex flex-col mt-3 space-y-1">
            <label for="phonenumber" class="text-sm font-medium">Phone Number</label>
            <input
              id="phonenumber"
              type="text"
              v-model="phonenumber"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-md"
            :class="{ 'hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300': !busy, 'opacity-50 cursor-not-allowed': busy }"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        username: "",
        email: "",
        password: "",
        repassword: "",
        phonenumber: "",
      };
    },
    methods: {
      async register() {
        try {
          const response = await this.$axios.post("/auth/register", {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
            repassword: this.repassword,
            phonenumber: this.phonenumber,
          });
  
          // Tampilkan pesan sukses atau redirect ke halaman lain
          if (response.data.status === "success") {
            alert("Registration successful!");
            this.$router.push("/auth/login");
          } else {
            alert(response.data.message || "Registration failed");
          }
        } catch (error) {
          console.error("Registration error:", error);
          alert("An error occurred during registration");
        }
      },
    },
  };
  </script>
  