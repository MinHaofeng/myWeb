$(function(){
    $('.titles').removeClass('active');
    $('#tt_film').addClass('active');
})

var app = angular.module('myFilm', []);
app.controller('myFilmCtrl', function($scope,$http) {
    //获取电影列表
    $scope.films1 = [];
    $http.get('/film/getFilms').success(function(data){
        if(data.status == '0'){
            return alert(data.message);
        }
        $scope.films1 = angular.copy(data.data);
    }).error(function(){
        return alert('error!');
    })
});