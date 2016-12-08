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

