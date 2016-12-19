$(function(){
    getFilms()
})

function getFilms(){
    $.ajax({
        type : 'get',
        url : '/film/getList',
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
        var content = '<tr data-id="' + list.id + '" onclick="showDetail(this)"><td>' + list.name + '</td><td>' + list.createtimeshow + '</td><td>' + list.country + '</td></tr>';
        $(selector).append(content);
    })
}

function showDetail(ele){
    var filmid = $(ele).attr('data-id');
    $.ajax({
        type : 'get',
        url : '/film/getFilm?filmid=' + filmid,
        success : function(content){
            $('#rightDiv').html(content);
        }
    })
}