# 仿知乎

> 仿PC端知乎，多人交流平台

## 模块

1. 用户模块
    - 登录注册
    - 信息修改
    - 个人主页（TODO）

2. 内容模块
    - 文章展示
    - 文章点赞&评论
    - 文章发布&回答

## 特色

1. jwt加密
2. 自定义markdown编辑
3. 自定义个人背景



## 项目运行流程

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

vue create 

vue init webpack 


1.push to github: ( must first clone a repository to local machine )
git remote add <name> <url>
git push <repo name> <branch name> //<branch name>: remote repository branch

//Example:
git remote add origin <url>
git push origin master

//Others:
git remote rm <name>  //remove connection to a remote repository
git remote rename <old-name> <new-name> 


2.clone a specified branch
git clone -b <branch> <URL>

3.add a local repository
git init
git add .
git commit -m "<MESSEAGE>"

4.解除SSL验证
git config --global http.sslVerify "false"

5.fetch and merge with annother repository
git pull <repository> <branch>
