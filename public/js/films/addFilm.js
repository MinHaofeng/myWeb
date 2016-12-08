$.datetimepicker.setLocale('ch');
$('#datetimepicker').datetimepicker({
    dayOfWeekStart : 1,
    lang:'ch',
    disabledDates:['1986/01/08','1986/01/09','1986/01/10'],
    startDate:	'1986/01/05'
});
$('#datetimepicker').datetimepicker({value:'2015/04/15 05:03',step:10});

$(function(){
    $('.deleteActor').hide();
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
    $(ele).parent().next().remove();
    $(ele).parent().remove();
    if($('.actor-list').length == 1){
        $('.deleteActor').hide();
    }
    if($('.actor-list').length < 8){
        $('.addActor').show();
    }
}
