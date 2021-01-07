const { act } = require("react-dom/test-utils");

window._appSandbox = true;
var stripe = Stripe("pk_live_zrp4ccUwvlA2ScpEGfEBLo8f00821Z7XG3");

if (_appSandbox == false) {
  stripeKey = "pk_live_zrp4ccUwvlA2ScpEGfEBLo8f00821Z7XG3" 
}

var elements = stripe.elements();
var style = {
    base: {
        color: "blue",
    }
}
var card = elements.create('card', {style: style});

chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
var activeTab = tabs[0];
var _app_setupStripe = function(_appSandbox = true) {
  card.mount('#card');
  card.on('change', function(event) {
    chrome.tabs.sendMessage(activeTab.id, {command: "stripeOnChange", event: event}, (response) => {
    });
  });
};
_app_submitStripe = function() {
  try {
    stripe.createToken(card).then(function(result){
    if (result.error) {
      chrome.tabs.sendMessage(activeTab.id, {command: "stripeCardOnConfirmError", 
      result: result.error}, (response) =>{           
        });
      } else {
          chrome.tabs.sendMessage(activeTab.id, {command: "stripeCardOnConfirm", 
          token: result.token}, (response) =>{
          }); 
      }
  });
  } catch(e) {
      chrome.tabs.sendMessage(activeTab.id, {command: "stripeCardOnConfirmEorr", e:e.message, result: "Invalid Card"}, (response) =>{
      });
  }
}


})