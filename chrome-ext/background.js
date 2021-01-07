// First javascript file to be executed 
chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
      if (/^https:\/\/www\.amazon.ca/.test(current_tab_info.url)) {
            chrome.tabs.executeScript(null, {file: './foreground.js'},
            () => console.log('I injected'))
            chrome.tabs.executeScript(null, {file: './popup/popup.js'},
            () => console.log('I injected'))
            chrome.tabs.executeScript(null, {file: './modal.js'},
            () => console.log('I injected'))
      }
  })
});

chrome.storage.local.get("productName", value => {
  console.log(value)});
