# DomText

* 实例演示Dom显示文本内容。效果图如下：<br>
![DomText](images\UI.png)

## UI

* 在新建场景中创建一个Dom节点，设置节点大小为(300,300)，ClassName为content，InnerHTML的内容为:<br>

```
<h3>QICI Engine</h3>
Using QICI Engine you can create a HTML5 game in hours and days instead of weeks and months. 
It's a efficient web-based tool that accelerates your workflow. We take care of the essentials,
so you just focus on what's important - making your game
```
* 在Assets/css/目录下创建脚本style.css，负责dom文本内容的格式，代码如下：<br>

```javascript
/* css for dom */
.content {
    color: white;
    font-size: 16px;
    padding: 5px;
    border: 1px solid red;
    line-height: 1.5;
}
.content h3 {
    color: green;
}
```