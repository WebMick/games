<template>
  <div class="wrap">
    <!-- 地图背景 -->
    <div class="mBox bgBox">
      <div class="row" v-for="(itemX, x) in map[level]" :key="x">
        <template v-for="(itemY, y) in itemX">
          <div class="col" :class="{
                        black: itemY == 0,
                        bg: itemY == 1,
                        ball: itemY == 4,
                    }" :key="y">
          </div>
        </template>
      </div>
    </div>
    <!-- 小人 箱子 -->
    <div class="mBox moveBox">
      <div class="row" v-for="(itemX, x) in moveMap" :key="x">
        <div v-for="(itemY, y) in itemX" :key="y">
          <div class="col" v-if="itemY != 5" :class="{
                        box: itemY == 3
                    }" :style="setPos(x, y)">
          </div>
          <div v-else class="col people" :style="setPeoplePos">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 1.
   * 2.
   */

  import map from './map';
  export default {
    name: 'App',
    data() {
      return {
        map: map,
        level: 0, // 第几关
        moveMap: [],
        peoplePos: {
          x: 0,
          y: 0
        },
      }
    },
    computed: {
      setPos: function () {
        return function (r, c) {
          let pos = {
            left: c * 50 + "px",
            top: r * 50 + "px",
          };
          return pos;
        };
      },
      setPeoplePos: function () {
        let {
          x,
          y
        } = this.peoplePos;
        let pos = {
          left: x * 50 + "px",
          top: y * 50 + "px",
        };
        return pos;
      }
    },
    created() {
      this.init();
    },
    mounted() {
      let _this = this;
      window.addEventListener("keydown", function (event) {
        let key = event && window.event.keyCode;
        let {
          x,
          y
        } = _this.peoplePos;
        let {
          moveMap
        } = _this;
        // isBrick 是否是 砖 或者是 盒子
        // isEnd 是否是盒子终点
        // 左
        if (key == 37) {
          let left = moveMap[y][x - 1];
          let isBrick = (moveMap[y][x - 2] == 1 || moveMap[y][x - 2] == 3);
          if (left != 1) {
            if (left == 3) {
              if (!isBrick) {
                x -= 1;
                _this.moveMap[y][x - 1] = 3;
                _this.moveMap[y][x] = 2;
              }
            } else {
              x -= 1;
            }
          }
        }
        // 右
        else if (key == 39) {
          let right = moveMap[y][x + 1];
          let isBrick = (moveMap[y][x + 2] == 1 || moveMap[y][x + 2] == 3);
          if (right != 1) {
            if (right == 3) {
              if (!isBrick) {
                x += 1;
                _this.moveMap[y][x + 1] = 3;
                _this.moveMap[y][x] = 2;
              }
            } else {
              x += 1;
            }
          }
        }
        // 上
        else if (key == 38) {
          let top = moveMap[y - 1][x];
          let isBrick = moveMap[y - 2][x] == 1 || moveMap[y - 2][x] == 3;
          // let isEnd = moveMap[y - 2][x] == 4;
          if (top != 1) {
            if (top == 3) {
              if (!isBrick) {
                y -= 1;
                _this.moveMap[y - 1][x] = 3;
                _this.moveMap[y][x] = 2;
              }
            } else {
              y -= 1;
            }
          }
        }
        // 下
        else if (key == 40) {
          let down = moveMap[y + 1][x];
          let isBrick = moveMap[y + 2][x] == 1 || moveMap[y + 2][x] == 3;
          if (down != 1) {
            if (down == 3) {
              if (!isBrick) {
                y += 1;
                _this.moveMap[y + 1][x] = 3;
                _this.moveMap[y][x] = 2;
              }
            } else {
              y += 1;
            }
          }
        }
        _this.peoplePos = {
          x,
          y
        };
        setTimeout(() => {
          _this.isWin();
        })
      });
    },
    methods: {
      init() {
        this.map[this.level].map((v) => {
          let item = [];
          v.map((v2) => {
            item.push(v2);
          })
          this.moveMap.push(item);
        })
        this.getPeoplePos(this.moveMap);
      },
      getPeoplePos(map) {
        map.map((v, y) => {
          let x = v.indexOf(5);
          if (x > -1) {
            this.peoplePos = {
              x,
              y
            }
          }
        })
      },
      getBoxPos(map, type) {
        let pos = [];
        for (let i = 0; i < map.length; i++) {
          for (let k = 0; k < map[i].length; k++) {
            if (map[i][k] == type) {
              pos.push([k, i])
            }
          }
        }
        return pos;
      },
      isWin() {
        let a = (this.getBoxPos(this.map[this.level], 4)).toString(),
          b = (this.getBoxPos(this.moveMap, 3)).toString();
        if (a == b) {
          alert('ok')
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  $url: "./img/";
    .wrap{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .mBox{
            .row{
                overflow: hidden;   
                .col{
                    width: 50px;
                    height: 50px;
                    float: left;
                    &.black {
                        background: #000;
                    }
                    &.bg {
                        background: url($url + "bg.jpg") no-repeat;
                        background-size: 100% 100%;
                    }
                    &.box {
                        background: url($url + "box.jpg") no-repeat;
                        background-size: 100% 100%;
                    }
                    &.ball {
                        background: url($url + "light.png") no-repeat;
                    }
                    &.people {
                        background: url($url + "people.png") no-repeat;
                        z-index: 999;
                    }
                }
            }
            &.bgBox{
                background: url($url + "bg2.jpg") repeat;
                background-size: 50px 50px;
            }
            &.moveBox{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                .row{
                    .col{
                        position: absolute;
                    }
                }
            }
            
        }
        
    }
</style>