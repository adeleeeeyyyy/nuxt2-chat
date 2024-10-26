export const state = () => ({
    auth: {
      token: null, // Token bisa diisi dengan nilai default atau di-set saat login
    },
  });
  
  export const mutations = {
    setToken(state, token) {
      state.auth.token = token;
    },
  };
  
  export const actions = {
    // Aksi untuk mengupdate token atau tindakan lain
  };
  