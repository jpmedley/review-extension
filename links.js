window.onload = () => {
  chrome.runtime.sendMessage(`hello from ${window.location.href}!`);
  window.close();
};