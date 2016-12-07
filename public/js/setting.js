function fileUpload () {
    'use strict';

    var getOptions = function(type) {
        var progress = '';
        var bar = '';
        var percent = '';
        var showVersion = ''
        switch(type) {
            case 'android':
                progress = $('#ANDProgress');
                bar = $('#ANDProgress .progress-bar');
                percent = $('#ANDProgresspercent');
                showVersion = $('#ANDVersion');
                break;
            case 'deamon4android':
                progress = $('#D4AProgress');
                bar = $('#D4AProgress .progress-bar');
                percent = $('#D4AProgresspercent');
                showVersion = $('#D4AVersion');
                break;
            case 'windows':
                progress = $('#WINProgress');
                bar = $('#WINProgress .progress-bar');
                percent = $('#WINProgresspercent');
                showVersion = $('#WINVersion');
                break;
            default:
                return null;
        };
        var options = {
            url: '/upload/package?type=' + type,
            dataType: 'json',
//            formData: {update: type},
            add: function (e, data) {
                data.submit();
            },
            done: function (e, data) {
                if(!data.result) return alert('未知的错误');
                if(data.result.status == 'fail') {
                    var p = bar.width();
                    var x = progress.width();
                    return alert(data.result.result);
                }

                setTimeout(function() {
                    showVersion.html(data.result.result);
                    var p = bar.width();
                    var x = progress.width();
                    if(p === x) {
                        progress.hide();
                        bar.css('width', 0 + '%');
                    }
                }, 1000);
            },
            progressall: function (e, data) {
                var t = parseInt(data.loaded / data.total * 100, 10);
                progress.show();
                bar.css('width',t + '%');
                percent.html(t + '%');
            }
        };
        return options;
    };

    $('#ANDUploadInput').fileupload(getOptions('android')).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');


    $('#D4AUploadInput').fileupload(getOptions('deamon4android')).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');


    $('#WINUploadInput').fileupload(getOptions('windows')).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
}
