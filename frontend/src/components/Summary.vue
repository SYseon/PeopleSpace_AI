<template>
    <div class = "big-board">
      <div class = "big-img"></div>
      <div class = "main-board" v-if="summaryResult.length != 0">

        <div class = "grid-container">

          <div class = "grid-header">
            Statistical Results
          </div>

          <div class = "grid-sub-header">
            <div class = "wrapper">
                <button class="btn-home" v-on:click="gotoHome()">Go to Home</button>
                <button class="btn-search" v-on:click="gotoSearch()">Go to Search</button>
            </div>
          </div>

          <div class = "grid-number">
            <span class="title">Total review number:</span>
            <span class="content" style="color:black">{{ summaryResult.totalreviews }}</span>
          </div>

          <div class = "grid-sentiment">
            <div class="title">Sentiment</div>
            <table class="table-results">
              <tr>
                <td>Positive</td>
                <td class = "content">{{ ratio_sentiment('positive') }}</td>
              </tr>
              <tr>
                <td>Neutral</td>
                <td class = "content">{{ ratio_sentiment('neutral') }}</td>
              </tr>
              <tr>
                <td>Negative</td>
                <td class = "content">{{ ratio_sentiment('negative') }}</td>
              </tr>
            </table>
          </div>

          <div  class = "grid-emotion">
            <div class="title">Emotion</div>
            <table class="table-results">
              <tr>
                <td>Happy</td>
                <td class = "content">{{ ratio_emotion('happy') }}</td>
              </tr>
              <tr>
                <td>Excited</td>
                <td class = "content">{{ summaryResult.emotion.excited }}</td>
              </tr>
              <tr>
                <td>Bored</td>
                <td class = "content">{{ summaryResult.emotion.bored }}</td>
              </tr>
              <tr>
                <td>Afraid</td>
                <td class = "content">{{ summaryResult.emotion.afraid }}</td>
              </tr>
              <tr>
                <td>Sad</td>
                <td class = "content">{{ summaryResult.emotion.sad }}</td>
              </tr>
              <tr>
                <td>Angry</td>
                <td class = "content">{{ summaryResult.emotion.angry }}</td>
              </tr>
              <tr>
                <td>Disgust</td>
                <td class = "content">{{ summaryResult.emotion.disgust }}</td>
              </tr>
            </table>
          </div>

          <div class = "grid-intent">
            <div class="title">Intent</div>
            <table class="table-results">
              <tr>
                <td>Compliment</td>
                <td class = "content">{{ ratio_intent('compliment') }}</td>
              </tr>
              <tr>
                <td>Suggestion</td>
                <td class = "content">{{ ratio_intent('suggestion') }}</td>
              </tr>
              <tr>
                <td>Question</td>
                <td class = "content">{{ ratio_intent('question') }}</td>
              </tr>
              <tr>
                <td>Spam</td>
                <td class = "content">{{ ratio_intent('spam') }}</td>
              </tr>
            </table>
          </div>

        </div>

        <div class = "wrapper">
          <div class="title"><center>Keyword Frequency Ranking</center></div>
          <div v-for = "word in summaryResult.keywordCloud">
            {{word}}
          </div>
        </div>


      </div>
    </div>
</template>

<script>
export default{
  name: 'app',
  data() {
    return {
      summaryResult: [] //get summary result from backend
    }
  },

  created() {
    this.axios.post('http://localhost:3000/summary')
    .then( (res) => {
      this.summaryResult = res.data

      // const myObjStr = JSON.stringify(res.data)
      // this.summaryResult = JSON.parse(myObjStr)

      console.log(res)
      console.log(this.summaryResult.keywordCloud[0]) // the most frequent keywordCloud
    })
  },

  methods: {
    gotoSearch(){
      // go to search Page

      window.location.pathname = '/search'
    },

    gotoHome(){
      window.location.pathname = '/dashboard'
    },

    ratio_sentiment: function(sent) {
      return ((this.summaryResult.sentiment[sent])/(this.summaryResult.sentiment.positive+this.summaryResult.sentiment.neutral+this.summaryResult.sentiment.negative))
    },

    ratio_emotion: function(emo) {
      return ((this.summaryResult.emotion[emo])/(this.summaryResult.emotion.happy +
        this.summaryResult.emotion.exicted + this.summaryResult.emotion.bored +
        this.summaryResult.emotion.afraid + this.summaryResult.emotion.sad +
        this.summaryResult.emotion.angry + this.summaryResult.emotion.disgust))
    },

    ratio_intent: function(inte) {
      return ((this.summaryResult.intent[inte])/(this.summaryResult.intent.compliment+this.summaryResult.intent.suggestion+this.summaryResult.intent.question+this.summaryResult.intent.spam))
    },
  }


  }
}
</script>

<style scoped>
  .grid-header{
    grid-area: header;
    margin-top: 100px;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 20px;
   }
  .grid-sub-header { grid-area: sub-header; margin-bottom: 15px; }
  .grid-number{ grid-area: grid-1; }
  .grid-sentiment{ grid-area: grid-2; }
  .grid-emotion{ grid-area: grid-3; }
  .grid-intent{ grid-area: grid-4; }

  .grid-container{
    display: grid;
    grid-template-areas:
      'header header header'
      'sub-header sub-header sub-header'
      'grid-1 grid-1 grid-1'
      'grid-2 grid-3 grid-4'
      'grid-2 grid-3 grid-4'
      'grid-2 grid-3 grid-4';
    grid-gap: 10px;
    padding: 10px;
  }

  .big-img{
    background-image: url("https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60");
    background-repeat: no-repeat;
    height: 800px;
    background-position: center;
    background-size: cover;

    /* add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }

  .main-board{
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.4);
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    height: 750px;
    padding: 20px;
  }

  .btn-search, .btn-home{
    background-color: #E42C2C; /* red */
    border: none;
    color: white;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    border-radius: 3px;
  }

  .btn-home{
    background-color: #1E90FF; /* Blue */
  }

  .btn-search:hover {
    background-color: white;
    color: red; /* Red */
  }

  .btn-home:hover{
    background-color: white;
    color: #1E90FF; /* Blue */
  }

  .title{
    text-align: left;
    font-weight: bold;
  }

  .wrapper{
    text-align: center;
  }

  .table-results{
    text-align: left;
    color: white;
    margin-bottom: 10px;
  }

  .content{
    font-weight: bold;
    color: white;
  }

  .title{
    margin-bottom: 10px;
  }

  .link-home{
    font-size: 15px;
  }
</style>

