<template>
    <div>
        <h2><center>Register</center></h2>
        <form>
          <div class="form-tot">
            <label for="name">Name</label>
            <div>
                <input id="name" type="text" v-model="name" required autofocus>
            </div><br>

            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" required>
            </div><br>

            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div><br>

            <label for="password-confirm">Confirm Password</label>
            <div>
                <input id="password-confirm" type="password" v-model="password_confirmation" required>
            </div><br>

            <div class>
                <button type="submit" @click="handleSubmit" class="btn-register">
                    Register
                </button>
            </div>
          </div>
        </form>
    </div>
</template>

<script>
    export default {
        props : ["nextUrl"],
        data(){
            return {
                name : "",
                email : "",
                password : "",
                password_confirmation : "",
                is_admin : 0
            }
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()

                if (this.password === this.password_confirmation && this.password.length > 0)
                {
                    let url = "http://localhost:3000/auth/register"
                    //if(this.is_admin != null || this.is_admin == 1) url = "http://localhost:3000/register-admin"

                    this.$http.post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_admin: this.is_admin
                    })
                    .then(response => {
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)

                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else{
                                this.$router.push('/auth/login')
                                //window.location.pathname = '/auth/login';

                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                } else {
                    this.password = ""
                    this.passwordConfirm = ""

                    return alert("Passwords do not match")
                }
            }
        }
    }
</script>

<style scoped>

  .form-control{
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin: 8px 0;
    padding: 12px 20px;
    width: 100%;
  }

  .form-tot{
    border-top-width: 2px;
    border-bottom-width: 2px;
    border-right-width: 0px;
    border-left-width: 0px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    background-color: #E3DBDB /* gray */
  }

  .btn-register{
    background-color: #1E90FF; /* blue */
    border: none;
    color: white;
    padding: 3px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 3px;
  }

</style>
