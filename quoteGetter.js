var stockList = new Firebase("https://activist-algo.firebaseio.com/stockList");

$(document).ready(function() {
    stockList.on("child_added", function(snapshot) {
        var stock = snapshot.val();
        var stockID = snapshot.key();
        var startDate = stock.startDate.split(" ")[0];
        if (startDate == stock.endDate.split(" ")[0]) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            } 

            if(mm<10) {
                mm='0'+mm
            } 

            today = yyyy + "-" + mm + "-" + dd;
            endDate = today;
        };

        var stockTicker = stock.stockName;

        $("#container").append("<button id='stock'>" + stockID + "</button>");
        $("#container button#stock:last").click(function() {
            $.ajax({
                contentType: "json",
                url: "/get_historical/" + stockTicker + "/" + startDate + "/" + endDate,
                success: function(data){
                    var results = data.split(" ");
                    var lastDayClosing = parseFloat(results[1].replace(",", "").replace(/"/g, ""));
                    var firstDayClosing = parseFloat(results[3].replace("}", "").replace(/"/g, ""));

                    stockList.child(stockID).update({
                        "startPrice": firstDayClosing,
                        "endPrice": lastDayClosing,
                    });
                }
            });
        });
    });
});
