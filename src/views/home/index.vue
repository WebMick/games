<template>
  <div class="bg">
    <section class="loadingWrap" v-if="isLoading">
        <div class="loading">
            <div class="loadBox">
                <span class="item item-1 color_1"></span>
                <span class="item item-2 color_2"></span>
                <span class="item item-3 color_3"></span>
                <span class="item item-4 color_4"></span>
                <span class="item item-5 color_5"></span>
                <span class="item item-6 color_6"></span>
                <span class="item item-7 color_7"></span>
            </div>
        </div>
    </section>
    <section class="wrap" v-if="!isLoading">
        <div class="rotateBox">
            <div class="transBox">
                <div class="list_1 front"></div>
                <div class="list_1 back color_1"></div>
            </div>
        </div>
        <div class="rotateBox">
            <div class="transBox">
                <div class="list_1 front"></div>
                <div class="list_1 back color_2"></div>
            </div>
        </div>
        <div class="rotateBox">
            <div class="transBox">
                <div class="list_1 front"></div>
                <div class="list_1 back color_3"></div>
            </div>
        </div>
        <div class="rotateBox">
            <div class="transBox">
                <div class="list_1 front"></div>
                <div class="list_1 back color_4"></div>
            </div>
        </div>
        <div class="rotateBox">
            <div class="transBox">
                <div class="list_1 front"></div>
                <div class="list_1 back color_5"></div>
            </div>
        </div>
        <div class="rotateBox">
            <div class="transBox">
                <div class="list_1 front"></div>
                <div class="list_1 back color_6"></div>
            </div>
        </div>
        <div class="rotateBox">
            <div class="transBox">
                <div class="list_1 front"></div>
                <div class="list_1 back color_7"></div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
      return {
          loadTime: 1000,
          isLoading: true,
      }
  },
  created () {
      this.loading();
  },
  methods: {
      loading () {
          setTimeout(()=>{
              this.isLoading = false;
          }, this.loadTime)
      }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.bg{
    background: #000;
}

.loadingWrap{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #080718;
    z-index: 999;
}
.loading{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loading .loadBox{
    display: flex;
    align-items: center;
}
.loading .loadBox .item{
    width: 2px;
    height: 20px;
    border-radius: 2px;
    margin: 0 3px;
    animation: loadAni 1.2s infinite;
}
.loading .loadBox .item-1 { 
    animation-delay: -1s;
}
.loading .loadBox .item-2 { 
    animation-delay: -0.9s;
}
.loading .loadBox .item-3 { 
    animation-delay: -0.8s;
}
.loading .loadBox .item-4 { 
    animation-delay: -0.7s;
}
.loading .loadBox .item-5 { 
    animation-delay: -0.6s;
}
.loading .loadBox .item-6 { 
    animation-delay: -0.5s;
}
.loading .loadBox .item-7 { 
    animation-delay: -0.4s;
}
@keyframes loadAni {
    0%,40%,100%{
        transform: scaleY(0.2);
    }
    20%,60%{
        transform: scaleY(1);
    }
}

.wrap{
    display: flex;
    position: relative;
    height: 100vh;
    overflow: hidden;
}
.rotateBox{  
    flex:1; 
    overflow:hidden;  
    height: 100vh; 
    float: left; 
    position: relative;
    -webkit-perspective: 2000px; 
    perspective:600px;
    -moz-perspective: 600px;
    -o-perspective: 600px; 
    -ms-perspective: 600px;}
.transBox{
    -webkit-transform-style: preserve-3d;
    transform-origin: center center calc(100vw / 14 * -1 ); 
    width:100%;
    height: 100vh; 
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d; 
    position:absolute; 
    top: 0; 
    left: 0;
    -webkit-transition:.4s;
    -moz-transition:.4s;
    -o-transition:.5s; 
}
.transBox .list_1{
    position: absolute;  
    width: 100%;
    height: 100vh;
}
.transBox .front{
    left: 0; 
    top:0; 
    background: #080718;
}
.transBox .back{
    left: 100%; 
    top:0;  
    -webkit-transform-origin: left; 
    -moz-transform-origin: left;
    -o-transform-origin: left;
    -ms-transform-origin: left;
    -webkit-transform: rotateY(90deg);
    -moz-transform: rotateY(90deg);
    -o-transform: rotateY(90deg);
    -ms-transform: rotateY(90deg);
}
.transBox .backed{
    left:100%; 
    top:0; 
    position: absolute
}
.rotateBox:hover .transBox{
    -webkit-transform: rotateY(-90deg);
    -moz-transform: rotateY(-90deg);
    -o-transform: rotateY(-90deg);
}
.color_1{
    background:#2ecc71;
}
.color_2{
    background:#c0392b;
}
.color_3{
    background:#9b59b6;
}
.color_4{
    background:#e67e22;
}
.color_5{
    background:#3498db;
}
.color_6{
    background:#e74c3c;
}
.color_7{
    background:#e74c8c;
}
</style>
