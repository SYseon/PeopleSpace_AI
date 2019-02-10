<template>
    <div class = "jumbotron">
      <div class = "container">
        <h2><center>Login</center></h2>
        <form>
            <div class = "form-group">
              <label class="name" for="email" >E-Mail Address</label>
            </div>
            <div class = "form-group">
                <input id="email" type="email" v-model="email" required autofocus>
            </div>
            <div class= "form-group">
                <label class="pwd" for="password" >Password</label>
                <div>
                    <input id="password" type="password" v-model="password" required>
                </div>
            </div>
            <br>
            <div class = "form-group">
                <button class="btn-login" type="submit" @click="handleSubmit">
                    Login
                </button>
                <router-link to="/register" class="btn-register">
                    Register
                </router-link>
            </div>
            <br>
        </form>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                email : "",
                password : ""
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('http://localhost:3000/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then(response => {
                        let is_admin = response.data.user.is_admin
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)

                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else {
                                if(is_admin== 1){
                                    this.$router.push('dashboard')
                                }
                                else {
                                    this.$router.push('dashboard')
                                }
                            }
                        }
                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                }
            }
        }
    }
</script>

<style scoped>

  .body{
    margin-top: 0px;
  }

  .jumbotron{
    background-color: #E6E6E6;
  }

  .name, .pwd{
    font-size: 20px;
    color: gray;
  }

  .form-tot{
    border-top-width: 2px;
    border-bottom-width: 2px;
    border-right-width: 0px;
    border-left-width: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .form-control{
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin: 8px 0;
    padding: 12px 20px;
    width: 100%;
  }

  .form-group{
    width: 200px;
    margin-left: auto;
    margin-right: auto;
  }

  .btn-login{
    background-color: #1E90FF; /* Blue */
    border: none;
    color: white;
    padding: 5px 5px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 3px;
  }
</style>
