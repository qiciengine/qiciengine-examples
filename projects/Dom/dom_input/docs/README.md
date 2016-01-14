# DomInput

* 实例演示Dom节点响应点击事件。效果图如下：<br>
![DomInput](images\UI.gif)

## UI

* 在新建场景中创建一个Dom节点，设置节点大小为(200,200)，并设置居中显示。
* 创建脚本DomClick.js，负责显示dom点击事件响应。脚本挂在dom节点上。<br>
代码如下：<br>

```javascript
var DomClick = qc.defineBehaviour('qc.demo.DomClick', qc.Behaviour, function() {
}, {
});

DomClick.prototype.awake = function() {
    this.gameObject.div.style.background = 'red';
    
    this.gameObject.div.innerHTML = '<div style="background:white; width:100px; height:100px;" onClick="alert(1);">hello</div>'
};

DomClick.prototype.onClick = function() {
    alert('OnClick!');
};
```