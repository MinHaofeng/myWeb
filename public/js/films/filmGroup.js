$(function(){
    getFilms()
})

function getFilms(){
    var groupid = $('.active2').attr('data-value');
    $.ajax({
        type : 'get',
        url : '/film/getFilms?groupid=' + groupid,
        success : function(data){
            if(data.status != '1'){
                return alert(data.message)
            }
            listRender('#filmListTable tbody',data.data);
        }
    })
}

function listRender(selector,lists){
    $(selector).empty();
    $.each(lists,function(index,list){
        var content = '<tr><td>' + list.name + '</td><td>' + list.createtimeshow + '</td><td>' + list.country + '</td><td><button type="button" data-value="' + list.id + '" class="btn btn-default addToGroup" onclick="addToGroup(this)">加入分组</button></td><td><button type="button" data-value="' + list.id + '" class="btn btn-default removeFromGroup" style="display:none">移出分组</button></td></tr>';
        $(selector).append(content);
    })
}

function addToGroup(ele){
    var groupid = $('#filmGroupDiv').attr('data-group');
    var filmid = $(ele).attr('data-value');
    $.ajax({
        type:'POST',
        url:'/film/addtogroup',
        data:JSON.stringify({
            'groupid' : groupid,
            'filmid' : filmid
        }),
        contentType: "application/json; charset=utf-8",
        success : function(data){
            if(data.status != '1'){
                return alert(data.message);
            }
            alert('已成功加入分组!')
            listRender('#filmListTable tbody',data.data);
        }
    })
}