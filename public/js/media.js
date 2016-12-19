/**
 * Created by shgbit on 14-1-20.
 */
/** Common*/


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

function validateImage(type) {
    var imageRegex = /image*/i;
    if(imageRegex.test(type)) return true;
    return false;
}

function compressAndUpload() {
    'use strict';
    var currentId = $('#mediaNav').attr('currentId') ? $('#mediaNav').attr('currentId') : '';
    var url = '/uploadPPT';
    $('#compressAndUpload').fileupload({
        url: url,
        dataType: 'json',
        singleFileUploads: false,
        add: function (e, data) {
            var fileList = $('#filelist');
            var fileItemHead = '<tr class="fade in"><td class="col-xs-10">';
            var fileItemTail = '</td></tr>';
            var isValid = true;
            $.each(data.files, function (index, file) {
                if(!validateImage(file.type)) isValid = false;
                fileList.append(fileItemHead + file.name + fileItemTail);
            });
            $('#compressCancelBtn').click(function() {
                location.reload();
            });
            $('#compressModalClose').click(function() {
                location.reload();
            });
            $('#compressNameDiv').css("display", "block");
            if(isValid) {
                data.context = $('#compressUploadBtn').click(function() {
                    var compressname = $('#compressName').val().trim();
                    if(compressname === '') {
                        $('#compressNameAlert').css("display","block");
                    } else {
                        data.compressname = compressname;
                        data.submit();
                        $('#compressAndUpload').fileupload('disable');
                        $('#uploadInput').fileupload('disable');
                        $('#uploadFilesModal').modal('hide');
                    }
                });
            } else {
                $('#compressTypeAlert').css("display","block");
            }
        },
        done: function (e, data) {
            if(!data.result) {
                alert('未知的错误');
                location.reload();
            } else if (data.result.status) {
                $.ajax({
                    type:'POST',
                    url: '/compressPPT?path=' + currentId + '&compressname=' + data.compressname + '&tmpDir=' + data.result.message,
                    dataType: 'JSON'
                }).done(function(res){
                        console.log(res);
                        if(res.status === 'success') {
                            alert('打包上传成功');
                        } else {
                            alert('打包上传失败');
                        }
                        location.reload();
                })
            } else {
                alert(data.result.message);
                location.reload();
            }
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#cprogress').show();
            $('#cprogress .progress-bar').css('width',progress + '%');
            $('#cprogresspercent').html(progress + '%')
        }
    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
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

function rmFolder($media) {                        //删除节点的递归
    if($media.type === 'folder') {
        var $medias = medias.filter(function(media) {
            return media.toJSON().parentId === $media.id
        });
        $.each($medias, function(i, o) {
            rmFolder(o.toJSON());
        });
    }
    medias.remove($media);
}

function updateParent($media,$mtime,$flag) {
    if($media.parentId !== '') {
        var parentMedia = medias.get($media.parentId) ? medias.get($media.parentId) : $media
        switch ($flag) {
            case 'create':
                var newsize = parentMedia.toJSON().size+1;
                parentMedia.set('size',newsize);
                break;
            case 'update':
                break;
            case 'delete':
                var newsize = parentMedia.toJSON().size-1;
                parentMedia.set('size',newsize);
                break;
        }
        parentMedia.set('mtime',$mtime);
    }
}

function checkMediaNameExist($name,$oldname,$type,count,parentId) {
    var $medias = medias.filter(function(media) {
        return (media.toJSON().name === $name && media.toJSON().type === $type
             && media.toJSON().parentId === parentId && media.toJSON().name !== $oldname);
    });
    if($medias.length !== 0) {
        $.each($medias, function(i, o) {
            var tempname = '';
            if(count === 0) {
                count = count+1;
                tempname = $name+'('+count+')';
            } else {
                var last = '('+count+')';
                var lastIndex = $name.lastIndexOf(last);
                var originName =$name.substring(0,lastIndex);
                count++;
                tempname = originName+'('+count+')';
            }
            var result = checkMediaNameExist(tempname,$oldname,$type,count,parentId);
            $name = result.tempname;
            count = result.count;
        });
    }
    return {tempname:$name,count:count};
}