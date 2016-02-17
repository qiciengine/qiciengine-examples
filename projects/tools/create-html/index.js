/**
 * @author liyk
 * @copyright 2015 Qcplay All Rights Reserved.
 */

var args = process.argv;
if (args.length != 4) {
    console.error('Invalid arguments');
    return;
}

var generator = require('./project-index-generator.js');
generator.generate(args[2], args[3]);