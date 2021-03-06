$.datetimepicker.setLocale('ch');
$('#datetimepicker').datetimepicker({
    dayOfWeekStart : 1,
    lang:'ch',
    disabledDates:['1986/01/08','1986/01/09','1986/01/10'],
    startDate:	'1986/01/05'
});
$('#datetimepicker').datetimepicker({value:'2015/04/15 05:03',step:10});
$('#datetimepicker2').datetimepicker({
    lang:'ch',
    timepicker:false,
    format:'Y-m-d',
    formatDate:'Y-m-d',
    maxDate:'+1970/01/01' // and tommorow is maximum date calendar
});
$(function(){
    $('.deleteActor').hide();
    var filmid = $('#addFilmDiv').attr('data-id');
    if(filmid){
        renderFilm(filmid);
    }
    //fileUpload();
})

function addActor(ele){
    var old = $(ele).parent();
    var content = '<div class="col-sm-10 actor-list" style="margin-top:10px;float:right"><input type="text" class=""  placeholder="请输人物名字">: <input type="text" class=""  placeholder="请输演员名字"> <span class="glyphicon glyphicon-plus addActor" style="width: 20px;height:20px" onclick="addActor(this)"></span>&nbsp <span class="glyphicon glyphicon-minus deleteActor" style="width: 20px;height:20px" onclick="deleteActor(this)"></span></div> ';
    $(content).insertAfter(old);
    $('.deleteActor').show();
}

function deleteActor(ele){
    $(ele).parent().remove();
    if($('.actor-list').length == 1){
        $('.deleteActor').hide();
    }
    if($('.actor-list').length < 8){
        $('.addActor').show();
    }
}

function postFilm(){
    //var nowdate = new Date()
    //var create = formatTime(nowdate,'/');
    var actors = [];
    var filmName = $('#filmName').val();
    if(!filmName){
        return popBy('#filmName', false, '影片名不能为空');
    }
    var publishTime = $('input[name="publishTime"]').val();
    if(!publishTime){
        return popBy('input[name="publishTime"]', false, '上映时间不能为空');
    }
    var country = $('#country').val();
    if(!country){
        return popBy('#country', false, '上映地区不能为空');
    }
    var construction = $('#construction').val();
    var actor_lists = $('.actor-list');
    if(actor_lists.length < 1){
        return alert('error!');
    }
    $.each(actor_lists,function(index,actor_list){
        var rAndA = $(actor_list).children('input');
        if(rAndA.length != 2){
            return alert('error!')
        }
        var role = rAndA[0].value;
        var actor = rAndA[1].value;
        if(!role){
            return popBy(rAndA[0], false, '角色名不能为空');
        }
        if(!actor){
            return popBy(rAndA[1], false, '演员名不能为空');
        }
        actors.push({'role' : role, 'actor' : actor});
    })

    var filmModel = {
        'name' : filmName,
        'publishtime' : publishTime,
        'country' :  country,
        'construction' : construction,
        'mainactor' : actors
    }

    var url = '/film/addFilm';
    var filmid = $('#addFilmDiv').attr('data-id');
    var successStr = '添加成功!';
    if(filmid){
        url = '/film/updateFilm';
        filmModel.id = filmid;
        successStr = '修改成功!'
    }

    $.ajax({
        type : 'Post',
        url : url,
        data : JSON.stringify(filmModel),
        contentType: "application/json; charset=utf-8",
        success : function(response){
            if(response.status != 1){
                return alert(response.message)
            }
            alert(successStr);
            location.reload();
        },
        error : function(){

        }
    })


}

function clickupload(){
    $('#uploadInput').click()
}

function renderFilm(filmid){
    $.ajax({
        type:'GET',
        url:'/film/getFilmDetail?filmid=' + filmid,
        success:function(response){
            if(response.status != '1'){
                return alert(response.message);
            }
            var film = response.data;
            $('#datetimepicker2').val(film.publishtime)
            var mainactors = film.mainactor;
            $('.actor-list:first input:first').val(mainactors[0].role);
            $('.actor-list:first input:last').val(mainactors[0].actor);
            if(mainactors.length == 1){
                return;
            }
            $('.deleteActor').show();
            for(var i=1;i<mainactors.length;i++){
                var content = '<div class="col-sm-10 actor-list" style="margin-top:10px;float:right"><input type="text" class=""  placeholder="请输人物名字" value="' + mainactors[i].role + '">: <input type="text" class=""  placeholder="请输演员名字" value="' + mainactors[i].actor + '"> <span class="glyphicon glyphicon-plus addActor" style="width: 20px;height:20px" onclick="addActor(this)"></span>&nbsp <span class="glyphicon glyphicon-minus deleteActor" style="width: 20px;height:20px" onclick="deleteActor(this)"></span></div> ';
                $('#actorAdd').append(content)
            }
        }
    })
}