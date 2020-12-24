<template>
  <div class="main-setting"> 
    <Navbar />
    <SubSetting class="main" :initial-user="user" @after-submit="handleAfterSubmit"/>
  </div>
  
</template>

<script>
import Navbar from "./../components/Navbar"
import SubSetting from './../components/SubSetting'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import store from './../store'

export default {
  name: 'Setting',
  components: {
    Navbar,
    SubSetting
  },
  data () {
    return {
      user: {
        account: '', 
        name: '', 
        email: '',
      }
    }
  },
  created () {
    // const { id } = this.$route.params
    const userId = store.state.currentUser.id
    this.fetchUserSetting(userId)
  },

  methods: {  
    async fetchUserSetting (userId) {
      // const userId = store.state.currentUser.id
      try {
        const { data } = await usersAPI.getSettingPage({ userId })
        // console.log("data", data)
        console.log("userId", userId)
        const { account, name, email } = data[0] 
        console.log("data[0]",data[0])
        this.user = {
          ...this.user,
          account,
          name,
          email
        }

        // console.log("this.user", this.user)
         
        // console.log("this.account",this.account) 
        // this.password = data.password
        // this.passwordCheck = data.passwordCheck
        // this.user = {
        //   ...this.user,
        //   account,
        //   name,
        //   email,
        //   password,
        //   passwordCheck
        // }
        
      } catch (error) {
        Toast.fire({
            icon: 'error',
            title: '無法取得使用者資料，請稍後再試'
          })
      }
    },

    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true

        const {data} = await usersAPI.putSetting({
          userId: this.user.id,
          formData
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳資料，請稍後再試'
        })
      }
    },
    
  } 
}
</script>

<style lang="scss">
  .main-setting {
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin: 0;
    padding: 0;
  }
</style>