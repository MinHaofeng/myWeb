$(function(){
    $('.titles').removeClass('active');
    $('#tt_home').addClass('active');
})

function goToPage(ele){
    var targetUrl = $(ele).attr('data-target');
    if(targetUrl == 'home'){
        return location.href = '/';
    }
    location.href = '/' + targetUrl + '/index';
}

function showLogin(){
    layer.open({
        type: 2,
        title: '登录',
        fix: false,
        area: ['600px', '400px'],
        content: '/login',
        end: function(){

        }
    });
}