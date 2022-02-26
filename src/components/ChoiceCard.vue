<template>
    <div class="choice-card">
        <div class="title-box">
            <span class="time">{{time}}</span>
            <h1 class="title">{{title}}</h1>
        </div>
        <p class="description" v-html="description"></p>
        <div class="choice-area">
            <p v-for="(choice,index) in choices" :key="index" @click="handleClickAnswer(choice)">{{(baseArr[index])}}.{{choice.content}}</p>
        </div>
        <div class="submit-button-area">
            <el-button type="primary" round>提交</el-button>
            <el-button type="success" round>答案</el-button>
        </div>
    </div>
</template>
<script>
//   import {
//     marked
//   } from 'marked'
export default {
    data(){
        return {
            baseArr:['A','B','C','D','E','F','G']
            // title:'问题标题',
            // description:'问题描述',
            // choices:["选项A","选项B","选项C"],
        }
    },
    props:{
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        choices:{
            type:Array,
            required:true,
        },
        time:{
            type:String,
            required:true,
        },

    },

    computed:{
        description:function(){
            console.log(this.content);
            console.log( marked.parse(this.content));
            return marked.parse(this.content);
        }
    },
    methods:{
        handleClickAnswer(choice){
            console.log(choice);
            if(choice.isCorrect){
                this.$message({
                    type:'success',
                    message:'答对啦',
                })
            }else{
                this.$message({
                    type:'error',
                    message:'答错啦',
                })
            }
        }
    }
}
</script>
<style scoped lang="less">
.choice-card{
    @media screen and (min-width:300px) {
        width:80vw;
    }
    @media screen and (min-width:768px) {
        width: 40vw;    
    }
    box-sizing: border-box;
    border: 1px dotted dodgerblue;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 2px grey;
    margin:5px auto;
    padding: 5px;
    .title-box{
        position: relative;
        .title{
            font-size: 2rem;
            text-align: center;
        }   
        .time{
            position: absolute;
            right:0;
            opacity: 0.8;
        }

    }
    .description{
        color: brown;
        letter-spacing: .3ch;
        text-indent: 2rem;
        text-align: justify;
    }
    .choice-area{
        width:100%;
        opacity: 0.9;
        margin-top: 10px; 
        p{
            line-height:2rem;
            margin: 15px auto;
            padding-left:8px;
            padding-right: 8px;
            background-color: #d9ff02;
            border:1px solid blue;
            border-radius: 5px;

            &:hover{
                color:blue;
                background-color: skyblue;
            }
            cursor: pointer;
        }
    }
    .submit-button-area{
        display: flex;
        width: 100%;
        justify-content: center;
        .submit-button{
            display: block;
        }
    }
}
</style>