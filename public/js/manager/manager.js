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

function fileUpload() {
    'use strict';
    var currentId = $('#mediaNav').attr('currentId') ? $('#mediaNav').attr('currentId') : '';
    var url = '/upload';
    $('#uploadInput').fileupload({
        url: url,
        dataType: 'json',
        add: function (e, data) {
            var clear = true
            $.each(data.files, function (index, file) {
                if (file.size>1024*1024*1024*1.5) {
                    if (!window.confirm('文件体积超过1.5GB，是否继续上传？')) {
                        clear = false
                    }
                } else {
                    if(!file.name.match(/\.png$|\.jpg$/)) {
                        if (!window.confirm('上传的文件格式不支持，是否继续上传？')) {
                            clear = false
                        }
                    } else {
                        var $result=validateMediaName(file.name)
                        if(!$result.status) {
                            alert($result.message)
                            clear = false
                        }
                    }

                }

            })

            if(clear) {
                data.submit()
            }
        },
        done: function (e, data) {

        },
    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}

function validateMediaName($name) {
    var reg = /[<>\*\?:\^|"]/ig;
//    var reg = /^[a-zA-Z0-9_\.\(\)\-\u4e00-\u9fa5]+$/ig;
    var $result={};
    if($name.match(reg)) $result={status:false,message:'格式不正确'};
    else if($name.getRealLength() > 50 ) $result={status:false,message:'长度不能超过50字节'};
//    if(!$name.match(reg)) $result={status:false,message:'文件夹名或者媒体名只能为数字、中英文、点、下划线和中划线'};
//    else $result={status:true,message:''};

    // 后缀名
    //if ($name.indexOf())

    else $result={status:true,message:''}
    return $result
}