$(document).ready(function(){

    $("#generateQR").on("click", function(){

        if ($("#textareaToQR").hasClass("valid")){
            
            $("#errorMaxChars").css("visibility", "hidden");
            
            var canvas = $("#qrContent")[0];
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);

            var config = new Object();

            chrome.storage.sync.get(function(value){

                config.QRsize = value.QRsize;
                config.QRcolor = value.QRcolor;
            });

            //Applying a short timeout since if not, the qrcode function does not take well the config parameters and paint the QR with params by default.
            setTimeout(function(){

                $('#qrContent').qrcode({

                    render: 'canvas',
                    size: 150,
                    fill: config.QRcolor,
                    background: "#FFFFFF",
                    text: $("#textareaToQR").val()
                });
            }, 100);
        }else{
        
            $("#errorMaxChars").css("visibility", "visible");
        }
        
    });
    
    $("#saveQR").on("click", function(){
    
    });
});