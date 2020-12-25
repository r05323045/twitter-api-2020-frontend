<template>
  <div class="container">
    <div class="header">
      <h3>帳戶設定</h3>
    </div>

    <div class="content">
      <form ref="settingForm">
        <div class="form-label-group mb-2" >
          <!-- <label for="account">帳號</label> -->
          <input
            id="account"
            name="account"
            type="text"
            class="form-control"
            v-model="user.account"
            required
          >
        </div>

        <div class="form-label-group mb-2">
          <!-- <label for="name">名稱</label> -->
          <input
            id="name"
            name="name"
            type="text"
            class="form-control"
            v-model="user.name"
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
            v-model="user.email"
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
            placeholder=""
            v-model="user.password"
            required
          >
        </div>

        <div class="form-label-group mb-3">
          <!-- <label for="password-check">{{user}}</label> -->
          <input
            id="password-check"
            name="passwordCheck"
            type="password"
            class="form-control"
            placeholder=""
            autocomplete="new-password"
            v-model="passwordCheck"
            required
          >
        </div> 
      
        <div class="link">
          <div class="save-button" @click.prevent="handleSubmit">儲存</div> 
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from '@/utils/helpers'
import usersAPI from './../apis/users'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      user: {},
      passwordCheck: ''
    }
  },
  props: {
    initialUser: {
      type: Object,
    }
  }, 
  created () {
    this.fetchUserSetting(this.currentUser.id)
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {  
    async fetchUserSetting (userId) {

      try {
        const { data } = await usersAPI.getSettingPage({ userId })

        this.user = { ...data[0], password: ''}
        
      } catch (error) {
        Toast.fire({
            icon: 'error',
            title: '無法取得使用者資料，請稍後再試'
          })
      }
    },
    async handleSubmit () {
      try {
        if (this.user.account.length > 15) {
          Toast.fire({
            icon: "warning",
            title: "帳號限定使用15個字",
          })
          return
        }
        if (this.user.name.length > 50) {
          Toast.fire({
            icon: "warning",
            title: "名字限定使用50個字",
          })
          return
        }
        if (!this.user.account || !this.user.name || !this.user.email) {
          Toast.fire({
            icon: "warning",
            title: "所有欄位為必填",
          })
          return
        }
        if (this.user.password !== this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "密碼與確認密碼不符",
          })
          return;
        }
        const formData = {name: this.user.name, account: this.user.account, email: this.user.email}
        if (this.user.password !== this.passwordCheck) {
          formData.password = this.user.password
        }
        console.log(formData)
        const { data } = await usersAPI.putSetting({
          userId: this.currentUserid,
          formData
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        } else {
          Toast.fire({
            icon: 'success',
            title: '更新成功'
          })
        }
        this.$store.commit('setCurrentUser', this.user)
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳資料，請稍後再試'
        })
      }
    }
  } 
}
</script>

<style lang="scss">
.container {
  border-left: solid 1px #E6ECF0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
 
  .header {
    width: auto;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 28px;
    height: 55px;
    border-bottom: 1px solid #E6ECF0;
    margin-bottom: 2px;
    h3 {
      margin-left: 23.69px;
      line-height: 55px;
      text-align: start;
    }
  }

  .content {
    margin-left: 16px;
    form {
      // outline: red solid;
      width: auto;
      height: auto;
      .form-label-group {
        width: 642px;
        height: 50px;
        margin: 0px;
        padding: 0;
        input {

          border-radius: 0;
          border: none;
          border-bottom: 2px solid #919191;
          background: #F5F8FA;
          margin-top: 30px;
          width: 642px;
          height: 50px;
        }
      }

      .link {
        width: 122px;
        height: 50px;
        background: #FF6600;
        border-radius: 50px;
        padding: 0;
        margin-left: 536px - 16px;
        
        .save-button {
          line-height: 50px;
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }    
}
</style>