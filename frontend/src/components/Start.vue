<template>
  <div class="container-start">
    <div class="main-txt">
      <h2>Review4You</h2>
      <div>
        <div class="sub-txt">
          If you have review lists in csv file, we analyze your reviews<br>
          based on 4 aspects: Sentiment, Intent, Emotion, Keyword.<br>
          Please login, and enjoy our premier service.<br>
        </div>
        <p><button class="btn-login" v-on:click="login()">Get Started</button></p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {

      methods: {
        login() {
          window.location.pathname = '/auth/login'
        }
      }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
      box-sizing: border-box;
    }

  .container-start{
    background-image: url("https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60");
    background-repeat: no-repeat;
    height: 550px;
    background-position: center;
    background-size: cover;
  }

  .main-txt{
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.4);
    color: white;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    height: 40%;
    padding: 20px;
    text-align: center;
  }

  .btn-login{
    background-color: #f44336;
    border: none;
    color: white;
    padding: 5px 14px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 3px;

    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
  }

  .btn-login:hover{
    background-color: white;
    color: red;
  }

  .sub-txt{
    font-weight: initial;
  }
</style>
