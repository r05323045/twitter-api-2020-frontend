<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <img src="./../asset/exit.png" alt="">
      </div>
      <hr>
      <div class="modal-body">
        <div class="content-of-other">
          <div class="other-info">
            <img src="./../asset/cyan_bg_.jpg" alt="">
            <div class="text-wrap">

              <div class="title-wrap">
                <span class="name">Apple</span>
                <span class="account">@apple</span>
                <span class="time">．3小時</span>
              </div>

              <p>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
              </p>
              <div class="to-whom">
                <span>回覆給</span> 
                <span class="receiver">@apple</span> 
              </div>
            </div>
          </div> 
        </div>

        

        <div class="content-of-mine">
          <img class="photo-of-mine" src="./../asset/cyan_bg_.jpg" alt="">
          <textarea class="tweet-content" type="textarea" placeholder="推你的回覆" name="" id=""></textarea>
          <button>推文</button>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style lang='scss'>
  .modal {
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
      right: 420px;
      left: 20%;
      // top: 54px;
      width: 600px;
      height: 450px;
      border-radius: 14px;
      border: 1px solid #C4C4C4;
      // outline: blue solid;
      hr {
        height: 1px;
        margin: 0;
      }
      .modal-header {
        height: 54px;
        // outline: red solid;
        img {
          height: 15px;
          width: 15px;
          padding: 19.5px auto 19.5px 19.5px;
        }
      }
      .modal-body {
        position: relative;
        // outline: black solid ;
        height: 245px;
        .content-of-other {
          .other-info {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            // outline: red solid;
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              margin: 0px 10px 41px 0px;
              object-fit: cover;
              background: #C4C4C4;
              // outline: red solid;
            }
            .text-wrap {
              display: flex;
              flex-direction: column;
              .title-wrap {
                // outline: red solid;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                // margin: 15px 0 0 0;
                height: 22px;
                margin-bottom: 6px;
                .name {
                  font-family: Noto Sans TC;
                  font-style: normal;
                  font-weight: bold;
                  font-size: 15px;
                  line-height: 22px;
                  margin-right: 5px;
                }
                .account {
                  font-family: Noto Sans TC;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 15px;
                  line-height: 22px;
                }
                .time {
                  font-family: Noto Sans TC;
                  font-style: normal;
                  font-weight: 500;
                  font-size: 15px;
                  line-height: 22px;
                }
              }
              p {
                text-align: start;
              }

              .to-whom {
                text-align: start;
                margin-bottom: 23px;
                font-family: Noto Sans TC;
                font-style: normal;
                font-weight: 500;
                font-size: 13px;
                line-height: 13px;
                .receiver {
                  color: #FF6600;
                }
              }
            }
          }
        }

        .content-of-mine {
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #C4C4C4;
            position: absolute;
            left: 15px;
            
          }
          .tweet-content {
            height: 220px;
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
}
</style>