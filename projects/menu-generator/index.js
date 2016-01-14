/**
 * @author liyk
 * @copyright 2015 Qcplay All Rights Reserved.
 */
    
var generator = require('./demo-generator.js');
// 先将../menu_zh清空，再将模板拷贝过去，然后在../menu_zh中生成必要的数据
generator.generate('zh', '../menu_zh');

// 先将../menu_en清空，再将模板拷贝过去，然后在../menu_en中生成必要的数据
generator.generate('en', '../menu_en');