<template>
  <div class="signin">
    <div class="container">
      <div class="logo">
        <div class="icon logo"></div>
      </div>
      <div class="title">
        <span v-if="!routeIsAdmin">登入 Alphitter</span>
        <span v-if="routeIsAdmin">後台登入</span>
      </div>

      <form @submit.prevent="signin">
        <div class="form-group">
          <label class="account" v-show="!accountFocus && account === ''">帳號</label>
          <input type="text" ref="account" @focus="checkFocus('account')" @blur="checkBlur('account')" v-model="account" class="form-control" required>
          <label class="password" v-show="!passwordFocus && password === ''">密碼</label>
          <input type="password" ref="password" @focus="checkFocus('password')" @blur="checkBlur('password')" v-model="password" class="form-control"  required>
        </div>
        <button :disabled="isProcessing" class="btn btn-signin" type="submit">登入</button>
      </form>
      <div  class="link">
        <span v-if="!routeIsAdmin" @click="$router.push('/signup')">註冊 Alphitter</span>
        <p v-if="!routeIsAdmin">&bull;</p>
        <span v-if="!routeIsAdmin" @click="$router.push('/admin/signin')">後台登入</span>
        <span v-if="routeIsAdmin" @click="$router.push('/signin')">前台登入</span>
      </div>
    </div>
  </div>
</template>

<script>

import authorizationAPI from '@/apis/authorization'
import { Toast } from '@/utils/helpers'

export default {
  data () {
    return {
      accountFocus: false,
      passwordFocus: false,
      account: '',
      password: '',
      routeIsAdmin: this.$route.path === '/admin/signin',
      isProcessing: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.$refs.account.focus()
    })
  },
  methods: {
    checkFocus (params) {
      if (params === 'account') {
        this.accountFocus = true
        this.passwordFocus = false
      } else if (params === 'password') {
        this.accountFocus = false
        this.passwordFocus = true
      }
    },
    checkBlur (params) {
      if (params === 'account') {
        this.accountFocus = false
      } else if (params === 'password') {
        this.passwordFocus = false
      }

    },
    async signin () {
      try {
        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 email 和 password'
          })
          return
        }
        this.isProcessing = true
        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password
        })
        const { data } = response

        if (data.status !== 'success' || (data.user.role !== 'admin' && this.routeIsAdmin)) {
          throw new Error(data.message)
        }

        localStorage.setItem('token', data.token)
        this.$store.commit('setCurrentUser', data.user)

        const redirectRoute = this.routeIsAdmin ? '/admin/main' : '/main'
        
        this.$router.push(redirectRoute)

      } catch(error) {
        this.password = ''
        this.isProcessing = false
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })
      }

    }
  }
}
</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightgray: #F5F8FA;
$lightblue: #0099FF;
$lightdark: #657786;
$bitdark: #657786;
.signin {
  margin: auto;
  max-width: 540px;
  .container {
    padding-top: 60px;
    .logo {
      margin-bottom: 30px;
      height: 50px;
      .icon.logo {
        background-color: $orange;
        width: 100%;
        height: 100%;
        mask: url(../assets/icon_logo.svg) no-repeat center;
      }
    }
    .title {
      margin: auto;
      width: 152px;
      font-size: 23px;
      line-height: 33.3px;
      height: 33px;
      font-weight: bold;
      color: #1C1C1C;
    }
    form {
      margin: 20px 0 40px 0;
      .form-group {
        margin-bottom: 30px;
        position: relative;
        .account {
          position: absolute;
          left: 10px;
          top: 5px;
          height: 15px;
          font-weight: 500;
          font-size: 15px;
          line-height: 15px;
          color: $bitdark;
        }
        .password {
          position: absolute;
          left: 10px;
          top: 75px;
          font-weight: 500;
          font-size: 15px;
          line-height: 15px;
          color: $bitdark;
        }
        input {
          height: 50px;
          border-radius: 0 0 2px 2px; //should be reivew
          border: none;
          border-bottom: 2px solid $lightdark;
          background: $lightgray;
          margin-top: 20px;
          &:hover {
            box-shadow: 0 0 3px 1px $lightdark;
          }
        }
      }
      .btn-signin {
        background: $orange;
        font-size: 18px;
        height: 50px;
        font-weight: bold;
        color: #ffffff;
        width: 100%;
        border-radius: 50px;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $deeporange;
          box-shadow: 0 0 3px 1px $lightdark;
        }
      }
    }
    .link {
      height: 26px;
      display: flex;
      justify-content: flex-end;
      font-size: 18px;
      color: $lightblue;
      span {
        margin: 0 2px;
        text-decoration: underline;
        font-weight: bold;
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
