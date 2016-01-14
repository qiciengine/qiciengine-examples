/**
 * @author weism
 * copyright 2015 Qcplay All Rights Reserved.
 */

var Login = qc.defineBehaviour('qc.demo.Login', qc.Behaviour, function() {
    this.accountInput = null;
    this.passwordInput = null;
}, {
    accountInput: qc.Serializer.NODE,
    passwordInput: qc.Serializer.NODE
});

Login.prototype.onClick = function() {
    var account = this.accountInput.text,
        password = this.passwordInput.text;
    console.log('account', account);
    console.log('password', password);
    alert('account=' + account);
    alert('password=' + password);

    // Clear
    this.accountInput.text = '';
    this.passwordInput.text = '';
};