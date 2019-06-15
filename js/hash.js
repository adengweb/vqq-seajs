var ___h = {
  "jquery":"js/dep/jquery/jquery",
  "template":"js/dep/artTemplate/template.js",
  "common":"js/pc/common.js",
  "list":"js/pc/list.js",
  "index":"js/pc/index.js"
  
};
var BASE_URL = '//adeng.vip/act/seajs-vqq/';

seajs.config({
  base:'../vqq-seajs/',
  // base: BASE_URL,
  alias: ___h,
  preload:['jquery'],
  comboMaxLength: 1000
});