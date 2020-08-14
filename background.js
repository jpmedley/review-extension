function links(data) {
  chrome.webNavigation.onCompleted.addListener(data => {
    // TODO(kaycebasques): Only delete the tab if it's one of the links we opened.
    // We also need to reduce the URLs to unique pages only. And skip opening same-page links.
    // chrome.tabs.remove(data.tabId);
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