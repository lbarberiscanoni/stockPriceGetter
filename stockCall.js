var stockList = new Firebase("https://activist-algo.firebaseio.com/stockList");

$(document).ready(function() {
    stockList.on("child_added", function(snapshot) {
        var stock = snapshot.val();
        $("#container").append("<button id='stock'>" + stock.id + "</button>");
    });
    //$.ajax({
    //    contentType: 'json',
    //    url: '',
    //    success: function(data){
    //        lastDayClosing: parseInt(data['close_last_day']);
    //        firstDayClosing: parseInt(data['close_first_day']);
//
    //        console.log(lastDayClosing);
    //        console.log(firstDayClosing);
    //    }
    //});
});
