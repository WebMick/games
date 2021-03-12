<template>
    <div class="cardWrap">
        <div class="cardBox">
            <div class="main">
                <div class="before cont">
                    <div class="numBox">
                        <div class="item" 
                            :class="{act: item != '#'}"
                            v-for="(item, index) in showNumber" 
                            :key="'card' + index">
                            <p class="t">#</p>
                            <p class="num">{{item}}</p>
                        </div>
                    </div>
                </div>
                <div class="after cont"></div>
            </div>
        </div>
        <div class="formBox">
            <div class="item">
                <p class="tit">Card Number</p>
                <input type="text" maxlength="16" v-model="cardNo">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        showNumber () {
            let arr = [];
            for(let i = 0; i < 16; i++){
                arr[i] = this.cardNo[i] || '#';
            }
            return arr
        }
    },
    data () {
        return {
            cardNo: ''
        }
    }
}
</script>

<style lang="scss" type="text/scss" scoped>
    .cardWrap{
        position: fixed;
        color: #333;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 450px;
        .cardBox{
            width: 350px;
            margin: 0 auto;
            position: relative;
            z-index: 9;
            height: 210px;
            background: #999;
            border-radius: 10px;
            .main{
                position: relative;
                height: 100%;
                overflow: hidden;
                .cont{
                    position: relative;
                    height: 100%;
                }
                .before{
                    .numBox{
                        position: absolute;
                        left: 20px;
                        right: 20px;
                        top: 95px;
                        height: 20px;
                        overflow: hidden;
                        line-height: 20px;
                        overflow: hidden;
                        &.act{
                            border: #fff solid 1px;
                            border-radius: 5px;
                        }
                        .item{
                            float: left;
                            width: 15px;
                            text-align: center;
                            animation: numAni2 .5s;
                            font-size: 16px;
                            font-weight: bold;
                            color: #fff;
                            &.act{
                                animation: numAni .5s both;
                            }
                            &:nth-child(4n + 1){
                                margin-left: 20px;
                            }
                            &:nth-child(1){
                                margin-left: 0;
                            }
                        }
                    }
                }
            }
        }
        .formBox{
            position: relative;
            padding: 120px 20px 20px;
            margin-top: -100px;
            box-shadow:  0 0 50px #eaeaea;
            border-radius: 10px;
            .item{
                .tit{
                    font-size: 14px;
                }
            }
        }
    }
    @keyframes numAni{
        0%{
            transform: translateY(0);
        }
        100%{
            transform: translateY(-50%);
        }
    }
    @keyframes numAni2{
        0%{
            transform: translateY(-50%);
        }
        100%{
            transform: translateY(0);
        }
    }
</style>