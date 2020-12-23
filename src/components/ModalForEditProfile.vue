<template>
  <div class="modal edit">
    <div class="modal-content">
      <form @submit.stop.prevent="handleSubmit">
        <div class="modal-header">
          <div class="icon cross" @click.stop.prevent="cancelModalClick()"></div>
          <span class="title">編輯個人資料</span>
          <button class="save" type="submit">儲存</button>
        </div>
            
        <div class="modal-body">
          <div class="background-photo" :style="{ background: `url(${user.cover}) no-repeat center/cover` }">
          </div>
          <div class="photo" :style="{ background: `url(${user.avatar}) no-repeat center/cover` }">
            
          </div>
          <div class="for-inputs">
            <input class="tweet-content name" v-model="user.name" type="text" placeholder="" name="name" />
            <span class="word-count">8/50</span>

            <textarea class="tweet-content intro" v-model="user.introduction" type="textarea" placeholder="" name="intro" ></textarea>
            <span class="word-count">0/160</span>
          </div>
          <div class="icon camera-two">
            <input class="coverFile" ref="coverFile"  accept="image/*" @change="coverChange" type="file">
          </div>
          <div class="icon camera-one">
            <input class="avatarFile" ref="avatarFile"  accept="image/*" @change="avatarChange" type="file">
          </div>
          <img class="icon camera-two" src="./../asset/camera.png" alt="">
          <img class="icon inside-one" src="./../asset/camera_inside.png" alt="">
          <img class="icon inside-two" src="./../asset/camera_inside.png" alt="">
          <img class="icon cross" src="./../asset/cross.png" alt="">
          <span class="name tag">名稱</span>
          <span class="self-intro tag">自我介紹</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from '@/utils/helpers'
import usersAPI from '@/apis/users'
export default {
  name: 'Modal',
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  data () {
    return {
      formIntro: '',
      formName: '',
    }
  },
  created () {
    console.log(this.currentUser)
    this.user = this.currentUser
  },
  methods: {
    cancelModalClick() {
      this.$emit('after-click-cross')
    },
    coverChange() {
      if (this.$refs.coverFile.files) {
        const coverUrl = window.URL.createObjectURL(this.$refs.coverFile.files[0])
        this.user.cover = coverUrl
      }
    },
    handleSubmit(e) {
      if (this.user.name === '') {
        Toast.fire({
          icon: 'warning',
          title: '請輸入名稱',
        });
        return;
      } else if (
        this.user.name.length > 50 &&
        this.user.introduction.length > 160
      ) {
        Toast.fire({
          icon: 'warning',
          title: '名稱和自我介紹超過最大限制字數！',
        });
        return;
      } else if (this.user.name.length > 50) {
        Toast.fire({
          icon: 'warning',
          title: '名稱只限50字',
        });
        return;
      } else if (this.user.introduction.length > 160) {
        Toast.fire({
          icon: 'warning',
          title: '自我介紹只限160字',
        });
        return;
      }
      const form = e.target;
      const formData = new FormData(form);
      this.putUser(formData)
    },
    avatarChange() {
      if (this.$refs.avatarFile.files) {
        const avatarUrl = window.URL.createObjectURL(this.$refs.avatarFile.files[0])
        this.user.avatar = avatarUrl
      }
    },
    async putUser (formData) {
      try {
        const { data } = await usersAPI.putUser({
          userId: this.currentUser.id,
          formData
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.$emit('completeEdit')
        this.$emit('after-click-cross')

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法更新資料，請稍後再試'
        })
      }
    }
  }
}
</script>

<style lang='scss'>
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
$bitdark: #657786;
$divider: #E6ECF0;
.modal.edit {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  
  
  .modal-content {
    position: absolute;
    left: 50%;
    top: 54px;
    width: 600px;
    height: 654px;
    border-radius: 14px;
    border: 1px solid #C4C4C4;
    transform: translate(-50%, 0);
    // outline: blue solid;
    
    .modal-header {
      height: 54px;
      // outline: red solid;
      padding: 0;
      display: flex;
      align-items: center;
      .icon.cross {
        width: 15px;
        height: 15px;
        margin: 0 0 0 19.5px;
        mask: url(../assets/icon_cross.svg) no-repeat center;
        mask-size: contain;
        background-color: $bitdark;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $orange;
        }
      }
      .title {
        // line-height: 54px;
        margin: 13px 324px 14px 45px;
        justify-items: start;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: bold;
        font-size: 19px;
        line-height: 28px;
      }

      .save {
        width: 64px;
        height: 30px;
        background: #FF6600;
        border-radius: 100px;   
        color: #ffffff;
        border: none;
        margin: 12px 15px 12px 0;
        &:focus {
          outline: none;
        }
        
      }
    }

    form {
      height: 100%;
    }

    .modal-body {
      height: 100%;
      position: relative;
      // outline: black solid ;
      padding: 0;
      .background-photo {
        width: 598px;
        height: 200px;
      }
      .photo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: #C4C4C4;
        position: absolute;
        left: 15px;
        top: 140px;
        border: 4px solid #FFFFFF;
        box-sizing: border-box;
      }
      .for-inputs {
        display: flex;
        flex-direction: column;
        margin-top: 80px;
        // outline: red solid;
        .tweet-content {
          width: 570px;
          height: 150px;
          margin-left: 75px - 16px;
          margin-right: 15px;
          border: none;
          resize: none;
          outline: none;
          background: #F5F8FA;
          margin: 0 15px;
          border-bottom: 2px solid #657786;
          padding: 22px 15px 0 15px;
          // ::placeholder {
          //   font-family: Noto Sans TC;
          //   font-style: normal;
          //   font-weight: 500;
          //   font-size: 15px;
          //   line-height: 15px;
          // }
        }
        .tweet-content.name {
          font-weight: 500;
          font-size: 19px;
          line-height: 28px;
          color:#1C1C1C;
        }
        .name {
          height: 54px; 
          
        }
        .intro {
          margin-top: 43px;
          font-weight: 500;
          font-size: 19px;
          line-height: 28px;
          color:#1C1C1C;
        }
        .word-count {
          text-align: end;
          margin-right: 15px;
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
        }

      }
      .tag {
        position: absolute;
        left: 30px;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
      }
      .name {
        top: 285px;
        font-weight: 500;
        font-size: 15px;
        line-height: 15px;
        color: #657786;
      }
      .self-intro {
        font-weight: 500;
        font-size: 15px;
        line-height: 15px;
        bottom: 231px;
        color: #657786;
      }
      .icon {
        position: absolute;   
        height: 20px;
        width: 20px;
      }
      .inside-one, .inside-two {
        height: 9.7px;
        width: 9.7px;
      }
      .camera-one {
        top: 190px;
        left: 68px;
        background: url(./../asset/camera.png) no-repeat center;
        background-size: contain;
        cursor: pointer;
        .avatarFile {
          width: 100%;
          height: 100%;
          opacity: 0;
          position: relative;
          cursor: pointer;
        }
      }
      .inside-one {
        top: 196px;
        left: 73px;
        cursor: pointer;
      }

      .camera-two {
        top: 90px;
        left: 262px;
        cursor: pointer;
        z-index: 999;
        .coverFile {
          width: 100%;
          height: 100%;
          opacity: 0;
          position: relative;
          z-index: 1;
          cursor: pointer;
        }
      }
      .inside-two {
        top: 96px;
        left: 267px;
        cursor: pointer;
      }

      .cross {
        top: 92px;
        left: 318.5px;
      }
    }
  }
}
</style>