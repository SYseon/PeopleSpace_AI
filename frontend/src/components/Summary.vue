<template>
    <div class = "big-board">
      <h2><center>Hello, This is Summary Page</center></h2>
      <button @click = "fetchPosts">Bring me</button>
      <div v-for="post in posts">
        <h3>{{post.title}}</h3>
        <p>{{post.body}}</p>
      </div>

    </div>
</template>

<script>

export default{
  name: 'app',
  data() {
    return {
      posts: []
    }
  },

  methods: {
    fetchPosts(){
      this.axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response)=> {
          this.posts = response.data
        })
    }
  }

}


</script>
