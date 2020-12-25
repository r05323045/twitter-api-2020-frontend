<template>
  <div class="signup">
    <div class="sign-up-container">
      <div class="logo">
        <img src="https://media.cakeresume.com/image/upload/s--S9Jdcf0R--/c_pad,fl_png8,h_400,w_400/v1548316744/ribjsyna9cm9tm4pkv63.png">
      </div>
      <div class="title">建立你的帳號</div>
      <form>
        <div class="form-label-group mb-2">
          <label for="account">帳號</label>
          <input
            id="account"
            name="account"
            v-model="user.account"
            type="text"
            class="form-control"
            autocomplete="accountname"
            required
          >
        </div>

        <div class="form-label-group mb-2">
          <label for="name">名稱</label>
          <input
            id="name"
            name="name"
            v-model="user.name"
            type="text"
            class="form-control"
            autocomplete="name"
            required
            
          >
        </div>

        <div class="form-label-group mb-2">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            v-model="user.email"
            type="email"
            class="form-control"
            autocomplete="email"
            required
          >
        </div>

        <div class="form-label-group mb-3">
          <label for="password">密碼</label>
          <input
            id="password"
            name="password"
            v-model="user.password"
            type="password"
            class="form-control"
            autocomplete="password"
            required
          >
        </div>

        <div class="form-label-group mb-3">
          <label for="password-check">密碼確認</label>
          <input
            id="Checkpassword"
            name="Checkpassword"
            v-model="user.Checkpassword"
            type="password"
            class="form-control"
            autocomplete="password"
            required
          >
        </div>
      
        <div class="link">
          <div @click="handleSubmit" class="signup-button" >{{ user.isProcessing ? "處理中..." : "註冊" }}</div> 
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
        Checkpassword: ''
      }
    }
  },
  methods: {
    async handleSubmit () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      try {
        
        if (!this.user.account || !this.user.name || !this.user.email || !this.user.password || !this.user.Checkpassword) {
          loader.hide()
          Toast.fire({
            icon: 'warning',
            title: '請輸入必填欄位'
          })
          return
        } else if (this.user.password !== this.user.Checkpassword) {
          loader.hide()
          Toast.fire({
            icon: 'warning',
            title: '您輸入的密碼不吻合'
          })
          this.user.password = ''
          this.user.Checkpassword = ''
          return
        }
        const { data } = await authorizationAPI.signUp({ account: this.user.account, name: this.user.name, email: this.user.email, password: this.user.password, checkPassword: this.user.Checkpassword})
        
        if (data.status !== "success") {
          loader.hide()
          throw new Error(data.message)
        }
        loader.hide()
        Toast.fire({
          icon: 'success',                    
          title: '註冊成功'
        })

        this.$router.push('/signin')
      } catch (error) { 
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',                    
          title: error
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightgray: #F5F8FA;
$lightblue: #0099FF;
$lightdark: #657786;
$bitdark: #657786;
.signup {
  margin: auto;
  max-width: 540px;
  .sign-up-container {
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
      position: relative;
      label {
        position: absolute;
        left: 10px;
        top: 5px;
        height: 15px;
        font-weight: 500;
        font-size: 15px;
        line-height: 15px;
        color: $bitdark;
      }
      input {
        padding: 20px 0 0 12px;
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
        cursor: pointer;
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
        transition: ease-in 0.2s;
        &:hover {
          background-color: $deeporange;
          box-shadow: 0 0 3px 1px $lightdark;
        }
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
        cursor: pointer;
      }
    }
    
    
    
  }
}

</style>
