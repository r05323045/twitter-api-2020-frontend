<template>
  <div class="profile">
    <div class="header">
      <div class="arrow">
        <div class="icon back"></div>
      </div>
      <div class="simple-info">
        <div class="name">John Doe</div>
        <div class="tweet-count">25 推文</div>
      </div>
    </div>
    <div class="user-info">
      <div class="cover-photo"></div>
      <div class="avatar"></div>
      <button v-show="isSelf" class="btn-edit">編輯個人資料</button>

      <div class="other-button-wrapper">
        <div class="btn-messege">
          <div class="icon messege"></div>
        </div>
        <div class="btn-noti">
          <div class="icon subscribe"></div>
        </div>
        <button class="btn-follow unfollow">正在跟隨</button>
      </div>

      <div class="name">John Doe</div>
      <div class="account">@heyjohn</div>
      <div class="intro">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
      <div class="number-followers">
        <span>34個</span><span class="type">跟隨中</span>
        <span>59個</span><span class="type">跟隨者</span>
      </div>
    </div>
    <div class="tab">
      <div class="item" :class="{ active: tabOption === '推文' }" @click.prevent="selectTab">
        <span class="text">推文</span>
      </div>
      <div class="item" :class="{ active: tabOption === '推文與回覆' }" @click="selectTab">
        <span class="text">推文與回覆</span>
      </div>
      <div class="item" :class="{ active: tabOption === '喜歡的內容' }" @click="selectTab">
        <span class="text">喜歡的內容</span>
      </div>
    </div>
    <TweetList></TweetList>
  </div>
</template>

<script>
import TweetList from '@/components/TweetList.vue'
export default {
  name: 'Profile',
  components: {
    TweetList
  },
  data () {
    return {
      tabOption: '推文',
      isSelf: false
    }
  },
  methods: {
    selectTab (event) {
      this.tabOption = event.target.children[0] ? event.target.children[0].innerText : event.target.innerText
    }
  }
}

</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
$divider: #E6ECF0;
$bitdark: #657786;
.profile {
  width: 100%;
  border: 1px solid $divider;
  max-width: 600px;
  padding: 0;
  .header {
    height: 55px;
    display: flex;
    flex-direction: row;
    .arrow {
      height: 24px;
      width: 24px;
      margin: 15px 0 0 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon.back {
        width: 17px;
        height: 14px;
        mask: url(../assets/icon_back.svg) no-repeat center;
        mask-size: contain;
        background-color: #000000;
        cursor: pointer;
      }
    }
    .simple-info {
      margin: 5px 0 0 40px;
      text-align: left;
      .name {
        height: 24px;
        font-size: 19px;
        line-height: 28px;
        font-weight: 900;
      }
      .tweet-count {
        height: 19px;
        font-size: 13px;
        line-height: 19px;
        font-weight: 500;
        color: $bitdark;
      }
    }
  }
  .user-info {
    width: 100%;
    height: 375px;
    position: relative;
    .cover-photo {
      height: 200px;
      background: url(https://images.unsplash.com/photo-1587502537147-2ba64a62e3d3?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2017&q=80) no-repeat center;
      background-size: cover;
    }
    .avatar {
      width: 100%;
      max-width: 140px;
      height: 140px;
      border: 4px solid #FFFFFF;
      background: url(https://source.unsplash.com/collection/4389261/100x100) #c4c4c4;
      border-radius: 100px;
      position: absolute;
      left: 15px;
      top: 125px;
    }
    .btn-edit {
      float: right;
      margin: 10px 15px 0 0;
      width: 100%;
      max-width: 122px;
      height: 40px;
      line-height: 15px;
      border: 1px solid $orange ;
      background: none;
      font-size: 15px;
      font-weight: 700;
      color: $orange;
      border-radius: 100px;
      transition: ease-in 0.2s;
      &:hover {
        box-shadow: 0 0 3px 1px $bitdark;
        background-color: $orange;
        color: #ffffff;
      }
      &:focus {
        outline: 0;
      }
    }
    .other-button-wrapper {
      margin: 10px 15px 0 0;
      height: 40px;
      width: 192px;
      float: right;
      display: flex;
      flex-direction: row;
      .btn-messege {
        width: 40px;
        height: 40px;
        border: 1px solid $orange;
        margin-right: 10px;
        border-radius: 50%;
        color: $orange;
        font-size: 20px;
        cursor: pointer;
        transition: ease-in 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-color: $orange;
          color: #ffffff;
          .icon.messege {
            background-color: #ffffff;
          }
        }
        .icon.messege {
          width: 20px;
          height: 18px;
          mask: url(../assets/icon_messege.svg) no-repeat center;
          mask-size: contain;
          background-color: $orange;
        }
      }
      .btn-noti {
        width: 40px;
        height: 40px;
        border: 1px solid $orange;
        margin-right: 10px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $orange;
          .icon.subscribe {
            background-color: #ffffff;
            mask: url(../assets/icon_subscribed.svg) no-repeat center;
          }
        }
        .icon.subscribe {
          width: 23.9px;
          height: 21.9px;
          mask: url(../assets/icon_subscribe.svg) no-repeat center;
          mask-size: contain;
          background-color: $orange;
        }
      }
      .btn-noti.already {
        background-color: $orange;
        &:hover {
          background-color: #ffffff;
          .icon.subscribe {
            background-color: $orange;
            mask: url(../assets/icon_subscribe.svg) no-repeat center;
          }
        }
        .icon.subscribe {
          mask: url(../assets/icon_subscribed.svg) no-repeat center;
          background-color: #ffffff;
        }
      }
      .btn-follow {
        width: 100%;
        max-width: 92px;
        height: 40px;
        background: $orange;
        border: 1px solid $orange;
        border-radius: 100px;
        color: #ffffff;
        transition: ease-in 0.2s;
        font-weight: bold;
        font-size: 15px;
        line-height: 15px;
        &:hover {
          background-color: $deeporange;
        }
        &:focus {
          outline: 0;
        }
      }
    }
    .name {
      margin: 70px 0 0 15px;
      text-align: left;
      height: 24px;
      font-weight: 900;
      font-size: 19px;
      line-height: 28px;
    }
    .account {
      margin-left: 15px;
      text-align: left;
      height: 22px;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      color: $bitdark;
    }
    .intro {
      margin: 10px 0 0 15px;
      width: 570px;
      height: 20px;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #000000;
      text-align: left;
    }
    .number-followers {
      text-align: left;
      margin: 10px 0 0 15px;
      height: 20px;
      line-height: 20px;
      font-weight: 500;
      font-size: 14px;
      color: 14px;
      .type {
        color: $bitdark;
        margin-right: 20px;
      }
    }
  }
  .tab {
    border-bottom: 1px solid $divider;
    height: 54px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    .item {
      width: 100%;
      max-width: 130px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: ease-in 0.2s;
      &:hover {
        backdrop-filter: brightness(.95);
      }
      .text {
        z-index: -1;
        font-weight: bold;
        font-size: 15px;
        line-height: 22px;
        color: $bitdark;
      }
    }
    .item.active {
      border-bottom: 2px solid $orange;
      .text {
        color: $orange;
      }
    }
  }
}
</style>