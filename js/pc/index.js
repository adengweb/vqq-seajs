define('index', ['jquery'], function(require, exports, module) {
  var $ = require('jquery');
  var __index = {
    // 轮播图
    slide: function(){
      var _timr = null;
      var _timeSlide = function(_index){
         var _imgLength = $('.j_slide .slide-title ul li a').length;
         _timr = setInterval(function(){
          if(_index < _imgLength - 1){
            _index ++;
          }else{
            _index = 0;
          }
          // 先清除
          $('.j_slide .slide-title ul li a').removeClass('cur');
          $('.j_slide .slide-img ul li').css({'opacity':0});
          //在添加对应位置的样式
          $('.j_slide .slide-title ul li a').eq(_index).addClass('cur');
          $('.j_slide .slide-img ul li').eq(_index).css({'opacity':1});
         },3000);
      }
      $.ajax({
        type: "get",
        url: "http://www.yinyuetai.com/mv/get-bigpic",
        dataType:"jsonp",
        success: function(data){
         _slideJson = data.bigPics;
         var _index = 0;
         for(var i=0; i < 8; i++){
          var _imghtml = '<li style=" position: absolute; left: 0; top: 0; width: 100%; opacity: 0;"><a href="'+_slideJson[i].url+'" target="_blank"><img src="http:'+_slideJson[i].image+'" width="100%" alt="'+_slideJson[i].title+'"></a></li>';
          var _texthtml = '<li><a href="javascript:;" data-to="'+i+'">'+_slideJson[i].title+'</a></li>';
          $('.j_slide .slide-img ul').append(_imghtml);
          $('.j_slide .slide-title ul').append(_texthtml);
         }

         $('.j_slide .slide-img ul li').eq(_index).css({'opacity':1});
         $('.j_slide .slide-title ul li a').eq(_index).addClass('cur');
         for(var i=0; i < $('.j_slide .slide-title ul li a').length; i++){
          $('.j_slide .slide-title ul li a').eq(i).on('mouseover',function(){
            _index = $(this).attr('data-to');
            $('.j_slide .slide-title ul li a').removeClass('cur');
            $('.j_slide .slide-img ul li').css({'opacity':0});
            if(!$(this).hasClass('cur')){
              $(this).addClass('cur');
              $('.j_slide .slide-img ul li').eq(_index).css({'opacity':1});
            }
          });
         }

         _timeSlide(_index); // 开启定时器

         $('.j_slide').on('mouseover',function(){
            clearInterval(_timr); 
          });
         $('.j_slide').on('mouseout',function(){
            _timeSlide(_index);
          });

        }
      });
    },
    // 为你精选
    hotList: function(){ 
      $.ajax({
        type: "get",
        url: "http://www.yinyuetai.com/mv/get-first-video?area=all&size=6",
        dataType:"jsonp",
        success: function(data){
         _hotJson = data;
         var _listBox = $('.j_hotListBox');
         var bigietm = '<div class="V-item"><a href="'+_hotJson.bigPics[0].url+'" class="v-link" target="_blank"><div class="v-img"><img src="http:'+_hotJson.bigPics[0].image+'" alt="'+_hotJson.bigPics[0].title+'"></div><i class="v-font">&#xe63d;</i><div class="v-info-lay"><div class="v-title">'+_hotJson.bigPics[0].title+'</div><div class="v-intro">'+_hotJson.bigPics[0].content+'</div></div></a></div>';
         _listBox.find('.mod-V-big').append(bigietm);

         for(var i=0; i < _hotJson.videos.length; i++){
           var vitem = '<div class="V-item"><a href="http://v.yinyuetai.com/video/'+_hotJson.videos[i].videoId+'" class="v-link" target="_blank"><div class="v-img"><div class="v-img"><img src="http:'+_hotJson.videos[i].image+'" alt="'+_hotJson.videos[i].title+'"></div></div><i class="v-font">&#xe63d;</i></a><div class="v-info"><div class="v-title"><a href="'+_hotJson.videos[i].url+'">'+_hotJson.videos[i].title+'</a></div><div class="v-intro">'+_hotJson.videos[i].artists[0].artistName+'</div></div></div>';
           _listBox.find('.mod-V-small .v-list').append(vitem);
         }
        }
      });

    },
    // 娱乐
    recList: function(){
      $.ajax({
        type: "get",
        url: "http://www.yinyuetai.com/mv/get-rec?cataId=3&withBigImg=true&size=6",
        dataType:"jsonp",
        success: function(data){
         _recJson = data;
         var _listBox = $('.j_recListBox');
         var bigietm = '<div class="V-item"><a href="'+_recJson.priModule.url+'" class="v-link" target="_blank"><div class="v-img"><img src="http:'+_recJson.priModule.image+'" alt="'+_recJson.priModule.title+'"></div><i class="v-font">&#xe63d;</i><div class="v-info-lay"><div class="v-title">'+_recJson.priModule.title+'</div><div class="v-intro">'+_recJson.priModule.content+'</div></div></a></div>';
         _listBox.find('.mod-V-big').append(bigietm);

         for(var i=0; i < _recJson.details.length; i++){
           var vitem = '<div class="V-item"><a href="http://v.yinyuetai.com/video/'+_recJson.details[i].videoId+'" class="v-link" target="_blank"><div class="v-img"><div class="v-img"><img src="http:'+_recJson.details[i].image+'" alt="'+_recJson.details[i].title+'"></div></div><i class="v-font">&#xe63d;</i></a><div class="v-info"><div class="v-title"><a href="'+_recJson.details[i].url+'">'+_recJson.details[i].title+'</a></div><div class="v-intro">'+_recJson.details[i].artists[0].artistName+'</div></div></div>';
           _listBox.find('.mod-V-small .v-list').append(vitem);
         }
        }
      });
    },
    // 热播推荐
    recommendList: function(){
      $.ajax({
        type: "get",
        url: "http://www.yinyuetai.com/mv/get-guess?size=5",
        dataType:"jsonp",
        success: function(data){
         _recommendJson = data;
         var _listBox = $('.j_recommendList');

         for(var i=0; i < _recommendJson.video.length; i++){
           var vitem = '<div class="V-item"><a href="http://v.yinyuetai.com/video/'+_recommendJson.video[i].videoId+'" class="v-link"><div class="v-img"><img src="http:'+_recommendJson.video[i].image+'" alt="'+_recommendJson.video[i].title+'"></div><i class="v-font">&#xe63d;</i><div class="v-info-lay"><div class="v-title">'+_recommendJson.video[i].title+'</div></div></a><div class="v-info"><div class="v-title"><a href="#">'+_recommendJson.video[i].artists[0].artistName+'</a></div><div class="v-measure">播放量：'+_recommendJson.video[i].videoId+'</div></div></div>';
           _listBox.append(vitem);
         }
        }
      });
    },
    movieList: function(){
      
      $.ajax({
        type: "get",
        url: "http://www.yinyuetai.com/mv/get-playlist?size=10",
        dataType:"jsonp",
        success: function(data){
         _movieJson = data;
         var _listBox = $('.j_movieList');

         for(var i=0; i < _movieJson.playlists.length; i++){
           var vitem = '<div class="V-item"><a href="'+_movieJson.playlists[i].url+'" class="v-link"><div class="v-img"><img src="http:'+_movieJson.playlists[i].image+'" alt="'+_movieJson.playlists[i].title+'"></div><div class="v-info-lay"><div class="v-title">'+_movieJson.playlists[i].person.userName+'</div></div></a><div class="v-info"><div class="v-title"><a href="'+_movieJson.playlists[i].url+'">'+_movieJson.playlists[i].title+'</a></div></div></div>';
           _listBox.append(vitem);
         }
        }
      });
    },
    init: function() {
      this.slide();
      this.hotList();
      this.recList();
      this.recommendList();
      this.movieList();
    }
  };
  module.exports = __index;
});
