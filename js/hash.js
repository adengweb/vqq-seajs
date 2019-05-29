var ___h = {
  "jquery":"js/dep/jquery/jquery",
  "template":"js/dep/artTemplate/template.js",
  "common":"js/pc/common.js",
  "list":"js/pc/list.js",
  "index":"js/pc/index.js"
  
};
seajs.config({
  base:'../vqq-seajs/',
  alias: ___h,
  preload:['jquery'],
  comboMaxLength: 1000
});