$(function(){
    getFilms()
})

function getFilms(){
    $.ajax({
        type : 'get',
        url : '/film/getFilms',
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
        var content = '<tr><td>' + list.name + '</td><td>' + list.createtimeshow + '</td><td>' + list.country + '</td><td><button type="button" class="btn btn-default addToGroup">加入分组</button></td><td><button type="button" class="btn btn-default removeFromGroup" style="display:none">移出分组</button></td></tr>';
        $(selector).append(content);
    })
}