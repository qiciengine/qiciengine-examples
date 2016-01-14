# 开关与单选组

* 本范例演示开关与单选组的使用。效果图如下：<br>
![](images\UI.png)

## UI

* UI分成三个部分：toggleGroup、singleToggle和showEvent。

### showEvnet

* 首先创建一个Text作为showEvent，用来显示当前开关或者单选组被点击的情况。

### toggleGroup

* 创建一个EmptyNode作为toggleGroup，在toggleGroup的节点上添加ToggleGroup组件。操作步骤：点击“AddComponent”->UI->ToggleGroup。
* 在toggleGroup的节点上创建4个Toggle，分别命名为Toggle1、Toggle2、Toggle3和Toggle4。
* 将创建的4个Toggle设置到ToggleGroup的属性里的toggles属性上。如下图：<br>
![](images\toggleGroup.png)

### singleToggle

* 在根节点下创建一个Toggle作为singleToggle。

## 添加脚本

* 创建脚本toggleEventShow.js，负责监控Toggle被点击触发事件的逻辑。脚本挂在根节点上。<br>
代码如下：<br>

```javascript
var toggleEventShow = qc.defineBehaviour('qc.toggleEventShow', qc.Behaviour, function() {

});

toggleEventShow.prototype.awake = function() {
    var ob = this.gameObject;
    var game = ob.game;
    var self = this;

    self._text = game.world.find('UIRoot/showEvent');
    self._single = game.world.find('UIRoot/singleToggle');
    self._group = game.world.find('UIRoot/toggleGroup').getScript('qc.ToggleGroup');

    self._events = [];

    var addToEvents = function(msg) {
        self._events.push(msg);

        if (self._events.length > 5)
            self._events = self._events.slice(-5);

        self._text.text = 'Event:\n' + self._events.join('\n');
    };

    self._single.onValueChange.add(function() {
        addToEvents('singleToggle has been clicked, current ' + (self._single.on ? 'on' : 'off'));
    });

    self._group.onValueChange.add(function(group, v) {
        addToEvents('toggleGroup has been clicked, ' +
            self._group.toggles.indexOf(v) + ' is on');
    });
};
```