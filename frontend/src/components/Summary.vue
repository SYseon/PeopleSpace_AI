<template>
    <div class = "big-board">
      <h2><center>Hello, This is Summary Page</center></h2>
      <button @click = "fetchPosts">Bring me</button>
      <div v-for="post in posts">
        <h3>{{post.title}}</h3>
        <p>{{post.body}}</p>
      </div>
      <button @click = "posttest">Post Test</button>                    <!---------------- add --------------------->
      <div>Total review number: {{summaryResult.totalreviews}}</div>    <!---------------- add --------------------->
      <div>Sentiment result: {{summaryResult.sentiment}}</div>          <!---------------- add --------------------->
      <div>Emotion result: {{summaryResult.emotion}}</div>              <!---------------- add --------------------->
      <div>Intent result: {{summaryResult.intent}}</div>                <!---------------- add --------------------->
      <div>Keyword Cloud: {{summaryResult.keywordCloud}}</div>          <!---------------- add --------------------->

      <button v-on:click="gotoSearch()">Start</button>                   <!---------------- add --------------------->

    </div>
</template>

<script>
export default{
  name: 'app',
  data() {
    return {
      posts: [],
      summaryResult: ''   ///////////// get summary result data from backend
    }
  },
  methods: {
    fetchPosts(){
      this.axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response)=> {
          console.log(response)
          this.posts = response.data
        })
    },
    posttest(){                                         /////////////////////////////////
      this.axios.post('http://localhost:3000/summary')
      .then( (res) => {
        this.summaryResult= res.data
        console.log(res)
        console.log(this.summaryResult.keywordCloud[0]) ///////// the most frequent keyword
      })
    },
    gotoSearch(){     /////////////////////////////////
      /* go to SearchPage */
      window.location.pathname = '/search'
    }
  }
}
</script>