$(document).ready(function() {
    $('select').material_select();
    
    fillInputs();
    
    $('#saveBtn').on("click", function(){

        var size = parseInt($('#sizeInput').val()),
            color = $('#colorInput').val().toString();
        
        chrome.storage.sync.set({"QRsize": size});
        chrome.storage.sync.set({"QRcolor": color});
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


//rellena los inputs de la configuración con los valores almacenados en el storage.
function fillInputs(){

    chrome.storage.sync.get(function(value){
        
        $('#sizeInput option[value='+(value.QRsize)+']').prop('selected', true);
        $('#colorInput').val(value.QRcolor);
        
        $('select').material_select(); //rebuilding select to update select options
    });
}