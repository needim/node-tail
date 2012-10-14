function isJson(str) {
    var parsed;
    try {
        parsed = JSON.parse(str);
    } catch (e) {
        return {success: false, data: str};
    }
    return { success: true, data: parsed};
}

var socket = io.connect('http://localhost:4000');
socket.on('tail', function (data) {
//    [14-Oct-2012 20:17:15 UTC]
    var data_tailed  = data.data,
        data_regexp_patt = /\[(.*)UTC](.*)/;

    var data_matched = data_tailed.match(data_regexp_patt);
    console.log(data_matched);

    var data_json = isJson(data_matched[2]);
    if(data_json.success){
        $('<div class="alert alert-success clearfix hide"></div>').jsonView(data_json.data).prependTo('#socket-logs').slideDown();
    }else{
        $('<div class="alert alert-info clearfix hide"></div>').text(data_json.data).prependTo('#socket-logs').slideDown();
    }


});