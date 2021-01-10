<template>
  <div class="modal new">
    <div class="modal-content">
      <div class="modal-header">

        <div class="icon cross" @click.stop.prevent="cancelModalClick()"></div>

      </div>
      <hr>
      <div class="modal-body">
        <div class="photo" :style="{ background: `url(${currentUser.avatar}) no-repeat center/cover` }"></div>
        <textarea class="tweet-content" type="textarea" placeholder="有什麼新鮮事嗎?" v-model="tweetDescription"></textarea>
        <button @click.stop.prevent="postTweet(tweetDescription)">推文</button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { Toast } from '@/utils/helpers'
import _ from 'loadsh'
export default {
  name: 'ModalForNewTweet',
  data () {
    return {
      tweets: [],
      tweetDescription: ''
    }
  },
  watch: {
    tweetDescription () {
      this.checkTextLength()
    }
  },
  methods: {
    checkTextLength: _.debounce(function() {
      if (this.tweetDescription.length > 139) {
        this.tweetDescription = this.tweetDescription.slice(0, 139)
        Toast.fire({
          icon: 'error',
          title: '推文字數已達上限'
        })
      }
    }, 1000),
    cancelModalClick() {
      this.$emit('after-click-cross')
    },
    postTweet(description) {
      this.$emit('postTweet', description)
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  }
}
</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
$bitdark: #657786;
$divider: #E6ECF0;
.modal.new {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  // z-index: 100;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
      
  .modal-content {
    position: absolute;
    left: 50%;
    top: 54px;
    width: 600px;
    height: 300px;
    border-radius: 14px;
    // border: 1px solid #C4C4C4;
    transform: translate(-50%, 0);
    // outline: blue solid;
    
    .modal-header {
      height: 54px;
      width: 600px;
      
      margin: 0;
      padding: 19.5px auto 19.5px 19.5px;
      // outline: red solid 100px;
      .icon.cross {
        width: 15px;
        height: 15px;
        margin: auto 0;
        mask: url(../assets/icon_cross.svg) no-repeat center;
        mask-size: contain;
        background-color: $bitdark;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $orange;
        }
      }
    }

    hr {
      width: 1px;
      color: #C4C4C4;
      margin: 0;

    }

    .modal-body {
      position: relative;
      // outline: black solid ;
      height: 245px;
      .photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #C4C4C4;
        position: absolute;
        left: 15px;
        transition: ease-in 0.2s;
        cursor: pointer;
        &:hover {
          filter: brightness(.9);
        }
        
      }
      .tweet-content {
        height: 100%;
        width: 510px;
        margin-left: 75px - 16px;
        margin-right: 15px;
        border: none;
        resize: none;
        outline: none;
        ::placeholder {
          font-size: 16px;
          font-weight: 500;
          color: #919191;

        }
      }
      button {
        position: absolute;
        right: 15px;
        bottom: 15px;
        background: #FF6600;
        border-radius: 100px;
        color: #ffffff;
        width: 64px;
        height: 40px;
        outline: none;
        border: none;
      }
    }
  }
}
</style>