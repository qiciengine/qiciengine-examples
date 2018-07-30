/**
 * @author liyk
 * @copyright 2015 Qcplay All Rights Reserved.
 */

var args = process.argv;
if (args.length !== 5) {
    console.error('Invalid arguments');
    return;
}

var projectPath = args[2];
var dstDir = args[3];
var language = args[4];

var generator = require('./demo-generator.js');
generator.generate(projectPath, dstDir, language);