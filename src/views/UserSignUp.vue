<template>
  <div class="signup">
    <div class="container">
      <div class="logo">
        <img src="https://media.cakeresume.com/image/upload/s--S9Jdcf0R--/c_pad,fl_png8,h_400,w_400/v1548316744/ribjsyna9cm9tm4pkv63.png">
      </div>
      <div class="title">建立你的帳號</div>
      <form @submit.stop.prevent="handleSubmit">
        <div class="form-label-group mb-2">
          <!-- <label for="account">帳號</label> -->
          <input
            id="account"
            name="account"
            v-model="account"
            type="text"
            class="form-control"
            placeholder="account"
            autocomplete="accountname"
            required
          >
        </div>

        <div class="form-label-group mb-2">
          <!-- <label for="name">名稱</label> -->
          <input
            id="name"
            name="name"
            v-model="name"
            type="text"
            class="form-control"
            placeholder="name"
            autocomplete="name"
            required
            
          >
        </div>

        <div class="form-label-group mb-2">
          <!-- <label for="email">Email</label> -->
          <input
            id="email"
            name="email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="email"
            autocomplete="email"
            required
          >
        </div>

        <div class="form-label-group mb-3">
          <!-- <label for="password">密碼</label> -->
          <input
            id="password"
            name="password"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Password"
            autocomplete="password"
            required
          >
        </div>

        <div class="form-label-group mb-3">
          <!-- <label for="password-check">密碼確認</label> -->
          <input
            id="Checkpassword"
            name="Checkpassword"
            v-model="Checkpassword"
            type="password"
            class="form-control"
            placeholder="Password Check"
            autocomplete="password"
            required
          >
        </div>
      
        <div class="link">
          <button type="submit" class="signup-button" :disabled="user.isProcessing" >{{ user.isProcessing ? "處理中..." : "註冊" }}</button> 
          <span class="signin-button"  @click="$router.push('/signin')">取消</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import authorizationAPI from '@/apis/authorization'
import { Toast } from '@/utils/helpers' 
export default {
  name: 'UserSignUp',
  data() {
    return {
      user: {
        account: '',
        name: '',
        email: '',
        password:'',
        Checkpassword: '', 
        isProcessing: false,
      }
    }
  },
  methods: {
    async handleSubmit () {
      try {
        
        if (!this.user.account || !this.user.name || !this.user.email || !this.user.password || !this.user.Checkpassword) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入必填欄位'
          })
          return
        } else if (this.user.password !== this.user.Checkpassword) {
          Toast.fire({
            icon: 'warning',
            title: '您輸入的密碼不吻合'
          })
          this.user.password = ''
          this.user.Checkpassword = ''
          return
        }
        // const form = e.target
        // const formData = new FormData(form)
        // const {account, name, email, password, Checkpassword} = formData
        // this.Users.push({
        //   // account: this.user.account,
        //   // name: this.user.name,
        //   // email: this.user.email,
        //   // password: this.user.password,
        //   // Checkpassword: this.user.Checkpassword, 
        //   formData
        // })

        // const form = e.target
        // const formData = new FormData(form)
        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ': ' + value)
        // }
        const { data } = await authorizationAPI.signUp.create({
          name: this.user.name,
          email: this.user.email,
          account: this.user.account,
          password: this.user.password,
          passwordCheck: this.user.Checkpassword
        })
        
        console.log('12345')
        if (data.status !== "success") {
          throw new Error(data.message)
        }
        console.log('account signed up sucessfully')
        this.$router.push('/signin')

      } catch (error) { 
        Toast.fire({
          icon: 'error',                    
          title: '系統錯誤，請再試一次'
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
$orange: #f46524;
$deeporange: #F34A16;
$lightgray: #f6f8fa;
$lightblue: #00B7EF;
.signup {
  margin: auto;
  max-width: 540px;
  .container {
    margin-top: 60px;
    height: 100%;
    padding: 0;
    .logo {
      height: 50px;
      
      margin: 0 auto 30px auto;
      img {
        height: 100%;
      }
    }
    .title {
      margin: 0 auto;
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: bold;
      font-size: 23px;
      line-height: 33px;
    }
    .form-label-group {
      // outline: solid;
      width: 540px;
      height: 50px;
      margin: 0px;
      input {
        border-radius: 0;
        border: none;
        border-bottom: 2px solid #919191;
        background: $lightgray;
        margin-top: 20px;
        width: 540px;
        height: 50px;
      }
    }
    .link {
      display: flex;
      flex-direction: column;
      .signup-button {
        width: 540px;
        height: 50px;
        
        background: #FF6600;
        border-radius: 50px;
        color: #ffffff;
        line-height: 50px;
        margin: 30px 0 20px 0;
        
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
      }
      .signin-button {
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        text-decoration-line: underline;
        color: #0099FF;
        width: 540px;
      }
    }
    
    
    
  }
}

</style>
