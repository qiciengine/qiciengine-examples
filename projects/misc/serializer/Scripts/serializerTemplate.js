var s = qc.Serializer;

var serializeTemplate = qc.defineBehaviour('serializeTemplate', qc.Behaviour, function() {
    var t = this;
    t.intValue = 0;
    t.intsValue = [];
    t.numberValue = 0.5;
    t.numbersValue = [];
    t.booleanValue = true;
    t.booleansValue = [];
    t.stringValue = 'hello world';
    t.stringsValue = [];
    t.mappingValue = { 'hello' : 'world' };
    t.textureValue = null;
    t.texturesValue = [];
    t.audioValue = null;
    t.audiosValue = [];
    t.colorValue = new qc.Color(0xffff0000);
    t.colorsValue = [];
    t.prefabValue = null;
    t.prefabsValue = [];
    t.nodeValue = null;
    t.nodesValue = [];
    t.geomValue = null;
    t.rectValue = null;
    t.circleValue = null;
    t.ellipseValue = null;
    t.xValue = 0.32;
    t.yValue = 0.48;
    t.zValue = 0.2;
}, {
    intValue : s.INT,
    intsValue : s.INTS,
    numberValue : s.NUMBER,
    numbersValue : s.NUMBERS,
    booleanValue : s.BOOLEAN,
    booleansValue : s.BOOLEANS,
    stringValue : s.STRING,
    stringsValue : s.STRINGS,
    mappingValue : s.MAPPING,
    textureValue : s.TEXTURE,
    texturesValue : s.TEXTURES,
    audioValue : s.AUDIO,
    audiosValue : s.AUDIOS,
    colorValue : s.COLOR,
    colorsValue : s.COLORS,
    prefabValue : s.PREFAB,
    prefabsValue : s.PREFABS,
    nodeValue : s.NODE,
    nodesValue : s.NODES,
    geomValue : s.GEOM,
    rectValue : s.RECTANGLE,
    circleValue : s.CIRCLE,
    ellipseValue : s.ELLIPSE,
    customValue : {
        get : function(ob) {
            return [ ob.xValue, ob.yValue, ob.zValue ];
        },
        set : function(ob, v) {
            if (v && v.length) {
                ob.xValue = v[0];
                ob.yValue = v[1];
                ob.zValue = v[2];
            }
        }
    }
});
