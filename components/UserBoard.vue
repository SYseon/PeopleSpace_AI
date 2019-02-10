<template>
  <div class = "container-home">
    <div class="bg-image"></div>

    <div class="main-board">
      <center>You're logged in Review4You</center><br><br>

      <div class = "cell">
        <label class="bglabel-file"><span class="label-file"></span>
          <input type = "file" id="file" ref="file" v-on:change="handlerFileUpload()"/>
        </label>
        <button class="btn-submit" v-on:click="submitFile()">Submit</button>
        <button class="btn-start" v-on:click="gotoSearch()">Start</button>
      </div>

      <br><br>

      <p>
        <button class="md-accent" v-on:click="logout()">Logout</button>
      </p>

    </div>
  </div>
</template>

<script>
    export default {

      data(){
        return{
          file: ''
        }
      },

      methods: {
        /* submit file to the server */
        submitFile(){
          if(document.getElementById("file").value == ""){
            /* if not file uploaded */
            alert("WARNING: Choose File to upload!");
          }
          else{
            let formData = new FormData();

            /* add the form data we need to submit */
            formData.append('file',this.file);

            /* make the request to the POST , single-file URL */
            axios.post('/single-file', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(function(){
              console.log('File submitted');
            }).catch(function(){
              console.log('File submit Failed');
            });

            alert("File Submitted!");

          }
        },

        /* handles a change on the file upload */
        handleFileUpload(){
          /* set a local variable to the value of the uploaded file */
          this.file = this.$refs.file.files[0];
        },

        /* handles exception when file not uploaded */
        gotoSearch(){
          if(document.getElementById("file").value == ""){
            /* if not file uploaded */
            alert("WARNING: file not uploaded!");
          }
          else{
            /* go to SearchPage */
            window.location.pathname = '/summary'
          }
        },

        logout(){
          if(confirm('Do you want to Logout?')){
            this.$http.post('http://localhost:3000/auth/logout')
          } else{
          }
        },
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#file{
  border-style: solid;
  color: white;
}

.text-danger{
  color: skyblue;
  text-decoration: underline;
}

.h-name{
  margin: 0px;
}
.btn-submit{
  background-color: #008CBA; /* Blue */
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
}

.btn-start{
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 5px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
}

#file::-webkit-file-upload-button {
  visibility: hidden;
}

#file::before{
  content: 'File';
  display: inline-block;
  background-color: #28A745; /* Green */
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 18px;
  outline: none;

}

.label-file{
  color: white;
  font-weight: bold;
}

.bglabel-file{
  color: green;
}

.md-accent{
  color: red;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;

  background-color: white;
  border: none;
  color: red;
  padding: 4px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
}

.md-accent:hover{
  background-color: #f44336;
  color:white;
  padding: 5px 14px;
  border-radius: 3px;
}

.bg-image{
  background-image: url("https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60");

  /* add the blur effect */
  filter: blur(8px);
  -webkit-filter: blur(8px);

  height: 550px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
  height: 50%;
  padding: 20px;
  text-align: center;
}
</style>
