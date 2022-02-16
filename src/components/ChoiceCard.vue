<template>
    <div class="choice-card">
        <h1 class="title">{{title}}</h1>
        <p class="description">{{description}}</p>
        <div class="choice-area">
            <p v-for="(choice,index) in choices" :key="index">{{('A'+index)}}.{{choice}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            title:'问题标题',
            description:'问题描述',
            choices:["选项A","选项B","选项C"],
        }
    },
    methods:{

    }
}
</script>
<style scoped lang="less">
.choice-card{
    width: 30vw;
    box-sizing: border-box;
    .title{
        font-size: large;
    }
    .description{
        color: brown;
        letter-spacing: 1ch;
    }
    .choice-area{
        width:100%;
        background-color: #ededed;
        opacity: 0.9;
        margin-top: 10px;
        p{
            margin-top: 5px;
            background-color: #cecece;
        }
    }
    
}
</style>