function onClickHandler(info, tab){

    if (info.menuItemId == "customText"){
        window.open("customText.html", "_blank");
    }
}

//adds the events onClick handler to the listener
chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function(details){
    
    
    
    
    if(details.reason == "install"){
        //Creating contextual menus
        chrome.contextMenus.removeAll();
        chrome.contextMenus.create({
            title: "Custom text to QR",
            contexts: ["browser_action"],
            id: "customText"
        });
        
        //Settting default config
        var config = {

            QRsize: 250,
            QRcolor: "#000000"
        };

        chrome.storage.sync.set({"QRsize": config.QRsize});
        chrome.storage.sync.set({"QRcolor": config.QRcolor});
    }
});
