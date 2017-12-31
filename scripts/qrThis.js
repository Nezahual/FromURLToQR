chrome.storage.sync.get(["selectedTextQR", "QRcolor"],function(values){

    if(values.selectedTextQR === "limitReachedError"){
        $('#errorMaxChars').css("display", "block");
        $('.notes').css("visibility", "hidden");
    }else
        setTimeout(function(){

            $('#qrContent').qrcode({

                render: 'canvas',
                size: 500,
                fill: values.QRcolor,
                background: "#FFFFFF",
                text: values.selectedTextQR
            });
        }, 100);

    //Removing the selected text from storage , there's no need to keep it stored taking bytes.
    chrome.storage.sync.remove("selectedTextQR");
});