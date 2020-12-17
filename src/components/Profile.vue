<template>
  <div class="profile">
    <div class="header">
      <div class="arrow">
        <i class="fas fa-arrow-left"></i>
      </div>
      <div class="simple-info">
        <div class="name">John Doe</div>
        <div class="tweet-count">25 推文</div>
      </div>
    </div>
    <div class="user-info">
      <div class="cover-photo"></div>
      <div class="avatar"></div>
      <button class="btn-edit">編輯個人資料</button>
      <div class="name">John Doe</div>
      <div class="account">@heyjohn</div>
      <div class="intro">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</div>
      <div class="number-followers">
        <span>34個</span><span class="type">跟隨中</span>
        <span>59個</span><span class="type">跟隨者</span>
      </div>
    </div>
    <div class="tab">
      <div class="item" :class="{ active: tabOption==='推文' }" @click.prevent="selectTab">
        <span class="text">推文</span>
      </div>
      <div class="item" :class="{ active: tabOption==='推文與回覆' }" @click="selectTab">
        <span class="text">推文與回覆</span>
      </div>
      <div class="item" :class="{ active: tabOption==='喜歡的內容' }" @click="selectTab">
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
      tabOption: '推文'
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
      height: 15px;
      width: 15px;
      margin: 15px 0 0 15px;
    }
    .simple-info {
      margin: 5px 0 0 50px;
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
      background-size: 100%;
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
      position: absolute;
      top: 210px;
      right: 15px;
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