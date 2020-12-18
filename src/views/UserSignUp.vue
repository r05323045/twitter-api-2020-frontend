<template>
  <div class="signin">
    <div class="container">
      <div class="logo">
        <img src="https://media.cakeresume.com/image/upload/s--S9Jdcf0R--/c_pad,fl_png8,h_400,w_400/v1548316744/ribjsyna9cm9tm4pkv63.png">
      </div>
      <div class="title">建立你的帳號</div>
      <form>
        <div class="form-label-group mb-2">
          <!-- <label for="account">帳號</label> -->
          <input
            id="account"
            name="account"
            type="text"
            class="form-control"
            placeholder="name"
            autocomplete="accountname"
            required
            autofocus
          >
        </div>

        <div class="form-label-group mb-2">
          <!-- <label for="name">名稱</label> -->
          <input
            id="name"
            name="name"
            type="text"
            class="form-control"
            placeholder="name"
            autocomplete="username"
            required
            
          >
        </div>

        <div class="form-label-group mb-2">
          <!-- <label for="email">Email</label> -->
          <input
            id="email"
            name="email"
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
            type="password"
            class="form-control"
            placeholder="Password"
            autocomplete="new-password"
            required
          >
        </div>

        <div class="form-label-group mb-3">
          <!-- <label for="password-check">密碼確認</label> -->
          <input
            id="password-check"
            name="passwordCheck"
            type="password"
            class="form-control"
            placeholder="Password"
            autocomplete="new-password"
            required
          >
        </div>
      
        <div  class="link">
          <span class="signup-button" @click="$router.push('/signin')">註冊</span> 
          <span class="signin-button"  @click="$router.push('/signin')">取消</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  created () {
    this.$nextTick(() => {
      this.$refs.account.focus()
    })
  }
}
</script>

<style lang="scss">
$orange: #f46524;
$deeporange: #F34A16;
$lightgray: #f6f8fa;
$lightblue: #00B7EF;
.signin {
  margin: auto;
  max-width: 540px;
  .container {
    margin-top: 60px;
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
