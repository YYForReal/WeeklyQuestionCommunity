# 学生问答社区

> 基于“仿知乎”项目（Web课程大作业）迭代改造的 问答社区。
> 在线查看：http://yywebsite.cn/community/


## 一. 更新内容
- 内容方面：
  1. 新增选择题卡片
  2. 优化原“知乎”图标为自定义特色图标
  3. 修改个人主页设置样式，优化用户体验。
  4. 编辑组件引入maven-editor，增加可实时修改的工具栏。
  5. 引入音乐唱片。
  6. 去除无用的视频卡片，修改为展示视频。
  7. 实现分享链接,点击按钮后自动拷贝链接内容到剪贴板

- 性能方面：
  1. 登录，导航组件减少外部样式资源引入。减少打包后的app.css样式资源大小。
  2. 用户信息修改将传入数据库的Base64转码URL 修改为 通过七牛云接口获取图片外链的URL。减少数据库负载与网络请求数据量。
  3. 路由懒加载：减少打包后的JS包体积，路由访问才加载对应组件。（代价：切换组件时有加载时间）
  4. 去掉编译文件中的map文件。 config/index.js --->productionSourceMap
  5. cdn方式引入第三方库：element-ui，vuex，vue-router。配置webpack.config.js中externals:减少import，打包后vendor.js体积减少0.7MB。
  
- 代码结构：
  1. 增加views，以及components目录下的内容划分。
  2. 逐步修改各个组件的CSS样式，尽可能达到响应式的布局。（DOING）

## 二. 原有模块

1. 用户模块
    - 登录注册
    - 信息修改
    - 个人主页（TODO）
    - 关注（TODO）
2. 内容模块
    - 展示
      - 文章列表卡片展示
      - 文章详情页面展示
    - 发布
      - 文章
      - 问答
    - 点赞
    - 评论
    - 回答

## 三. 特色

1. jwt加密
2. 自定义markdown编辑
3. 自定义个人背景



## 三. 项目运行流程

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 四. 即将实现
1. 全文检索
2. 用户关注、收藏、动态
3. 用户之间私聊
4. 动态推送已关注的问题（是否有新回答）
5. 回答的点赞、评论通知

