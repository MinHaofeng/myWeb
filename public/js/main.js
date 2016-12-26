var app = angular.module('mainApp', []);
app.controller('mainCtrl', function($scope,$http) {
    $scope.films1 = [];
    $http.get('/film/getList').success(function(data){
        if(data.status == '0'){
            return alert(data.message);
        }
        //获取电影列表1
        $scope.films1 = angular.copy(data.data);
    }).error(function(){
        return alert('error!');
    })

});

function specialPage(ele){
    var filmid = $(ele).attr('data-id');
    location.href = '/film/special?filmid=' + filmid;
}