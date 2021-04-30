<template>
<div>
    <h1>hey !{{ id }}</h1>
    <p>{{ post.title }}</p>
    <p>{{ post.description }}</p>
    <p>{{ post.price }}</p>
</div>
</template>

<script>
export default{
        data(){
            return{
                id: this.$route.params.id,
                post: ''
            }
        },

        mounted(){
            try{
                this.$axios.get("/api/devis/" + this.id, {
                    headers: { "Content-Type": "application/json" }
                    }).then(response => this.post = response.data)

            } catch(e){
                console.log(e)
            }
        }
}
</script>
