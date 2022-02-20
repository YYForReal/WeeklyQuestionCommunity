# 学生问答社区

> 基于“仿知乎”项目改造的 问答社区。


## 一. 更新内容
- 内容方面：
  1. 新增选择题卡片
  2. 优化原“知乎”图标为自定义特色图标
  3. 修改个人主页设置样式，优化用户体验。
  4. 编辑组件引入mavon-editor，增加可实时修改的工具栏。

- 性能方面：
  1. 登录，导航组件减少外部样式资源引入。
  2. 用户信息修改将传入数据库的Base64转码URL 修改为 通过七牛云接口获取图片外链的URL。
  3. 路由懒加载：减少打包后的JS包体积，路由访问才加载对应组件。
  4. 去掉编译文件中的map文件。 config/index.js --->productionSourceMap
 
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

## 四. 相关依赖介绍

1. mavon-editor
2. axios
3. ElementUI

## 五