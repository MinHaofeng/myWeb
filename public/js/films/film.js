$(function(){
    $('.titles').removeClass('active');
    $('#tt_film').addClass('active');
})

var app = angular.module('myFilm', []);
app.controller('myFilmCtrl', function($scope,$http) {
    //获取分组信息
    $http.get('/film/getGroups').success(function(data){
        if(data.status == '0'){
            return alert(data.message);
        }
        $scope.film_title1 = angular.copy(data.data[0].name);
        $('#film_list1').attr('data-id',data.data[0].id)

        $scope.film_title2 = angular.copy(data.data[1].name);
        $('#film_list2').attr('data-id',data.data[1].id)

        //获取电影列表1
        $scope.films1 = [];
        var groupid_1 = $('#film_list1').attr('data-id');
        $http.get('/film/getFilms?group=' + groupid_1).success(function(data){
            if(data.status == '0'){
                return alert(data.message);
            }
            $scope.films1 = angular.copy(data.data);
        }).error(function(){
            return alert('error!');
        })

        //获取电影列表2
        $scope.films2 = [];
        var groupid_2 = $('#film_list2').attr('data-id');
        $http.get('/film/getFilms?group=' + groupid_2).success(function(data){
            if(data.status == '0'){
                return alert(data.message);
            }
            $scope.films2 = angular.copy(data.data);
        }).error(function(){
            return alert('error!');
        })

    }).error(function(){
        return alert('error!');
    })

});

function specialPage(ele){
    var filmid = $(ele).attr('data-id');
    location.href = '/film/special?filmid=' + filmid;
}