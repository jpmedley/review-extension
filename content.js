(() => {
  // TODO(kayce): Rather than using sentinels, why not just send data as it's ready?
  // Or provide an overlay within content script that provides the status of each audit?
  const data = {};
  const sentinels = {};

  function audit() {
    hero();
  }
  
  function hero() {
    sentinels.hero = false;
    data.hero = {};
    const image = new Image();
    image.addEventListener('load', () => {
      if (image.width !== 3200) {
        data.hero.ok = false;
        data.hero.src = image.src;
        sentinels.hero = true;
        send();
      }
    });
    image.src = document.querySelector('.w-hero').src;
    send();
  }

  function send() {
    for (sentinel in sentinels) {
      if (!sentinel.ready) {
        console.log(`${sentinel.id} not ready`);
        break;
      }
    }
    chrome.runtime.sendMessage(data);
  }

  // TODO(kayce): Use a custom element, like VisBug?
  function setup() {
    document.querySelector('.w-actions').style.display = 'none';
    const content = document.querySelector('.w-post-content');
    content.style.margin = '0 0 0 auto';
    let container = document.querySelector('.w-extension');
    if (!container) {
      container = document.createElement('iframe');
      container.classList.add('w-extension');
      // TODO(kayce): Compute the height of the iframe based on the viewport height? Or use a custom element?
      container.style.width = `${content.getBoundingClientRect().left - 10}px`;
      container.style.position = 'fixed';
      container.style.top = 0;
      container.style.bottom = 0;
      //container.style.backgroundColor = 'black';
      //container.style.color = 'white';
      container.style.zIndex = '2147483647';
      container.src = chrome.runtime.getURL('content.html');
      document.body.appendChild(container);
    }
  }

  setup();
  //audit();
})();