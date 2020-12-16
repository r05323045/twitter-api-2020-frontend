<template>
  <div class="main">
    <div class="upper">
      <img class="arrow" src="./../asset/Vector@2x.png" alt="">
      <span>推文</span>
    </div>
    <hr>
    <div class="self-content">
      <div class="self-info">
        <img src="./../asset/johnny.jpg" alt="">
        <div class="wrap">
          <span class="name">Apple</span>
          <span class="account">@apple</span>
        </div>
      </div> 
      <p>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.</p>
      <span class="time">上午 10:05・2020年6月10日</span>
    </div>
    <hr>
    <div class="counts">
      <span class="reply-counts">34回覆</span>
      <span class="like-counts">808 喜歡次數</span>
    </div>
    <hr>
    <div class="icons">
      <img class="conversation" src="./../asset/conversation@2x.png" alt="">
      <img class="heart" src="./../asset/heart@2x.png" alt="">
    </div>
    
    <div class="replies"> 
      <img src="./../asset/cyan_bg_.jpg" alt="">
      <div class="reply-content">
        <div class="title">
          <span class="name">Apple</span>
          <span class="account">@apple</span>
          <span class="time">・13小時</span>
        </div>
        <span class="to-whom">回覆 @apple</span>
        <p class="reply-item">Great</p>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  
}
</script>

<style lang='scss'>
  .main {
    hr {margin: 0;}
    width: 600px;
    .upper {
      // outline: red solid;
      height: 55px;
      display: flex;
      flex-direction: row;
      .arrow {
        width: 17px;
        height: 14px;
        margin: 20px 43px 20px 20px;
      }
      span {
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        align-self: center;
      }
    }

    .self-content {
      // border-top: ;
      width: 100%;
      // outline: red solid;
      display: flex;
      flex-direction: column;
      .self-info {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        // outline: red solid;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 13px 10px 41px 15px;
          object-fit: cover;
          // outline: red solid;
        }
        .wrap {
          // outline: red solid;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin: 18px 0 0 0;
          height: 44px;

          .name {
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 700;
            font-size: 15px;
            line-height: 15px;
            text-align: start;
            // height: 22px;
          }
          .account {
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 15px;
            text-align: start;
            // height: 22px;
          }
        }
      }
      p {
        width: 510px;
        height: auto;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 23px;
        line-height: 34px;
        text-align: start;
        margin: 0 75px 0 15px;
      }
      .time {
        width: 510px;
        height: auto;
        // outline: red solid;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        color: #657786;
        text-align: start;
        margin: 15px 0 15px 15px;
      }
    }
    .counts {
      // outline: red solid;
      margin: 20px 0 20px 20px;
      text-align: start;
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: bold;
      font-size: 19px;
      line-height: 28px;
      .like-counts {
        margin-left: 20px;
      }
    }
    .icons {
      display: flex;
      flex-direction: row;
      
      // outline: red solid;
      margin: 21px 0 21px 17px;
      .heart, .conversation {
        height: 25px;
        width: 25px;
        // outline: red solid;
        margin: 0 155px 0 0;
      }
      


      
    }
    .replies {
      height: 105px;
      width: 100%;
      display: flex;
      flex-direction: row;
      background: #FFFFFF;
      border: 1px solid #E6ECF0;
      box-sizing: border-box;
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 18px 10px 37px 15px; 
      }
      .reply-content {
        margin: 15px 0 0 0;
        text-align: start;
        .title {
          margin-bottom: 4px;
          .name {
            margin-right: 5px;
          }
          .account {}
          .time {}
        }
        .to-whom {
          margin-bottom: 5px;
        }
        .reply-item {
          margin-bottom: 15px;
        }
      }
    }
    
  
  }
</style>