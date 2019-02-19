<template>
    <div class = "big-board">
      <div class = "main-board">

        <div class = "grid-container">

          <div class = "grid-header">
            Statistical Results
          </div>

          <div class = "grid-sub-header">
            <div class = "wrapper">
                <button class="btn-home" v-on:click="gotoHome()">Go to Home</button>
                <button class="btn-search" v-on:click="gotoSearch()">Go to Search</button>
                <button class="btn-show" v-on:click="bringResults()">Analyze</button>
                <VueLoadingButton
                  aria-label="Analyze Review"
                  class="button"
                  id="btn-loading"
                  @click.native="bringResults"
                  :loading="isLoading"
                  >Analyze</VueLoadingButton
                >

            </div>
          </div>

          <div class = "grid-number" v-if="summaryResult.length!=0">
            <span class="title">Total review number:</span>
            <span class="content">{{ summaryResult.totalreviews }}</span>
          </div>

          <div class = "grid-sentiment" v-if="summaryResult.length!=0">
            <div class="title">Sentiment</div>
            <table class="table-results">
              <tr>
                <td>Positive</td>
                <td class = "content">{{ ratio_sentiment('positive') }}%</td>
              </tr>
              <tr>
                <td>Neutral</td>
                <td class = "content">{{ ratio_sentiment('neutral') }}%</td>
              </tr>
              <tr>
                <td>Negative</td>
                <td class = "content">{{ ratio_sentiment('negative') }}%</td>
              </tr>
            </table>
          </div>

          <div  class = "grid-emotion" v-if="summaryResult.length!=0">
            <div class="title">Emotion</div>
            <table class="table-results">
              <tr>
                <td>Happy</td>
                <td class = "content">{{ ratio_emotion('happy') }}%</td>
              </tr>
              <tr>
                <td>Excited</td>
                <td class = "content">{{ ratio_emotion('excited') }}%</td>
              </tr>
              <tr>
                <td>Bored</td>
                <td class = "content">{{ ratio_emotion('bored') }}%</td>
              </tr>
              <tr>
                <td>Afraid</td>
                <td class = "content">{{ratio_emotion('afraid') }}%</td>
              </tr>
              <tr>
                <td>Sad</td>
                <td class = "content">{{ ratio_emotion('sad') }}%</td>
              </tr>
              <tr>
                <td>Angry</td>
                <td class = "content">{{ ratio_emotion('angry') }}%</td>
              </tr>
              <tr>
                <td>Disgust</td>
                <td class = "content">{{ ratio_emotion('disgust') }}%</td>
              </tr>
            </table>
          </div>

          <div class = "grid-intent" v-if="summaryResult.length!=0">
            <div class="title">Intent</div>
            <table class="table-results">
              <tr>
                <td>Compliment</td>
                <td class = "content">{{ ratio_intent('compliment') }}%</td>
              </tr>
              <tr>
                <td>Suggestion</td>
                <td class = "content">{{ ratio_intent('suggestion') }}%</td>
              </tr>
              <tr>
                <td>Question</td>
                <td class = "content">{{ ratio_intent('question') }}%</td>
              </tr>
              <tr>
                <td>Spam</td>
                <td class = "content">{{ ratio_intent('spam') }}%</td>
              </tr>
            </table>
          </div>
        </div>

        <div id="title-wrapper" class = "grid-key" v-if="summaryResult.length!=0">
          <div class="title"><center>Keyword Frequency Ranking</center></div>
          <div v-for = "word in summaryResult.keywordCloud" style="text-align:center">
            {{word}}
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import VueLoadingButton from 'vue-loading-button';

export default{
  name: 'app',
  data() {
    return {
      summaryResult: [], //get summary result from backend
      isLoading: false,
    }
  },

  methods: {
    gotoSearch(){
      // go to search Page
      window.location.pathname = '/search'
    },

    bringResults(){
      this.axios.post('http://localhost:3000/summary')
      .then( (res) => {
        this.axios.post('http://localhost:3000/summary/getresult')
        .then((resultRes) => {
          this.summaryResult = resultRes.data
          this.isLoading = true
          setTimeout( ()=> (this.isLoading = false), 1000)
        })
      })
    },

    gotoHome() {
      window.location.pathname = '/dashboard'
    },

    ratio_sentiment: function(sent) {
      return (Math.floor(this.summaryResult.sentiment[sent]*100))
    },

    ratio_emotion: function(emo) {
      return (Math.floor(this.summaryResult.emotion[emo]*100))
    },

    ratio_intent: function(inte) {
      return (Math.floor(this.summaryResult.intent[inte]*100))
    },
  },

  components: {
    VueLoadingButton
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
    border-bottom-style: outset;
    border-bottom-color: white;
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
    height: 780px;
    padding: 20px;
  }

  .btn-search, .btn-home, .btn-show, #btn-loading{
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

  .btn-show{
    background-color: green;
  }

  #btn-loading{
    background-color: green;
    padding: 0px;
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
    font-size: 20px;
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
    margin-left: 10px;
  }

  .title{
    margin-bottom: 10px;
  }

  .link-home{
    font-size: 15px;
  }

  #title-wrapper{
    margin-top: 10px;
  }
</style>
