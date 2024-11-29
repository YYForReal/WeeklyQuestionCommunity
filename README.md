# 学生问答社区

> 22年1月~3月和[bjyh345](https://github.com/bjyh345) 基于“仿知乎”项目（12月Web课程大作业）继续迭代升级的 问答社区。
> 
> 在线查看：http://yywebsite.cn/community/ (废弃)
> 
> 配套后端：https://github.com/YYForReal/WeeklyQuestionCommunityBackend
> 
> 技术点：Vue + Springboot框架。
>   -  前端：element-ui + vuex + vue-router + 编辑器maven-editor + 渲染（marked + dompurify）
>   -  后端：七牛云OSS存储 + JWT



## 社区介绍

> 后续更新缺失截图记录，所展示截图为早期效果。

### 1.	整体结构

网站主要分为用户模块与内容模块。
其中用户模块包括登录/注册界面、个人主页和修改个人信息模块，支持用户登录或注册网站账号，自定义并展示个人信息以及修改账号密码。
内容模块主要展示“关注”，“推荐”，“热榜”三类文章，支持用户发布**文章** 或 **问题** 以及对文章内容做出相应的操作（回答，评论，赞同）。

![image](https://github.com/user-attachments/assets/cb7643bf-b60d-4fba-92a9-962f5796ef55)


### 2. 核心功能

- **用户模块**：
  - 注册/登录与用户认证
  - 个性化主页与用户信息管理
  - 密码修改与安全设置

- **内容模块**：
  - 问题发布与文章创建
  - 支持回答、评论、点赞等互动功能
  - 内容推荐与热榜展示

### 3. 模块特色

#### 用户模块特色
- **个性化主页**：用户可自定义头像、昵称与个人简介，展示个人的提问和回答记录。
- **安全认证**：通过JWT进行用户认证和权限管理，确保数据安全与用户隐私。
- **互动性强**：通过评论、点赞、分享等多种形式，增强了用户之间的互动性与社区活跃度。

#### 内容模块特色
- **多元化内容展示**：支持多种内容展示方式，包括问题、回答、评论等，满足不同用户需求。
- **智能推荐**：通过关注与热榜功能，推荐用户感兴趣的内容。
- **问题与答案聚合**：问题与答案相互关联，确保用户能快速找到相关内容。


### 4. 未来功能与改进方向

欢迎有兴趣的开发者参与扩展（可通过fork参与贡献）：
- **智能AI助手**：集成AI技术，打造自动化问答与智能内容推荐系统，提升平台的智能化程度和用户互动质量。
- **全文搜索功能**：实现高效的全文检索，便于用户快速找到所需内容。
- **用户收藏与动态分享**：允许用户收藏感兴趣的内容并分享个人动态，增强用户参与度。
- **实时推送关注问题的最新回答**：自动推送用户关注问题的最新回答，提升信息时效性。
- **回答点赞与评论互动通知**：完善互动机制，让用户能够及时收到点赞和评论的通知。

---

### 5. 效果展示


#### 详细提示的用户模块

| 示例 1 | 示例 2 | 示例 3 |
| --- | --- | --- |
| ![Image 1](https://github.com/user-attachments/assets/1cf546cd-0600-41df-bdbb-01f2ab00a9f2) | ![Image 2](https://github.com/user-attachments/assets/c1310582-74ed-4018-9b1f-26d2681c8510) | ![Image 3](https://github.com/user-attachments/assets/5aaf3332-95f4-4ee7-a0f0-40cc5b4ba6da) |

PS：用户密码通过MD5进行加密存储。


|  支持自定义个人信息 |修改账号信息 |
| --- | --- |
| ![Image 1](https://github.com/user-attachments/assets/2ed57e85-589e-463d-8fc7-450f5983a2e8) | ![Image 2](https://github.com/user-attachments/assets/f756d510-2efa-4582-b576-d1ce7ad6da93) |


#### 多样的CSS动画展示

请求文章时有动画展示（4种），若请求失败会出现错误提示，文章内容过长也可点击右下角火箭以动画形式滑到顶部。
<center>
  <img src="https://github.com/user-attachments/assets/49c86727-8a6e-4a85-bbd9-d4641c95a965" alt="列表加载动画">
</center>

<center>
 <img src="https://github.com/user-attachments/assets/b395a2cd-3613-4d28-94a7-1c2e44727528" height="400px" alt="回到顶部动画"> 
</center>

<center>
 <img src="https://github.com/user-attachments/assets/42f71cfd-afd4-4c2a-b1bf-c1817e677775" alt="文章详情页动画">
</center>


#### 实时渲染且安全的markdown预览

用户发布文章或回答时均支持markdown语法，并可以通过实时渲染了解自己即将发布的效果。

![image](https://github.com/user-attachments/assets/fa549426-2dea-4a14-a068-fce57a1c563d)

用户输入的文章内容都会经过校验，若存在可能导致XSS等攻击的问题，则会提示用户。封面图片的上传中也对文件类型与大小做出了相应的限制。

![image](https://github.com/user-attachments/assets/540380fe-95bb-4827-aa8a-ede59f089394)


![image](https://github.com/user-attachments/assets/eefd89b1-68f8-4966-8b50-e3b21bdc245f)

当然，也支持从本地上传文件，可以单独设置文章的封面。

![image](https://github.com/user-attachments/assets/fc8a4667-fac7-49d2-ace2-fafb7c800901)

#### 多样文章卡片与展示布局

**关注**文章的卡片列表需要展示用户的发布时间，发布类型（文章或者问题），标题以及内容。若文章内容超过3行，则利用省略号隐藏。

![image](https://github.com/user-attachments/assets/8351ed04-53f7-4bc3-8822-815de6872c9c)

与关注模块卡片不同的是，**推荐**模块中不需要展示用户的信息，只需要以赞同次数来展示文章，同时微调卡片布局即可。“推荐文章”的交互盒子可以复用“关注文章”的交互盒子。 实现效果如下：若文章赞同数为0，则将最后的按钮切换为举报按钮，若文章赞同数大于1，则将最后的按钮切换为喜欢按钮。

![image](https://github.com/user-attachments/assets/c5b6b989-ca33-460d-91e9-2a1b14ed95a8)

**热榜**文章需要有排名，排名前三呈现橙色，后续为黑色。热榜根据热度进行排序，其中热度上万则保留两位小数，以万为单位。右侧显示较大的封面图。

![image](https://github.com/user-attachments/assets/c37e26fd-afd1-4949-836c-448631b7d0ae)

**基础的文章**布局为多行一列模式，从上至下依次为话题标签（可以多个），文章标题，用户信息，文章内容，时间以及交互盒子。通过标准流的形式布局即可实现该效果。

![image](https://github.com/user-attachments/assets/e58cacea-4efb-4602-9463-5e16f143d97d)

**“问题”类型**展示时隐藏用户的基本信息，同时下方的交互盒子内容需要做出对应的修改，如“赞同”改成“好问题”等等。若用户发布的时候增加了封面图，则在底部居中位置展示封面图片。展示效果如下：

![image](https://github.com/user-attachments/assets/8159801b-72ef-41eb-85c9-2bc29e8ef09e)

**回答卡片**

![image](https://github.com/user-attachments/assets/dd4a1715-f643-4af4-88ce-abfe7aa6d138)

**评论卡片**

![image](https://github.com/user-attachments/assets/50ff9239-c2d8-4de9-b51c-98b1e03e05a8)

以及后续被废弃的视频卡片等等。


## 更新内容

> 后续功能实现缺失截图记录。

- 内容方面：
  1. 新增可编辑发布的**选择题卡片**。
  2. 优化原“知乎”图标为自定义特色图标。
  3. 修改个人主页设置样式，优化用户体验。
  4. 编辑组件引入maven-editor，增加可实时修改的工具栏。
  5. 引入音乐唱片。
  6. 去除无用的视频卡片，修改为展示视频。
  7. 实现分享链接,点击按钮后自动拷贝链接内容到剪贴板。

- 性能方面：
  1. 登录，导航组件减少外部样式资源引入。减少打包后的app.css样式资源大小。
  2. 用户信息修改将传入数据库的Base64转码URL 修改为 通过七牛云接口获取图片外链的URL。减少数据库负载与网络请求数据量。
  3. 路由懒加载：减少打包后的JS包体积，路由访问才加载对应组件。（代价：切换组件时有加载时间）
  4. 去掉编译文件中的map文件。 config/index.js --->productionSourceMap
  5. cdn方式引入第三方库：element-ui，vuex，vue-router。配置webpack.config.js中externals:减少import，打包后vendor.js体积减少0.7MB。
  
- 代码结构：
  1. 增加views，以及components目录下的内容划分。
  2. 逐步修改各个组件的CSS样式，尽可能达到响应式的布局。（DOING）


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
