chrome.runtime.onInstalled.addListener(function(details){
    
    if(details.reason == "install"){
        //Settting default config
        var config = {

            QRsize: 250,
            QRcolor: "#000000"
        };

        chrome.storage.sync.set({"QRsize": config.QRsize});
        chrome.storage.sync.set({"QRcolor": config.QRcolor});
        chrome.storage.sync.set({"QRThisActive": true});
    }
});

//Removing default contextual menus.
chrome.contextMenus.removeAll();

//Creating contextual menus in browser_action context.
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("customText"),
    contexts: ["browser_action"],
    id: "customText"
});

//Creating contextual menus in selection context.
chrome.contextMenus.create({
    title: chrome.i18n.getMessage("QRfyThis"),
    contexts: ["selection"],
    id: "qrthis",
    visible: true
});

function onClickHandler(info, tab){

    if (info.menuItemId == "customText")
        window.open("customText.html", "_blank");
    else if (info.menuItemId == "qrthis"){
        getSelectedText();
    }
}

//Gets the selected (highlighted) text in the current tab.
//Note that this function asks for "activeTab" permission in manifest.json
function getSelectedText(){

    chrome.tabs.query({active:true, currentWindow:true}, function(tab){
        var tabId = tab[0].id;
        chrome.tabs.executeScript(tabId, {code:'window.getSelection().toString();'}, function(results) {
            var selectedText = results[0];

            if(selectedText.length < 1000)
                chrome.storage.sync.set({"selectedTextQR": selectedText});
            else
                chrome.storage.sync.set({"selectedTextQR": "limitReachedError"});

            window.open("qrthis.html", "_blank");
        });
    });
}
    
//adds the event onClick handler to the listener
chrome.contextMenus.onClicked.addListener(onClickHandler);
    