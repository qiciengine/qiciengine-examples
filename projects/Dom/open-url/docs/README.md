# DomOpenUrl

* 实例演示Dom中的设置：innerHTML以及css配置，实现点击链接打开网页的效果。效果图如下：<br>
![DomOpenUrl](images\UI.gif)

## UI

* 在新建场景中创建一个Dom节点，设置ClassName为content，在InnerHTML的内容框输入：<br>

```
<h3>QICI Engine</h3>
WebSite: <a href="http://www.qiciengine.com" target="_blank">http://www.qiciengine.com</a><br>
<img src="http://www.qiciengine.com/Public/Front/images/logo.png">
```
* 设置css配置，创建脚本style.css，负责的dom显示风格。<br>
代码如下：<br>

```javascript
/* css for dom */
.content {
    color: white;
    font-size: 16px;
    padding: 5px;
    border: 1px solid red;
    line-height: 1.5;
    text-align: center;
}
.content h3 {
    color: green;
    font-weight: bold;
}
.content a { color: red; }
```