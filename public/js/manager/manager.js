$(function(){
    $('.titles').removeClass('active');
    $('#tt_manager').addClass('active');
    //$('.yiji').children('li')[0].children('a')[0].click();
})

var app = angular.module('managerApp', []);
app.controller('managerCtrl', function($scope,$http) {
    $scope.groups=[];
    $http.get('/film/getgroups').success(function(data){
        if(data.status != '1'){
            return  alert(data.message);
        }
        $scope.groups = angular.copy(data.data);
    })
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

function showFilmGroups(ele){
    var groupid = $(ele).attr('data-value');
    $('.third').removeClass('active2');
    $(ele).addClass('active2');
    $.ajax({
        type: "GET",
        url: "/manager/showFilmGroup",
        success:function(content){
            $('.xdsoft_datetimepicker').remove();//删除时间控件
            $('#rightDiv').html(content);
            $('#filmGroupDiv').attr('data-group',groupid)
        }
    }).done(function() {

    }).fail(function(a, b, c) {
    });
}