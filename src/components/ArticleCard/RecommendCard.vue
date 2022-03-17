<template>
    <div class="article-card">
        <div class="time-release">{{ authorReleaseMessage(article) }}</div>

        <h1 class="article-card-title canTap" @click="TurnToArticle(article.articleId)">
            <span
                class="article-type-tag iconfont icon-icon-test"
                :class="{ 'red': (article.type == 1) }"
            >{{ typeMessage(article.type) }}</span>
            {{ article.title }}
        </h1>
        <div>
            <div
                class="recommend-article-content canTap"
                :class="{ 'recommend-article-content-without-img': article.img == null }"
                @click="TurnToArticle(article.articleId)"
            >
                <div>
                    <div class="img-box float-left" v-if="article.img != null">
                        <img loading="lazy" :src="article.img" :alt="article.title" />
                    </div>
                    <div>
                        <span class="black recommend-article-content-main" v-html="markContent"></span>
                    </div>
                </div>
            </div>
        </div>
        <ArticleButtonBox :article="article"></ArticleButtonBox>
        <hr />
    </div>
</template>
<script>
import ArticleButtonBox from "./ArticleButtonBox.vue";

export default {
    data() {
        return {

        }
    },
    components:{
        ArticleButtonBox,
    },
    props: {
        article: {
            type: Object,
            required: true,
        },
        markContent: {
            type: String,
            required: true,
        }
    },
    mounted() {
        console.log(this.article, this.markContent);
    },
    methods: {
        authorReleaseMessage(article) {
            return article.authorName + "发布了" + this.typeMessage(article.type) + "  " + article.releaseTime;
        },
        typeMessage(articleType) {
            // console.log(articleType);
            switch (articleType) {
                case 0: {
                    return '问答';
                }
                case 1: {
                    return '文章';
                }
                case 2: {
                    return '选择'
                }
            }
        },
        TurnToArticle(id) {
            this.$router.push({
                name: "SpecialArticle",
                params: {
                    articleId: id,
                },
            });
        },

    }
}
</script>
<style scoped lang="less">
.article-card {
    width: 95%;
    text-align: left;
    padding-left: 20px;
    margin-bottom: 5px;
    .recommend-article-content {
        width: 100%;
        height: 100px;
        margin-top: 10px;
        /* background-color: red; */
    }
    .recommend-article-content-without-img {
        width: 100%;
        overflow: hidden;
    }
    .recommend-article-content-main {
        display: block;
        display: -webkit-box;
        height: 72px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
    .time-release {
        color: grey;
        font-size: small;
    }

    .img-box {
        width: 20%;
        min-width: 120px;
        margin-right: 20px;
        height: 10%;
        max-height: 130px;
        /* background-color: yellow; */
    }

    /* 关注 */

    img {
        height: 120px;
    }
}
</style>