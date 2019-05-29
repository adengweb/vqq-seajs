define('common', ['jquery'], function(require, exports, module) {
  var $ = require('jquery');
  var __common = {
    tool: {
      htmlArt: function(tmplId, data, callback) { // 模版id,data,回调
        if (__common.tool.htmlArt) { //判断是否已经加载模版引擎,如果有加载直接使用render方法
          // template.render(source, options)
          var html = template.render(tmplId, data);
          callback(html, data);
        } else {
          seajs.use('template', function(template) {
            var html = template(tmplId, data);
          });
        }
      }
    },

    header: function() {
      //频道下拉
      var _channel_timer = null;
      $('.j_channel').on('mouseover',function(e){ // 移动到a上菜单显示
        clearTimeout(_channel_timer); //移动上去先清除定时器不然会重复开启bug
        $('.j_channelPop').removeClass('g-hide');
      });
      $('.j_channel').on('mouseout',function(e){ // 移开到a上菜单隐藏,开启一个定时器来处理鼠标移开就隐藏的Bug
        _channel_timer = setTimeout(function(){
          $('.j_channelPop').addClass('g-hide');
        }, 200);
      });
      $('.j_channelPop').on('mouseover', function(e) { // 移动到菜单模块,清除a移开时候的定时器
        clearTimeout(_channel_timer);
      });
      $('.j_channelPop').on('mouseout',function(e){
        _channel_timer = setTimeout(function(){
          $('.j_channelPop').addClass('g-hide');
        }, 200);
      });

      // 操作菜单下拉
      var _item_timer2 = null;
      $(document).on('mouseover','.j_optionItems', function(e) {
        $('.j_optionPops').addClass('g-hide');  // 先清除掉弹层模块，在做添加处理
        clearTimeout(_item_timer2);
        $(this).find('.j_optionPops').removeClass('g-hide');
      });
      $(document).on('mouseout','.j_optionItems',function(e){
        var that = this;
        _item_timer2 = setTimeout(function(){
          $(that).find('.j_optionPops').addClass('g-hide');
        }, 200);
      });

      // 搜索
      $('.j_searchText').on('focus', function(e) {
        $('.j_csearchPop').removeClass('g-hide');
        e.preventDefault();
      });
      $('.j_searchText').on('focusout', function(e) {
        $('.j_csearchPop').addClass('g-hide');
        e.preventDefault();
      });
    },
    init: function() {
      this.header();
      
    }
  };
  module.exports = __common;
});
