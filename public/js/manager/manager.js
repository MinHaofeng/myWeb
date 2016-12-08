$(function(){
    $('.titles').removeClass('active');
    $('#tt_manager').addClass('active');
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