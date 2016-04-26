/**
 * Created by Administrator on 2016-01-11.
 */
$(function(){
   $('.btn').click(function(){
        $('.menu ul').finish().slideToggle(500);

      if($('.banner').css('display')=='block'){
          $('.head').css('background','#000');
      }else{
          $('.head').css('background','#333');
      }
       $('.banner,.out,footer,.shop').finish().toggle(1);

   });

    $('.col p').click(function () {
        if($(window).width()>736){
            return false;
        }
        $(this).css({'color':'#222','font-weight':'bold'});
        if($(this).next().css('display')=='block'){
            $(this).css({'font-weight':'normal'});
        }
        $(this).next().finish().slideToggle(500);
    });

    var num=0;
    var t=setInterval(move,3000);
    function move(){
        num++;
        if(num==$('.big .small').length-1){
            $('.banner .nav-bar li').eq(0).addClass('hot').siblings().removeClass('hot');
        }else{
            $('.banner .nav-bar li').eq(num).addClass('hot').siblings().removeClass('hot');
        }
        $('.banner .big').animate({marginLeft:-num*100+'%'},300, function () {
            if(num==$('.big .small').length-1){
                $('.banner .big').css('marginLeft',0);
                num=0;
            }
        });
    }
    $('.banner').hover(function(){
        clearInterval(t);
    }, function () {
        t=setInterval(move,3000);
    });
    $('.banner .nav-bar li').click(function () {
        $(this).addClass('hot').siblings().removeClass('hot');
        num=$(this).index();
        $('.banner .big').finish().animate({marginLeft:-num*100+'%'},300);
    })

    $('.search').click(function () {
        $(this).removeClass('col-m-1').addClass('col-m-7').css('background-position','90px 0').siblings('.col-s-h').hide(1);
        $('.search input').show(1);
        $(this).next().html('×').css({'background-size':'0'}).click(function(){
            $('.search').addClass('col-m-1').removeClass('col-m-7').css('background-position','center').siblings('.col-s-h').show(1);
            $('.search input').hide(1);
            $(this).html('&nbsp;').css({'background-size':'auto'})
        });
    });


    var margin;

    touch.on('.big','dragstart',function(e){
        margin=parseInt($('.big').css('marginLeft'));
        if(margin==0&& e.x>0){
            $('.big').css('marginLeft',-($('.big .small').length-1)*100+'%');
            margin=parseInt($('.big').css('marginLeft'));  
           //right();
        }
    });
    touch.on('.big','drag',function(e){
        $('.big').css('marginLeft',margin+e.x);
    });
    touch.on('.big','dragend',function(e){
        if(Math.abs(e.x)>300|| e.factor<5){
            if(e.direction=='left'){
                move()
            }
            else if(e.direction=='right'){
               num--;
              if(num==-1){
                  num=$('.big .small').length-1;
                  num--;
                  $('.big').css('marginLeft',-(num+1)*100+'%').animate({'marginLeft':-num*100+'%'},300);
              }else{
                  $('.big').finish().animate({'marginLeft':-num*100+'%'},300);
              }
               $('.banner .nav-bar li').eq(num).addClass('hot').siblings().removeClass('hot');
            }
        }else{
            $('.banner .big').animate({marginLeft:-num*100+'%'},300);
        }
    });
    function right(){
        num--;
        if(num==-1){
            num=$('.big .small').length-1;
            num--;
            $('.big').css('marginLeft',-(num+1)*100+'%').animate({'marginLeft':-num*100+'%'},300);
        }else{
            $('.big').finish().animate({'marginLeft':-num*100+'%'},300);
        }
        $('.banner .nav-bar li').eq(num).addClass('hot').siblings().removeClass('hot');
    }
    //touch.on('.big','swiperight',right);
    $('.big').mousedown(function (e) {
        e.preventDefault();
    })
    var bannerbox=$(".banner");
    var banner=$('.bannerimg');
    var as=$(".bannerimg a");
    //console.log(as)
    var now=0;
    var next=0;
    var flag=true;
    $(".bannerimg a:first-child").css("left",'0');
    var t=setInterval(move,1000);
    function move() {
        if (!flag) {
            return
        };
        flag = false;
        next++;
        if (next == as.length) {
            next = 0;
        };
        //console.log(next);
        as.eq(next).css({left: "100%"});
        as.eq(now).animate({left: "-100%"});
        as.eq(next).animate({left: 0}, function () {
            flag = true;
        })
        $('.btn li').removeClass("ht").eq(next).addClass("ht");
        now = next;
    };
    $('.btn li').click(function(){
        if(now==$(this).index()||!flag){
            return;
        }
        if($(this).index()<now){
            as.eq($(this).index()).animate({left:0});
            as.eq(now).animate({left:"100%"});
        }else{
            flag=false;
            as.eq($(this).index()).css({left:"100%"});
            as.eq(now).animate({left:"-100%"},function(){
                flag=true;
            });
            as.eq($(this).index()).animate({left:0});
        }
        $('.btn li').removeClass('ht').eq($(this).index()).addClass('ht');
        now=next=$(this).index();
    });

    bannerbox.hover(function(){
        clearInterval(t);
        $('.btn2 a').css('display','block');
    },function(){
        t=setInterval(move,1000);
        $('.btn2 a').css('display','none');
    });
    var rbtn=$(".rbtn");
    var lbtn=$(".lbtn");
    $('.rbtn').click(function(){
        move();
    });

    lbtn.click(function(){
        if(!flag){return};
        flag=false;
        next--;
        if(next==-1){
            next=as.length-1;
        }
        as.eq(next).css({left:"-100%"});
        as.eq(now).animate({left:"100%"});
        as.eq(next).animate({left:0},function(){
            flag=true;
        });
        $('.btn li').removeClass('ht').eq(next).addClass('ht');
        now=next;
    })





});