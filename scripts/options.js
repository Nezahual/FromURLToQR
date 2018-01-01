$(document).ready(function() {

    $('select').material_select();
    
    fillInputs();
    
    $('#saveBtn').on("click", function(){

        var size = parseInt($('#sizeInput').val()),
            color = $('#colorInput').val().toString(),
            QRThisActive = $('#checkboxQRThis').is(':checked');
        
        chrome.storage.sync.set({"QRsize": size});
        chrome.storage.sync.set({"QRcolor": color});
        chrome.storage.sync.set({"QRThisActive": QRThisActive});

        chrome.contextMenus.update("qrthis", {visible: QRThisActive});

        var toastSaved = $('<span>'+chrome.i18n.getMessage("successfullySaved")+'</span>');
        Materialize.toast(toastSaved, 4000);
    });
    
    //////////////////////////////////// testing buttons ////////////////////////////////////
    
    if ($("#clear") != null){ //if button is there, add the event.
        
        $('#clear').on("click", function(){

            chrome.storage.sync.clear();
        });
    }
    
    if ($("#check") != null){ //if button is there, add the event.
        
        $('#check').on("click", function(){

            chrome.storage.sync.get(function(value){

                console.log(value);
                if(!value)
                    console.log("vasio");
                else
                    console.log("argo hay");

                console.log(Object.keys(value).length);
            });
        });
    }
    //////////////////////////////////// end testing buttons ////////////////////////////////////
});

//Fills the config inputs using stored values.
function fillInputs(){

    chrome.storage.sync.get(["QRsize", "QRcolor", "QRThisActive"], function(value){
        
        $('#sizeInput option[value='+(value.QRsize)+']').prop('selected', true);
        $('#colorInput').val(value.QRcolor);
        $("#checkboxQRThis").attr('checked', value.QRThisActive);

        $('select').material_select(); //rebuilding select to update select options
    });
}