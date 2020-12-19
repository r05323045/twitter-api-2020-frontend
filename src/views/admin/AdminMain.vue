<template>
  <div class="admin-main">
    <Navbar></Navbar>
    <div class="container">
      <div class="title">推文清單</div>
      <div class="tweet-list">
        <div v-for="i in 10" :key="i" class="list-item" :class="{ first: i === 1 }">
          <div class="icon cross"></div>
          <div class="avatar"></div>
          <div class="tweet-wrapper">
            <div class="info">
              <div class="name">Apple</div>
              <div class="account-and-post-time">@apple &bull; 3小時</div>
            </div>
            <div class="content">Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'AdminMain',
  components: {
    Navbar
  }
}

</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
$bitdark: #657786;
$divider: #E6ECF0;
.admin-main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .container {
    border-left: 1px solid $divider;
    width: 100%;
    padding: 0;
    .title {
      width: 100%;
      border-bottom: 1px solid $divider;
      height: 55px;
      padding: 15px 0 0 26.55px;
      font-size: 18px;
      font-weight: 700;
      text-align: left;
    }
    .tweet-list {
      max-height: calc(100vh - 55px);
      overflow-y: scroll;
      width: 100%;
      .list-item {
        padding: 10px 0 10px 0;
        height: 120px;
        border-bottom: 1px solid $divider;
        display: flex;
        flex-direction: row;
        position: relative;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          backdrop-filter: brightness(.95);
        }
        .icon.cross {
          cursor: pointer;
          position: absolute;
          top: 19.5px;
          right: 19.5px;
          width: 15px;
          height: 15px;
          mask: url(../../assets/icon_cross.svg) no-repeat center;
          mask-size: contain;
          background-color: $bitdark;
        }
        .avatar {
          margin: 3px 0 0 15px;
          height: 50px;
          min-width: 50px;
          border-radius: 100px;
          background: url(https://source.unsplash.com/collection/4389261/100x100) no-repeat center;
          background-size: 100%;
          cursor: pointer;
          &:hover {
            filter: brightness(.9);
          }
        }
        .tweet-wrapper {
          margin-left: 10px;
          .info {
            height: 22px;
            line-height: 22px;
            display: flex;
            flex-direction: row;
            font-size: 15px;
            font-weight: 700;
            .name {
              font-weight: 700;
              margin-right: 5px;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
            .account-and-post-time {
              color: $bitdark;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          .content {
            margin-top: 6px;
            font-size: 15px;
            font-weight: 500;
            line-height: 22px;
            text-align: left;
            max-width: 902px;
          }
        }
      }
      .list-item.first {
        height: 125px;
        padding-top: 15px;
      }
    }
  }
}
</style>
