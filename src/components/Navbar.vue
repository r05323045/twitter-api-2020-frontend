<template>
  <div class="nav flex-column">
    <div class="logo">
      <div class="icon logo"></div>
    </div>
    <div class="nav-item-wrapper">
      <div v-if="!isAdmin" class="nav-item" @click="$router.push('/')">
        <div class="icon index"></div>
        首頁
      </div>
      <div v-if="!isAdmin" class="nav-item" @click="$router.push('/user/self')">
        <div class="icon user"></div>
        個人資料
      </div>
      <div v-if="!isAdmin" class="nav-item" @click="$router.push('/setting')">
        <div class="icon cog"></div>
        設定 
      </div>
      <div v-if="!isAdmin" class="nav-item" @click.prevent.stop="afterClickNewTweet"> 
        <button class="btn-tweet">推文</button>
      </div>
      <div v-if="isAdmin" class="nav-item" @click="$router.push('/admin/main')">
        <div class="icon index"></div>
        推文清單
      </div>
      <div v-if="isAdmin" class="nav-item" @click="$router.push('/admin/users')">
        <div class="icon user"></div>
        使用者列表
      </div>
    </div>
    <div class="logout-wrapper">
      <div class="icon logout"></div>
      登出
    </div>
    <ModalForNewTweet v-if="showNewTweetModal" name="ModalForNewTweet" @after-click-cross="afterClickCross">this is a modal</ModalForNewTweet>
  </div>
  
</template>

<script>
import ModalForNewTweet from './../components/ModalForNewTweet'
export default {
  name: 'Navbar',
  components: {
    ModalForNewTweet
  },
  data () {
    return {
      isAdmin: false,
      showNewTweetModal: false
    }
  },
  methods: {
    // clickSignal() {
      // this.$emit("after-click-new-tweet")
      
    // },
    afterClickCross() {
      this.showNewTweetModal = false
    },
    afterClickNewTweet() {
      this.showNewTweetModal = true
      console.log('afterClickNewTweet')
    }
  }, 
}

</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
.nav {
  margin: 0px 40px 0 103px;
  padding-top: 4px;
  max-width: 235px;
  width: 100%;
  height: 100%;
  position: relative;
  .logo {
    height: 50px;
    width: 50px;
    .icon.logo {
      background-color: $orange;
      width: 100%;
      height: 100%;
      mask: url(../assets/icon_logo.svg) no-repeat center;
    }
  }
  .nav-item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 24px;
    width: 100%;
    .nav-item {
      width: 100%;
      display: flex;
      align-items: center;
      height: 60px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: ease-in 0.2s;
      &:hover {
        color: $orange;
        .icon {
          background-color: $orange;
        }
      }
      .icon {
        background-color: #000000;
        width: 100%;
        height: 100%;
        max-height: 24px;
        max-width: 24px;
        margin-right: 20px;
      }
      .icon.index {
        mask: url(../assets/icon_index.svg) no-repeat center;
      }
      .icon.user {
        mask: url(../assets/icon_user.svg) no-repeat center;
      }
      .icon.cog {
        mask: url(../assets/icon_cog.svg) no-repeat center;
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
        &:focus {
          outline: 0;
        }
      }
    }
  }
  .logout-wrapper {
    width: 100%;
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
      .icon.logout {
        background-color: $orange;
      }
    }
    .icon.logout {
      mask: url(../assets/icon_logout.svg) no-repeat center;
      background-color: #000000;
      width: 100%;
      height: 100%;
      max-width: 24px;
      max-height: 24px;
      margin-right: 20px;
    }
  }
}
</style>
