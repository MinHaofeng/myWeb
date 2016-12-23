$(function(){
    $('.titles').removeClass('active');
    $('#tt_film').addClass('active');
})

var app = angular.module('filmSpecial', []);
app.controller('filmSpecialCtrl', function($scope,$http) {
    $scope.comments = [];
    $http.get('/comment/getComments?type=film').success(function(response){
        if(response.status != '1'){
            return alert(response.message)
        }
        if(response.data.length == 0){
            return $('#commentDiv').addClass('zwpl');
        }
        $scope.comments = angular.copy(response.data);

    })

    $scope.submitComment = function(){
        var cc = getCommentCotent();
        var filmid = getTargetId()
        if(!filmid){
            return alert('未获取到影片id!')
        }
        if(!cc){
            return alert('您尚未输入评论内容！')
        }
        $http.post('/film/addComment',{
            'content': cc,
            'targetId': filmid
        }).success(function(response){
            clearComment()
            alert('评论成功!');
        })
    }
})

