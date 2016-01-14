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