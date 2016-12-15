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
    fileUpload();
})

function addActor(ele){
    var old = $(ele).parent();
    var content = '<label for="actor" class="col-sm-2 control-label" style="height:28px"></label><div class="col-sm-10 actor-list" style="margin-top:10px"><input type="text" class=""  placeholder="请输人物名字">: <input type="text" class=""  placeholder="请输演员名字"> <span class="glyphicon glyphicon-plus addActor" style="width: 10px;height:10px" onclick="addActor(this)"></span>&nbsp <span class="glyphicon glyphicon-minus deleteActor" style="width: 10px;height:10px" onclick="deleteActor(this)"></span></div> ';
    $(content).insertAfter(old);
    $('.deleteActor').show();
    if($('.actor-list').length >= 8){
        $('.addActor').hide();
    }
}

function deleteActor(ele){
    $(ele).parent().next('label').remove();
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

    $.ajax({
        type : 'Post',
        url : '/film/addFilm',
        data : JSON.stringify(filmModel),
        contentType: "application/json; charset=utf-8",
        success : function(response){
            if(response.status != 1){
                return alert(response.message)
            }
            alert('添加成功!');
            location.reload();
        },
        error : function(){

        }
    })


}
