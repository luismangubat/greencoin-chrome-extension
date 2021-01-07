
// Get product title from chrome storage
chrome.storage.local.get("productName", function (data) {
    if (data["productName"]) selectedVar = data["productName"]
    document.getElementById("product-container").innerHTML = data["productName"]
    console.log(data["productName"])
});

// Load Organization 1
var imgURL1 = chrome.extension.getURL("images/org1.png");
document.getElementById("org1").src = imgURL1;

// Load Organization 2
var imgURL2 = chrome.extension.getURL("images/org2.png");
document.getElementById("org2").src = imgURL2;


// Load Organization 2
var amazon = chrome.extension.getURL("images/amazon.png");
document.getElementById("amazon").src = amazon;
