<template>
  <div class="nav flex-column">
    <div class="logo">
      <img src="https://media.cakeresume.com/image/upload/s--S9Jdcf0R--/c_pad,fl_png8,h_400,w_400/v1548316744/ribjsyna9cm9tm4pkv63.png">
    </div>
    <div class="nav-item-wrapper">
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
      <div class="nav-item">
        <button class="btn-tweet">推文</button>
      </div>
    </div>
    <div class="logout">
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
$orange: #FF6600;
$deeporange: #F34A16;
$lightgray: #eee;
$lightdark: #919191;
.nav {
  max-width: 378px;
  width: 100%;
  height: 100%;
  border-right: 2px solid $lightgray;
  .logo {
    margin: 4px 0 0 103px;
    height: 50px;
    width: 50px;
    img {
      height: 100%;
    }
  }
  .nav-item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 24px 0 0 111px;
    width: 100%;
    .nav-item {
      width: 100%;
      max-width: 235px;
      display: flex;
      align-items: center;
      height: 60px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: ease-in 0.2s;
      &:hover {
        color: $orange;
      }
      i {
        width: 24px;
        max-height: 24px;
        margin-right: 20px;
      }
      .btn-tweet {
        border: none;
        text-align: center;
        background: $orange;
        height: 45px;
        width: 100%;
        max-width: 210px;
        font-size: 18px;
        line-height: 18px;
        font-weight: 700;
        color: #ffffff;
        border-radius: 100px;
        transition: ease-in 0.2s;
        &:hover {
          box-shadow: 0 0 3px 1px $lightdark;
          background-color: $deeporange;
          color: #ffffff;
        }
      }
    }
  }
  .logout {
    margin-left: 103px;
    width: 100%;
    max-width: 235px;
    height: 60px;
    position: absolute;
    bottom: 0;
    text-align: left;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: ease-in 0.2s;
    &:hover {
      color: $orange;
    }
    i {
      width: 24px;
      max-height: 24px;
      margin-right: 20px;
    }
  }
}
</style>
