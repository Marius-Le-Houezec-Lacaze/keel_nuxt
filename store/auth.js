export const state = () => ({
  is_logged: "true",
})


export const mutations = {
  logout(state) {
    state.logout = false
  }
}
