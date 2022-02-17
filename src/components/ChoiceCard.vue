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
    @media screen and (min-width:300px) {
        width:70vw;
    }
    @media screen and (min-width:768px) {
        width: 30vw;    
    }
    box-sizing: border-box;
    border: 1px dotted dodgerblue;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 2px grey;
    margin:5px auto;
    padding: 5px;
    .title{
        font-size: large;
        text-align: center;
    }
    .description{
        color: brown;
        letter-spacing: .5ch;
        text-indent: 2rem;
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
    
}
</style>