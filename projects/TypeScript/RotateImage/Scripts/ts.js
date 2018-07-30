var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var qc;
(function (qc) {
    var demo;
    (function (demo) {
        var Test = (function (_super) {
            __extends(Test, _super);
            function Test(gameObject) {
                _super.call(this, gameObject);
                this.serializableFields = {
                    clue: qc.Serializer.STRING
                };
                // Init the behaviour
                this.clue = 'Hello';
            }
            Test.prototype.onClick = function (e) {
                alert(this.clue);
            };
            Test.prototype.update = function () {
                this.gameObject.rotation += 0.2;
            };
            return Test;
        })(qc.Behaviour);
        demo.Test = Test;
        qc.registerBehaviour('qc.demo.Test', Test);
    })(demo = qc.demo || (qc.demo = {}));
})(qc || (qc = {}));
//# sourceMappingURL=ts.js.map