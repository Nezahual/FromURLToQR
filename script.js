(function(){

    var config = new Object();
    
    chrome.storage.sync.get(["QRsize", "QRcolor"], function(value){
        
        config.QRsize = value.QRsize;
        config.QRcolor = value.QRcolor;
    });
    
    var query = {
            currentWindow: true,
            active: true
        };
        
    chrome.tabs.query(query, function(tab){
        
        $('#qrContent').qrcode({

            render: 'canvas',
            size: config.QRsize,
            fill: config.QRcolor,
            text: tab[0].url
        });
    });
})();

//https://larsjung.de/jquery-qrcode/