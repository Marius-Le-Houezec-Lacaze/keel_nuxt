<template>
    <form  method="post" @submit.prevent="login">
        <input type="text" v-model="mail">
        <input type="text"  v-model="password">
        <button type="submit" > Lgin </button>
    </form>
</template>

<script>
export default {
	name: "login",
	data() {
		return {
			mail: '',
			password: ''
		}
	},

	methods: {
		login() {
			try {
				this.$axios.post('/api/login', {
					headers: {
						"Content-Type": "application/json"
					},
					body: {
						mail: this.mail,
						password: this.password
					},
					credentials: 'include'
				}).then(response => console.log(response.data))
				this.$router.push('/')
			} catch (e) {
				console.log(e)
			}
		}
	}

}
</script>

<style>

</style>