<template>
  <div class="goBangBox" :style="{width: size * 40 + 'px', height: size * 40 + 'px',}">
    <div class="map" :style="{width: (size - 1) * 40 + 'px', height: (size - 1) * 40 + 'px',}">
    <template v-for="itemRow in size">
        <div class="row" v-if="itemRow < size" :key="itemRow" :class="{last: itemRow == size - 1}">
        <template v-for="itemCol in size" >
            <div class="col"  v-if="itemCol < size"  :key="itemCol"></div>
        </template>
        </div>
    </template>
    </div>
    <div class="row" v-for="itemRow in size" :key="itemRow">
    <div class="col" v-for="itemCol in size" :key="itemCol">
        <div class="area" :class="{ed: isEd(itemCol, itemRow), isMe: itemIsMe(itemCol, itemRow)}"  @click="clk(itemCol, itemRow)"></div>
    </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      size: 15,
      isMe: false,
      clkEd: new Map(), // 已经下过的坐标
      winsData: [[],[],[],[]], // 存储四条线的位置
    }
  },
  computed: {
    isEd: function() {
      return function(x, y){
        let key = x + '-' +  y;
        return this.clkEd.has(key);
      }
    },
    itemIsMe: function() {
      return function (x, y) {
        let key = x + '-' +  y;
        return this.clkEd.has(key) && this.clkEd.get(key).isMe;
      }
    },
  },
  methods: {
    clk (x,y) {
      this.addItem(x, y);
      this.$forceUpdate();
    },
    // 添加已选中棋子
    addItem (x, y) {
      // console.log({x,y});
      let key = x + '-' +  y;
      if(!this.clkEd.has(key)){
        this.isMe = !this.isMe;
        let item = {
          x,
          y,
          isMe: this.isMe
        };
        this.clkEd.set(key, item);
      }
      setTimeout(()=>{
        this.isWins(x, y);
      })
    },
    // 判断输赢
    isWins (x, y) {
      // 以 当前位置新建 四条线 -- | / \
      // 横向
      let { size } = this;
      for(let i = 0; i <= size; i++){ 
        let key = i + '-' + y;
        let item = this.clkEd.has(key) ? this.clkEd.get(key).isMe : null;
        this.winsData[0][i - 1] = item;
      }
      // 竖向
      for(let i = 0; i <= size; i++){
        let key = x + '-' + i;
        let item = this.clkEd.has(key) ? this.clkEd.get(key).isMe : null;
        this.winsData[1][i - 1] = item;
      }
      // / 向 左边的
      for(let i = 0; i <= x; i++){
        let key = x - i + '-' + (y + i);
        let item = this.clkEd.has(key) ? this.clkEd.get(key).isMe : null;
        this.winsData[2][x - i] = item;
      }
      // /向 右边的
      for(let i = 0; i < size - x; i++){
        let key = x + i + '-' + (y - i);
        let item = this.clkEd.has(key) ? this.clkEd.get(key).isMe : null;
        this.winsData[2][x + i] = item;
      }
      // \向
      for(let i = 0; i <= y; i++){
        let key = x - i + '-' + (y - i);
        let item = this.clkEd.has(key) ? this.clkEd.get(key).isMe : null;
        this.winsData[3][x - i - 1] = item;
      }
      // \向 右边的
      for(let i = 0; i < size - y; i++){
        let key = x + i + '-' + (y + i);
        let item = this.clkEd.has(key) ? this.clkEd.get(key).isMe : null;
        this.winsData[3][x + i - 1] = item;
      }
      // 判断是否有连续5个相同的
      this.winsData.map((v) => {
        let str = '';
        v.map((v2) => {
          let t;
          if(v2 == true){
            t = 1;
          }else if(v2 == false){
            t = 0;
          }else{
            t = 'null';
          }
          str += t;
        });
        if(str.indexOf('00000') >= 0){
          alert('red wins');
          return;
        }
        if(str.indexOf('11111') >= 0){
          alert('black wins');
          return;
        }
      })
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  $border: #999 solid 1px;
  .goBangBox{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .map{
      position: absolute;
      left: 20px;
      top: 20px;
      .row{
        .col{
          border: $border;
          border-bottom: none;
          border-right: none;
          &:last-child{
            border-right: $border;
          }
        }
        &.last{
          .col {
            border-bottom: $border;
          }
        }
      }
    }
    .row{
      display: flex;
      .col{
        flex: 1;
        height: 40px;
        position: relative;
        box-sizing: border-box;
        .area{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          &.ed{
            &:after{
              content: '';
              position: absolute;
              left: 50%;
              top: 50%;
              width: 60%;
              height: 60%;
              border-radius: 50%;
              background: red;
              transform: translate(-50%,-50%);
            }
            &.isMe{
              &:after{
                background: #000;
              }
            }
          }
        }
      }
    }
  }
</style>
