;(function($){

    var info = {     

        init: function(){
            this.smoothScrollFn();
            this.scrollEventFn();
            this.navFn();
            this.resizeFn();
            this.section1Fn();
            this.section2Fn();
            this.section3Fn();
            this.section4Fn();
            this.footerFn();
        },


        smoothScrollFn:function(){
            var smoothBtn = $('.smoothBtn');
            var $scrollTopBtn = $('.scroll-top-btn');
            var t = 0;

            smoothBtn.on({
                click:function(e){
                  e.preventDefault();
                  var url = $(this).attr('href');
                  $('html,body').stop().animate({scrollTop: $( url ).offset().top},600);
                }
              });

              $(window).scroll(function(){
                if( $(this).scrollTop()>=100){
                  if(t==0){
                    t=1;
                    $scrollTopBtn.stop().fadeIn(1000);
                  }
                }
                else{
                  if(t==1){
                    t=0;
                    $scrollTopBtn.stop().fadeOut(1000);
                  }
                }
              });





        },
        scrollEventFn:function(){
 
        },
      
        navFn:function(){
          var $mobileBtn = $('.mobile-btn');
          var $navWrap   = $('.nav-wrap');
          var $mainBtn   = $('.main-btn');
          var $bar       = $('.mobile-btn-wrap .bar');

          $mobileBtn.on({
              click:function(e){
                e.preventDefault();
                $navWrap.toggleClass('addNav');
                $bar.toggleClass('addMobile');
              }
          });
          $mainBtn.on({
                  click:function(){
                      $mainBtn.removeClass('addCol');
                      $mainBtn.find('span').removeClass('addCol');

                      $(this).addClass('addCol');
                      $(this).find('span').addClass('addCol');
                  }
              })


        },
        resizeFn:function(){
          var $window = $(window);
          var $winW = $(window).width();
          var $winH = $(window).height();
          var $section1 = $('#section1');

          function resizeFn(){
            $winW = $(window).width();
            $winH = $(window).height(); 

            $section1.css({width:$winW, height:$winH});
        }
            resizeFn();
            setTimeout(resizeFn, 100);

            $window.resize(function(){                
                setTimeout(resizeFn,100);
            });
        },

        section1Fn:function(){
        },

        section2Fn:function(){
          var col = $('#section2 .container>ul>li');
          var t = 0;

          function fadeInFn(){
            col.eq(0).stop().animate({opacity:1},800, function(){
              col.eq(1).stop().animate({opacity:1},800, function(){
                col.eq(2).stop().animate({opacity:1},800) 
              });
            });
          }
          fadeInFn();

          $(window).scroll(function(){
            if($(this).scrollTop() == 0){
              t=0;
              col.stop().animate({opacity:0},0);
            }

            if($(this).scrollTop() >= 400){
              if( t==0){
                t=1;
                fadeInFn();
              }
            }
          });
        },

        section3Fn:function(){
          var circle = $('.circle');
          var number =  $('.number');          
          var totLen = [];
          var percent = [.95, .95, .90, .70]; //93%
          var second = 5;    //4초
          var perLen = [];
          var piece = []; //초당 길이 마디
          var cnt = [0, 0, 0, 0]; //누적변수는 반드시 초기값 설정
          var setId = [];
          var $section3Top = $('#section3').offset().top;
          var t=0;

          function fadeInFn(){
              $.each(circle, function(idx, obj){
                  totLen[idx] = Math.ceil( obj.getTotalLength() ); 
                  
                  obj.style.strokeDasharray = totLen[idx];
                  obj.style.strokeDashoffset = totLen[idx];
                  

                  // console.log( 'totLen[' + idx + ']', totLen[idx] );
                  
                  perLen[idx] = totLen[idx] * percent[idx];

                  // console.log( ' percent['+idx+']' ,  percent[idx] );
                  // console.log( 'perLen['+idx+']' , perLen[idx] );

                  piece[idx] = (perLen[idx]/second)/100; //0.01초 에 한마디
                  // console.log( 'piece['+idx+']', piece[idx] );



                  setId[idx] = setInterval(countFn, 10);
                  function countFn(){
                      cnt[idx] += piece[idx];

                      // console.log( 'cnt['+idx+']', cnt[idx] );

                      if( cnt[idx] > perLen[idx] ){ //93% 길이를 초과하면 끝
                        clearInterval( setId[idx] );
                      }
                      else{
                        $(obj).css({ strokeDashoffset: totLen[idx]-cnt[idx] }); //원형 라인이 그려진다.
                        number.eq(idx).html( Math.ceil(cnt[idx]/totLen[idx]*100) + '%' ); //현재의 길이/총길이 
                      }
                  }
              });
            }

            $(window).scroll(function(){
              if($(this).scrollTop() == 0){
                t=0;
                cnt = [0, 0, 0, 0];
              }
  
              if($(this).scrollTop() >= 400){
                if( t==0){
                  t=1;
                  fadeInFn();
                }
              }
            });
        },

        section4Fn:function(){
          var $a = $('#section4 .cube-btn');
          var $slideWrap = $('#slide3d .slide-container .slide-view .slide-wrap');
          var $slideW = $('#slide3d .slide').innerWidth();
          var n = $('#slide3d .slide').length;
          var cnt = 0;
          var tz = 0;

          tz = Math.round( ($slideW/ 2 ) / Math.tan(Math.PI / n));

          function SlideFn(){
            $slideWrap.css({transform:'perspective('+ (tz*2) +'px) translateZ('+ (-tz) +'px) rotateY('+ (-90*cnt) +'deg)'});
          }

          $a.each(function(idx){                  
            $(this).on({ 
              click:  function(){

                if(cnt > idx ){ 
                  cnt = idx; 
                  SlideFn();
                }
                else if(cnt<idx) { 
                  cnt = idx; 
                  SlideFn();
                }
              }
            });
          });
        },
        footerFn:function(){

        }
    } //객체 끝


    info.init();

})(jQuery);