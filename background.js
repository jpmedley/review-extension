chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.executeScript(tab.id, {file: 'content.js'});
  chrome.tabs.insertCSS(tab.id, {file: 'content.css'});
});