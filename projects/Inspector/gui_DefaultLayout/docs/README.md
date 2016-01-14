# defaultLayout 

* 实例演示创建默认的Inspector面板。效果图如下:<br>
![defaultLayout](images\gui.png)

## Editor

* 创建脚本GUI.js，编辑Inspector面板的属性。<br>
代码如下：<br>

```javascript
// define a user behaviour
var GUI = qc.defineBehaviour('qc.engine.GUI', qc.Behaviour, function() {
}, {
    int: qc.Serializer.INT,
    ints: qc.Serializer.INTS,
    number: qc.Serializer.NUMBER,
    numbers: qc.Serializer.NUMBERS,
    boolean: qc.Serializer.BOOLEAN,
    booleans: qc.Serializer.BOOLEANS,
    string: qc.Serializer.STRING,
    strings: qc.Serializer.STRINGS,
    mapping: qc.Serializer.MAPPING,
    texture: qc.Serializer.TEXTURE,
    textures: qc.Serializer.TEXTURES,
    audio: qc.Serializer.AUDIO,
    audios: qc.Serializer.AUDIOS,
	color: qc.Serializer.COLOR,
    colors: qc.Serializer.COLORS,
    prefab: qc.Serializer.PREFAB,
    prefabs: qc.Serializer.PREFABS,
    node: qc.Serializer.NODE,
    nodes: qc.Serializer.NODES,
	geom: qc.Serializer.GEOM,
	point: qc.Serializer.POINT,
    rect: qc.Serializer.RECTANGLE,
    circle: qc.Serializer.CIRCLE,
    ellipse: qc.Serializer.ELLIPSE,
	font: qc.Serializer.FONT,
    fonts: qc.Serializer.FONTS,
    textAsset: qc.Serializer.TEXTASSET,
    excelAsset: qc.Serializer.EXCELASSET
});
```

## UI

* 在新建场景中创建一个EmptyNode，在此节点下添加一个GUI组件(即上述自定义的GUI)，<br>
添加步骤：'AddComponent' **->** 'Scripts' **->** 'GUI'。效果图如下：<br>
![gui](images\gui.png)

