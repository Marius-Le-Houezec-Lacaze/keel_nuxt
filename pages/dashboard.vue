<template>
<div>
    <Modal />
        <h1>Am i logged in ?</h1>
    <ul>
        <li v-for="post in posts" :key="post.id">
            {{ post.title }}
        </li>
    </ul>
</div>
</template>

<script>
export default {

    data () {
        return {
            posts: null,
        }
    },

    mounted(){
         this.$axios.get('/api/devis',{
                headers: { "Content-Type": "application/json" }
           }).then(response => this.posts = response.data)
    
    }
}
</script>
