<template>
    <div class="person-box" @mouseleave="canShow()">
        <div class="user-img inner-user-img">
            <!-- 默认头像 -->
            <img
                :src="avatar ? avatar : 'https://p3.itc.cn/images01/20211016/27d2478466b44b168a20a8255cf8334c.jpeg'"
            />
            <!-- @mouseenter="isDetails = true;"
            @mouseleave="isDetails = false;"-->
        </div>
        <div class="user-name inner-user-name">
            <el-button class="focus-button" @click="handleFocus">关注</el-button>
            <h2>
                {{ username ? username : '匿名用户' }}
                <i class="iconfont icon-huiyuan orange"></i>
            </h2>
            <p class="user-description">{{ description == null ? '' : description }}</p>
        </div>
        <div class="person-details">
            <div>
                <p>文章</p>
                <h3>{{ cardInfo.articleNum || cardInfo.number }}</h3>
            </div>
            <div>
                <p>问答</p>
                <h3>{{ cardInfo.questionNum || cardInfo.number }}</h3>
            </div>
            <div>
                <p>选择</p>
                <h3>{{ cardInfo.choiceNum || cardInfo.number }}</h3>
            </div>
        </div>
    </div>
</template>
<script>
import http from "@/utils/http.js";

export default {
    data() {
        return {
            isDetails: true,
            cardInfo: { number: 0 },
        }
    },
    mounted() {
        console.log(this.userId);
        setTimeout(()=>{
            this.getCardInfo();
        },1000);
        // let request = setInterval(()=>{
        //     this.getCardInfo().then(()=>{
        //         clearInterval(request);
        //     }).catch(()=>{
        //         count ++;
        //         if(count>3) {
        //             clearInterval(request);
        //         }
        //     });
        // },1000)

    },
    props: {
        userId: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        canShow: {
            type: Function,
        }
    },
    methods: {
        getCardInfo() {
            return new Promise((resolve, reject) => {
                console.log(this.userId);
                http.get(this.baseUrl + "/user/getUserCardInfo?userId=" + this.userId).then((data) => {
                    console.log("http:", data.data);
                    this.cardInfo = data.data;
                    resolve();
                }).catch(()=>{
                    reject();
                });
            })
        },
        handleFocus(){
            let userId =this.$store.state.userInfo.userId;
            let follower = this.userId ;
            console.log(userId,follower)
            //http://localhost:9630/follower/follow?userId=1&followerId=2
            http.post(this.baseUrl + "/follower/follow",{
                userId,
                follower,
            }).then(()=>{
                this.$message({
                    type:'success',
                    message:'关注成功'
                })
            })
        }
    }
}
</script>
<style scoped lang="less">
.person-box {
    position: absolute;
    top: -10px;
    width: 400px;
    height: 200px;
    background-color: rgb(159, 216, 238);
    opacity: 0.98;
    z-index: 999;
    animation: showIn 1s;

    .user-img {
        width: 50px;
        height: 50px;
        display: inline-block;
        margin-right: 5px;
        border-radius: 10px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }

    .user-name {
        display: inline-block;
        position: relative;
        top: -8px;
        height: 50px;
        padding: 0;
        margin: 0;
        .user-description {
            font-size: 14px;
        }
    }

    .inner-user-img {
        width: 80px;
        height: 80px;
    }
    .inner-user-name {
        max-width: 300px;
        text-overflow: ellipsis;
        .focus-button {
            position: absolute;
            right: 0;
            top: 10px;
            z-index: 9999;
        }
        h2 {
            display: block;
            color: rgb(162, 0, 255);
            width: 300px;
        }
    }
    .person-details {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        text-align: center;
    }
}
</style>