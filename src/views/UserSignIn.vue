<template>
  <div class="signin">
    <div class="container">
      <div class="logo">
        <img src="https://media.cakeresume.com/image/upload/s--S9Jdcf0R--/c_pad,fl_png8,h_400,w_400/v1548316744/ribjsyna9cm9tm4pkv63.png">
      </div>
      <div class="title">登入 Alphitter</div>
      <form>
        <div class="form-group">
          <input type="text" ref="account" class="form-control" placeholder="帳號">
          <input type="text" class="form-control" placeholder="密碼" required>
        </div>
        <button class="btn btn-signin" type="submit">登入</button>
      </form>
      <div  class="link">
        <span @click="$router.push('/signup')">註冊 Alphitter</span> &bull;
        <span @click="$router.push('/admin/signin')">後台登入</span>
      </div>
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
    padding-top: 30%;
    .logo {
      height: 50px;
      margin-bottom: 50px;
      img {
        height: 100%;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 700;
    }
    form {
      margin: 15px 0 30px 0;
      input {
        border-radius: 0;
        border: none;
        border-bottom: 2px solid #919191;
        background: $lightgray;
        margin-top: 15px;
      }
      ::placeholder {
        font-size: 1px;
      }
      .btn-signin {
        background: $orange;
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
        width: 100%;
        border-radius: 30px;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $deeporange;
        }
      }
    }
    .link {
      display: flex;
      justify-content: flex-end;
      font-size: 12px;
      color: $lightblue;
      span {
        margin: 0 2px;
        text-decoration: underline;
        font-weight: 700;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          color: navy;
        }
      }
    }
  }
}

</style>
