/**
 * Created by ShunFeng on 2017/5/12.
 */

$(function () {
    //获取元素
    var $coat = $('#auto-id-SaC78nLIwnhNsThK');
    //鼠标进入离开 显示隐藏
    $coat.on({
        mouseenter:function () {
            $(this).stop().animate({top:-53},500);
        },
        mouseleave:function () {
            $(this).stop().animate({top:-7},500);
        }
    })
    //锁定功能
    $('.left.f-fl').on('click',function () {
        flag = $coat.hasClass('m-playbar-unlock');
        if(flag){
            $coat.removeClass('m-playbar-unlock').addClass('m-playbar-lock');
            $coat.off('mouseleave');
        }else{
            $coat.removeClass('m-playbar-lock').addClass('m-playbar-unlock');
            $coat.on('mouseleave',function () {
                $(this).stop().animate({top:-7},500);
            })
        }
    })
    //小锁功能 显示隐藏播放列表
    $('.icn.icn-list.s-fc3').on('click',function () {
        var $g_playlist = $('#g_playlist');
        if($g_playlist.css('display')=='none'){
            $g_playlist.css('display','block');
        }else{
            $g_playlist.css('display','none');
        }
    })
    //播放列表 列表点击
    $('.f-cb .z-sel').on('click',function () {

    })
    //加载歌曲列表
    var audioSrc = [{
        title:'把酒倒满',
        singer:'李晓杰',
        src:'mp3/bjdm.mp3',
        duration:'04:26',
        sm_img:'img/bjdm.jpeg'}, {
        title:'咱们结婚吧',
        singer:'李晓杰',
        src:'mp3/zmjhb.mp3',
        duration:'03:48',
        sm_img:'img/zmjhb.jpeg'}, {
        title:'安琥-天使的翅膀',
        singer:'李晓杰',
        src:'mp3/tsdcb.mp3',
        duration:'03:40',
        sm_img:'img/tsdcb.jpeg'}
        ];
    $.each(audioSrc,function (i,v) {
        $('<audio src="'+ v.src +'" singer = "'+ v.singer +'" title="'+v.title+'" ism_img="'+v.sm_img+'" duration = "'+v.duration+'"></audio>').appendTo('#music_src');
    });
    //获取当前歌曲标题信息 f-thide name fc1 f-fl
    $('.f-thide.name.fc1.f-fl').text($('audio').attr('title'));
    //获取当前歌曲歌手信息
    $('.by.f-thide.f-fl').find('a').text($('audio').attr('singer'));
    //获取当前歌曲图片信息
    $('.head.j-flag').children('img').attr('src',($('audio').attr('ism_img')));
    //当前播放歌曲
    var index = 0;
    //创建一个对象 用来存储当前播放对象
    var playMusic = $('#music_src').children().eq(index)[0];
    //全局变量 当前时间
    var currentTime = 0;
    //播放 暂停功能
    $('.ply.j-flag').on('click',function () {
        //获取当前歌曲标题信息 f-thide name fc1 f-fl
        $('.f-thide.name.fc1.f-fl').text($(playMusic).attr('title'));
        //获取当前歌曲歌手信息
        $('.by.f-thide.f-fl').find('a').text($(playMusic).attr('singer'));
        //获取当前歌曲图片信息
        $('.head.j-flag').children('img').attr('src',($(playMusic).attr('ism_img')));
        //检测当前播放状态
        if(playMusic.paused){
            $(this).addClass('pas');
            playMusic.play();
        }else{
            $(this).removeClass('pas');
            playMusic.pause();
        }
    })
    //下一曲
    $('.nxt').on('click',function () {
        //清空一些状态
        $('.cur').css('width',0);
        $('.rdy').css('width',0);
        //停止当前音乐
        playMusic.pause();
        //将当前音乐更改为下一个音乐
        index++;
        //当index值大于等于数据长度 则返回0；
        index = index>=$('#music_src').children().length?0:index;
        //赋值
        playMusic = $('#music_src').children().eq(index)[0];
        //重新加载
        playMusic.load();
        //触发播放按钮事件
        $('.ply.j-flag').trigger('click');
        //进度条事件
        $(playMusic).on('timeupdate',function () {
            var scales= playMusic.currentTime/playMusic.duration;
            $('.cur')[0].style.width = $('#auto-id-uC0qO1dVvechvZdl').width()*scales+'px';
            //缓冲进度条
            var scalesT = parseInt(playMusic.buffered.end(0))/playMusic.duration;
            $('.rdy').stop().animate({width:$('#auto-id-uC0qO1dVvechvZdl').width()*scalesT});
            //给当前播放时间 赋值
            $('.j-flag.time').html('<em>'+ timeJs(playMusic.currentTime) +'</em>&nbsp;/&nbsp;'+ timeJs(playMusic.duration) +'');
        });
        //监听播放状态 实现连续播放
        $(playMusic).on('ended',function () {
            if(playMusic.ended){
                $('.nxt').trigger('click');
            }
        })
    })
    //上一曲
    $('.prv').on('click',function () {
        //清空一些状态
        $('.cur').css('width',0);
        $('.rdy').css('width',0);
        //停止当前音乐
        playMusic.pause();
        //将当前音乐更改为上一个音乐
        index--;
        //当index值大于等于数据长度 则返回0；
        index = index<0?($('#music_src').children().length)-1:index;
        //赋值
        playMusic = $('#music_src').children().eq(index)[0];
        //重新加载
        playMusic.load();
        //触发播放按钮事件
        $('.ply.j-flag').trigger('click');
        //进度条事件
        $(playMusic).on('timeupdate',function () {
            var scales= playMusic.currentTime/playMusic.duration;
            $('.cur')[0].style.width = $('#auto-id-uC0qO1dVvechvZdl').width()*scales+'px';
            //缓冲进度条
            var scalesT = parseInt(playMusic.buffered.end(0))/playMusic.duration;
            $('.rdy').stop().animate({width:$('#auto-id-uC0qO1dVvechvZdl').width()*scalesT});
            //给当前播放时间 赋值
            $('.j-flag.time').html('<em>'+ timeJs(playMusic.currentTime) +'</em>&nbsp;/&nbsp;'+ timeJs(playMusic.duration) +'');
        })
        //监听播放状态 实现连续播放
        $(playMusic).on('ended',function () {
            if(playMusic.ended){
                $('.nxt').trigger('click');
            }
        })
    })
    //进度条事件
    $(playMusic).on('timeupdate',function () {
        var scales= playMusic.currentTime/playMusic.duration;
        $('.cur')[0].style.width = $('#auto-id-uC0qO1dVvechvZdl').width()*scales+'px';
        //缓冲进度条
        var scalesT = parseInt(playMusic.buffered.end(0))/playMusic.duration;
        $('.rdy').stop().animate({width:$('#auto-id-uC0qO1dVvechvZdl').width()*scalesT});
        //给当前播放时间 赋值
        $('.j-flag.time').html('<em>'+ timeJs(playMusic.currentTime) +'</em>&nbsp;/&nbsp;'+ timeJs(playMusic.duration) +'');
    })

    //进度条拖拽
    $('#auto-id-BLvQzO0DvcQAGZV4').on('mousedown',function () {
        //暂停当前音乐
        playMusic.pause();
        $(document).on({
            //鼠标进入事件
            mousemove:function (e) {
                var left = e.clientX - $('#auto-id-uC0qO1dVvechvZdl').offset().left;
                left = left>=$('#auto-id-uC0qO1dVvechvZdl').width()?$('#uto-id-uC0qO1dVvechvZdl').width():left;
                $('.cur').css('width',left);
            },
            //鼠标抬起事件
            mouseup:function () {
                var scales = $('.cur').width()/$('#auto-id-uC0qO1dVvechvZdl').width();
                //获得当前播放时间
                playMusic.currentTime = playMusic.duration*scales;
                //播放音乐
                playMusic.play();
                //重新赋值当前播放时间值
                $('.j-flag.time').children('em').text(timeJs(playMusic.currentTime));
                $(document).off();
            }
        })
    })
    //监听播放状态 实现连续播放
    $(playMusic).on('ended',function () {
        if(playMusic.ended){
            if($('.ctrl.f-fl.f-pr.j-flag').children('a').eq(1).hasClass('icn-shuffle')){
                //清空一些状态
                $('.cur').css('width',0);
                $('.rdy').css('width',0);
                //生成随机数
                var sj = parseInt(Math.random() * audioSrc.length);
                //赋值
                playMusic = $('#music_src').children().eq(sj)[0];
                //重新加载
                playMusic.load();
                //触发播放按钮事件
                $('.ply.j-flag').trigger('click');
            }else{
                $('.nxt').trigger('click');
            }
        }
    })
    //计算时间
    function timeJs(time) {
        var m = Math.floor(time/60);
        var s = Math.floor(time - m*60);
        m = m<10?('0'+m):m;
        s = s<10?('0'+s):s;
        var temp = m+':'+s;
        return temp;
    }
    //静音功能 muted 属性
    $('.icn.icn-vol').on('click',function () {
        if(playMusic.muted){
            playMusic.muted = false;
        }else{
            playMusic.muted = true;
        }
    })
    //设置循环模式
    $('.ctrl.f-fl.f-pr.j-flag').on('click',function () {
        var $icn = $(this).children('a').eq(1);
        //当类名为 icn-loop 时
        if($icn.hasClass('icn-loop')){
            //修改循环模式
            $icn.removeClass('icn-loop').addClass('icn-shuffle').attr('title','随机');
            $('.tip.tip-1').text('随机').show();
            setTimeout(function () {
                $('.tip.tip-1').css('display','none');
            },3000);
        }else if($icn.hasClass('icn-shuffle')){
            //修改循环模式
            $(playMusic).attr('loop');
            $icn.removeClass('icn-shuffle').addClass('icn-one').attr('title','单曲循环');
            $('.tip.tip-1').text('单曲循环').show();
            setTimeout(function () {
                $('.tip.tip-1').css('display','none');
            },3000);
        }else if($icn.hasClass('icn-one')){
            //修改循环模式
            $(playMusic).removeAttr('loop');
            $icn.removeClass('icn-one').addClass('icn-loop').attr('title','循环');
            $('.tip.tip-1').text('循环').show();
            setTimeout(function () {
                $('.tip.tip-1').css('display','none');
            },3000);
        }
    })
})

