(() => {
  console.log('GREETINGS');

  // TODO(kayce): Rather than using sentinels, why not just send data as it's ready?
  // Or provide an overlay within content script that provides the status of each audit?
  const data = {};
  const sentinels = {};

  function audit() {
    hero();
  }
  
  function hero() {
    const image = new Image();
    image.addEventListener('load', () => {
      if (image.width !== 3200) {
        console.log('hero not ok');
      } else {
        console.log('hero ok');
      }
    });
    image.src = document.querySelector('.w-hero').src;
  }

  // TODO(kayce): Use a custom element, like VisBug?
  function open() {
    document.querySelector('.w-actions').style.display = 'none';
    const content = document.querySelector('.w-post-content');
    content.style.margin = '0 0 0 auto';
    let container = document.querySelector('.w-extension');
    if (!container) {
      container = document.createElement('iframe');
      container.classList.add('w-extension');
      container.style.width = `${content.getBoundingClientRect().left}px`;
      container.style.height = `${document.documentElement.clientHeight}px`;
      container.style.position = 'fixed';
      container.style.top = 0;
      container.style.left = 0;
      container.style.zIndex = '2147483647';
      container.src = chrome.runtime.getURL('content.html');
      document.body.appendChild(container);
    }
  }

  function setup() {
    open();
  }

  setup();
  //audit();
})();