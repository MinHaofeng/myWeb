$(function(){
    getFilmDetail()
})

function getFilmDetail(){
    var imgurl = '/images/default.jpeg';
    var filmid = $('#DetailDiv').attr('data-id');
    $.ajax({
        type : 'get',
        url : '/film/getFilmDetail?filmid=' + filmid,
        success : function(data){
            if(data.status != '1'){
                return alert(data.message)
            }
            var filmdetail = data.data;
            /* TODO
            * 判断是否有已上传的图片
            * 如果没有，显示默认图片
            * 如果有，显示上传的图片*/
            //listRender('#filmListTable tbody',data.data);
            if(filmdetail.pictureurl){
                imgurl = '/' + filmdetail.pictureurl;
            }
            $('#imgshow').attr('src',imgurl);
            if(filmdetail.name){
                $('#filmname span').html(filmdetail.name)
            }
            if(filmdetail.construction){
                $('#filmconstruction span').html(filmdetail.construction)
            }
            if(filmdetail.publishtime){
                $('#publishtime span').html(filmdetail.publishtime)
            }
            if(filmdetail.country){
                $('#publisharea span').html(filmdetail.country)
            }
        }
    })
}
