$(function(){
    //头部点击效果改变
    $('.titles').removeClass('active');
    $('#tt_home').addClass('active');

    if($.cookie('type') == 'admin'){
        $('#menus').append('<div id="tt_manager" class="titles" data-target="manager" onclick="goToPage(this)"><span>管理</span></div>')
    }
})

//头部点击页面跳转
function goToPage(ele){
    var targetUrl = $(ele).attr('data-target');
    if(targetUrl == 'manager'){
        return window.open('/manager/index');
    }
    if(targetUrl == 'home'){
        return location.href = '/';
    }
    location.href = '/' + targetUrl + '/index';
}

//显示登录页面
function showLogin(){
    //var targetUrl = window.location.href;
    layer.open({
        type: 2,
        title: '登录',
        fix: false,
        area: ['600px', '400px'],
        content: '/login',
        success: function(){
        },
        end: function(){
            location.reload();
        }
    });
}

function popBy(obj,flag,message){
    $(obj).popover('destroy');
    $(obj).popover({
        placement:'bottom',
        trigger:'manual',
        content:message
    });
    if(!flag) {
        $(obj).popover('show');
        setTimeout(function(){$(obj).popover('hide');},3000);
        return false;
    }
    else {
        $(obj).popover('hide');
        return true;
    }
}

/*
* 格式化时间，nowdate参数必须为date格式——new Date()方法创建的时间对象
*          separator参数是string类型，规定年月日之间的分隔符,长度为1,如果长度不符，默认使用'/'
* */
function formatTime(nowdate,separator){
    if(separator.length > 1){
        separator = '/';
    }
    var year = nowdate.getFullYear();
    var month = nowdate.getMonth()+1;
    month = month >= 10 ? month : '0' + month;
    var day = nowdate.getDate();
    day = day >= 10 ? day : '0' + day;
    var hour = nowdate.getHours();
    hour = hour >= 10 ? hour : '0' + hour;
    var minutes = nowdate.getMinutes();
    minutes = minutes >= 10 ? minutes : '0' + minutes;
    var str_date = '' + year + separator + month + separator + day + ' ' + hour + ':' + minutes;
    return str_date;
}