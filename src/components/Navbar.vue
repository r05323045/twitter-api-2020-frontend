<template>
  <div class="nav flex-column">
    <div class="logo">
      <img src="https://media.cakeresume.com/image/upload/s--S9Jdcf0R--/c_pad,fl_png8,h_400,w_400/v1548316744/ribjsyna9cm9tm4pkv63.png">
    </div>
    <div class="nav-item" @click="$router.push('/')">
      <i class="fas fa-home"></i>
      首頁
    </div>
    <div class="nav-item" @click="$router.push('/profile')">
      <i class="far fa-user"></i>
      個人資料
    </div>
    <div class="nav-item" @click="$router.push('/setting')">
      <i class="fas fa-cog"></i>
      設定
    </div>
    <button class="btn btn-tweet">推文</button>
    <div class="nav-item logout">
      <i class="fas fa-sign-out-alt fa-rotate-180"></i>
      登出
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar'
}

</script>

<style lang="scss">
$orange: #f46524;
$deeporange: #F34A16;
$lightgray: #eee;
.nav {
  height: 100%;
  align-items: flex-start;
  padding: 0 30px 30px 100px;
  border-right: 2px solid $lightgray;
  .logo {
    height: 30px;
    margin-bottom: 50px;
    img {
      height: 100%;
    }
  }
  .nav-item {
    font-size: 14px;
    font-weight: 700;
    margin: 15px 0;
    cursor: pointer;
    transition: ease-in 0.2s;
    &:hover {
      color: $orange;
    }
    i {
      margin-right: 20px;
    }
  }
  .logout {
    margin-top: auto;
  }
  .btn-tweet {
    background: $orange;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    width: 80%;
    border-radius: 30px;
    transition: ease-in 0.2s;
    &:hover {
      background-color: $deeporange;
    }
  }
}
</style>
