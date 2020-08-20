function links(data) {
  // LOL. Doesn't work. 
  // Next try: Inject a script into the page to fetch itself and use response.status.
  chrome.webNavigation.onErrorOccurred.addListener(data => {
    // TODO(kaycebasques): Only delete the tab if it's one of the links we opened.
    // We also need to reduce the URLs to unique pages only. And skip opening same-page links.
    // chrome.tabs.remove(data.tabId);
    console.log(`NAV ERROR! ${data}`);
  });
  chrome.webNavigation.onCompleted.addListener(data => {
    // TODO(kaycebasques): Only delete the tab if it's one of the links we opened.
    // We also need to reduce the URLs to unique pages only. And skip opening same-page links.
    // chrome.tabs.remove(data.tabId);
    console.log('COMPLET', data);
  });
  data.forEach(link => {
    chrome.tabs.create({url: link, active: false}, tab => {
      // chrome.tabs.executeScript(tab.id, {file: 'links.js'});
      // chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      //   chrome.tabs.sendMessage(tabs[0].id, {tabId: tabs[0].id});
      // });
    });
  });
}

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.executeScript(tab.id, {file: 'content.js'});
  chrome.tabs.insertCSS(tab.id, {file: 'content.css'});
});

// https://developer.chrome.com/extensions/tabs#type-TabStatus
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.id === 'links') {
    links(message.data);
  } else {
    console.log(message);
  }
});