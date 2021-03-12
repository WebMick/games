<template>
  <div class="wrap">
      <div class="main">
          <div class="row" v-for="(item, index) in data" :key="index">
            <div class="col" v-for="(item2, index2) in item" :key="index2">
                {{item2}}
            </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
        size: 4,
        data: []
    }
  },
  created () {
      this.init();
  },
  mounted () {
      let _this = this;
      let { data } = _this;
      window.addEventListener("keydown", function (event) {
        let key = event && window.event.keyCode;
        if(key == 37){
            _this.left();
        }
        if(key == 38){
            _this.up(data);
        }
        if(key == 39){
            _this.right();
        }
        if(key == 40){
            _this.down();
        }
      });
  },
  methods: {
    init () {
        this.createdObj();
        this.randomItem(2);
    },
    createdObj () {
        let { size } = this;
        let arr = [];
        for(let i = 0; i < size; i++){
            let item = [];
            for(let k = 0; k < size; k++){
                item.push(null);
            }
            arr.push(item);
        }
        this.data = arr;
    },
    randomItem (step = 1) {
        for(let i = 0; i < step; i++){
            let { data } = this;
            let nullItem = [];
            data.map((v, k) => {
                v.map((v2, k2) => {
                    v2 == null && nullItem.push([k,k2]);
                });
            });
            let max = nullItem.length;
            let r = parseInt(Math.random() * max);
            let [x, y] = nullItem[r];
            data[x][y] = 2;
        }
    },
    setData (data) {
        let { size } = this;
        for(let i = 0; i < size; i++){
            for(let k = 0; k < size; k++){
                this.data[i][k] = data[k][i] || null;
            }
        }
        console.log(this.data);
        this.$forceUpdate();
    },
    // 上
    up (data) {
        console.log('up');
        let arr = [];
        for(let i = 0; i < data[0].length; i++){
            let itemArr = [];
            for(let k = 0; k < data.length; k++){
                let item = data[k][i];
                itemArr.push(item);
            }
            arr.push(itemArr);
        }
        let newArr = [];
        arr.map((v) => {
            let item = v.filter((s) => {
                return s!=null;
            });
            newArr.push(item);
        });
        console.log(newArr);
        this.setData(newArr);
    },
    // 下
    down () {
        console.log('down');
    },
    // 左
    left () {
        console.log('left');
    },
    // 右
    right () {
        console.log('right');
    },
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .main{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      padding: 5px;
      background: #333;
      border-radius: 10px;
      .row{
          display: flex;
          .col{
              width: 100px;
              height: 100px;
              text-align: center;
              line-height: 100px;
              margin: 5px;
              background: #999;
              color: #fff;
              border-radius: 10px;
          }
      }
  }
</style>
