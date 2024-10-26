export const getters = {
    isAuthenticated(state) {
        return !!state.token; // Mengembalikan true jika ada token
    },
};