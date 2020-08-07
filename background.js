chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.executeScript(tab.id, {file: 'content.js'});
  chrome.tabs.insertCSS(tab.id, {file: 'content.css'});
});

// https://developer.chrome.com/extensions/tabs#type-TabStatus
chrome.runtime.onMessage.addListener((request, sender) => {
  console.log(JSON.parse(request));
  // chrome.tabs.create({url: 'https://kayce.basqu.es', active: false}, tab => {
  //   //chrome.tabs.update(tab.id, {url: 'https://web.dev'});
  //   chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  //     chrome.tabs.sendMessage(tabs[0].id, {tabId: tabs[0].id});
  //   });
  // });
});