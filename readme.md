##知乎日报Chrome
![知乎日报][1]
下载地址：[Chrome Web Store][2]

##使用
项目使用`bower`,`npm`, `gulp`构建。

```
bower install
npm install
```
通过以下`gulp`命令完成开发版本构建,直接在chrome引入当前目录就可以开发了。

```
gulp
```
开发完成需要发布时，通过以下命令完成代码压缩合并工作。

```
gulp build
```
并且将根目录的`backgroud.js`复制到`build`目录下,修改`var index = 'src/index.html'`为`var index = 'index.html'`。发布时只需发布`build`目录下文件即可。


###更新日志：


---------version: 2.9----------

+ 压缩合并代码
+ 添加主题日报编辑信息

---------version: 2.8----------

+ 添加推荐者信息
+ 添加滚动到顶部按钮

---------version: 2.7----------

+ 优化内容页图片显示

---------version: 2.6----------

+ 添加刷新按钮
+ 修复非知乎站内图片不能显示的bug
+ 单向绑定，优化性能

---------version: 2.5----------

+ 修复最新消息和过往消息重复的bug

---------version: 2.4----------

+ 添加主题日报

---------version: 2.3----------

+ 修复点击链接chrome崩溃的bug

---------version: 2.2----------

+ 修复轮播图滚动bug

---------version: 2.1----------

+ 重构
+ 使用知乎日报最新接口

---------version: 2.0----------

+ 使用Angularjs重构
+ 修复图片大小不一致的bug
+ 修复顶部轮播图
+ 默认最大化

---------version: 1.2----------

+ 修复日期bug

---------version: 1.1----------

+ 修复滚动到底部不能加载的bug

---------version: 1.0----------

+ 用jQuery写成第一个版本


###License
MIT


[1]:./screenshot.png
[2]:https://chrome.google.com/webstore/detail/知乎日报/gmhhhkgomcbijkigoakidcpobpioebej
[3]:https://github.com/angular-ui/bootstrap
[4]:https://github.com/sroze/ngInfiniteScroll
[5]:https://github.com/durated/angular-scroll/
