$(function(){
    $('.titles').removeClass('active');
    $('#tt_manager').addClass('active');
    //$('.yiji').children('li')[0].children('a')[0].click();
})

function addFilms(){
    $.ajax({
        type: "GET",
        url: "/manager/addFilm",
        success:function(content){
            $('#rightDiv').html(content);
        }
    }).done(function(oUser) {

    }).fail(function(a, b, c) {
    });
}

function showFilmGroups(){
    $.ajax({
        type: "GET",
        url: "/manager/showFilmGroup",
        success:function(content){
            $('.xdsoft_datetimepicker').remove();//删除时间控件
            $('#rightDiv').html(content);
        }
    }).done(function() {

    }).fail(function(a, b, c) {
    });
}