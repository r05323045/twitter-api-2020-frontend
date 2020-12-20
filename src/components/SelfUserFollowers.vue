<template>
  <div class="main">
    <div class="upper">
      <img class="arrow" src="@/asset/Vector@2x.png" alt="">
      <div class="title">
        <h3>John Doe</h3>
        <span>25 推文</span>
      </div>
    </div>

    <div class="nav">
      <ul class='nav-pills'>
        <li class="nav-item"> 
          <router-link to="/user/self/follower">追隨者</router-link>
        </li>
    
        <li class="nav-item">
          <router-link to="/user/self/following">正在跟隨</router-link>
        </li>
      </ul>
      
    </div>
    
    <div class="followListContent">
      <div class="singlContent">

        <img src="./../asset/elephant.png" alt="">
        <div class="text">
          <h5 class="title">Laura</h5>
          <h5 class="account">@LauraBill</h5>
          <p class="content">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
        </div>
        <button class="follow">正在跟隨</button>
      </div>      
    </div>  




  </div>
</template>

<script>
export default {
  methods: {

  }  
}
</script>

<style lang="scss">
  .main {
    width: 600px;
    display: flex;
    flex-direction: column;
    .upper {
      display: flex;
      flex-direction: row;
      .arrow {
        width: 17px;
        height: 14px;
        margin: 20px 43px 0 20px;
      }
      .title {
        h3 {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 900;
          font-size: 19px;
          line-height: 28px;
          margin-bottom: 0;
        }
        span {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 19px;
        }
      }
    }

    .nav {
      width: 600px;
      height: auto;
      padding: 0;
      border: 0;
      .nav-pills {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 0;
        .nav-item {
          width: 130px;
          list-style: none;
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: bold;
          font-size: 15px;
          height: 22px;
          
          a {
            text-decoration: none;
            height: 100%;
          }
          .active {
            color: #FF6600;
            border-bottom: solid 2px #FF6600;
            
          }
         
          
        }
        

      }
    }

    .followListContent {
      height: 104px;
      width: 600px;
      .singlContent {
        height: 104px;
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        // outline: blue solid;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 13px 10px 41px 15px;
          object-fit: cover;
        }
        .text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin: 10px 0 10px 0;
          .title {
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: bold;
            font-size: 15px;
            line-height: 15px;
            text-align: start;
          }
          .account {
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 15px;
            text-align: start;
          }
          .content {
            width: 510px;
            height: 44px;
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
            text-align: start;
            margin: 0 15px 0 0;
          }
          
        }
        .follow {
          background: #FF6600;
          width: 92px;
          height: 30px;
          border: 1px solid #FF6600;
          box-sizing: border-box;
          border-radius: 100px;
          position: absolute;
          top: 12px;
          right: 15px;
          color: #ffffff;
        }
      }
    }
  }

  
</style>