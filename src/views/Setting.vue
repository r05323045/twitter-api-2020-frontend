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


export default {
  name: 'Setting',
  components: {
    Navbar,
    SubSetting
  },
  data () {
    return {
      user: {
        id: '',
        account: '', 
        name: '', 
        email: '',
        password: '',
        passwordCheck: ''
      }
    }
  },
  watch: {
    initialUser (newValue) {
      this.user = {
        ...this.user,
        ...newValue
      }
    },
  }, 
  created () {
    const { id } = this.$route.params
    this.fetchUserSetting(id)
  },

  methods: {  
    async fetchUserSetting () {
      try {
      const userId = () => Response.data.user.id
      const { data } = await usersAPI.getSettingPage({ userId })
      
      const { account, name, email, password, passwordCheck } = data.user  

      this.user = {
        ...this.user,
        account,
        name,
        email,
        password,
        passwordCheck
      }

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