export default context => {
  context.$axios
    .get("/api/user")
    .then(resp => {
      return true
    });
};
