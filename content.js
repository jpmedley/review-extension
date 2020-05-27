function hero() {
  const image = new Image();
  image.addEventListener('load', () => {
    chrome.runtime.sendMessage({
      hero: image.width
    });
  });
  image.src = document.querySelector('.w-hero').src;
}

function images() {
  document.querySelectorAll('img').forEach(img => {
    if (!img.alt) {
      console.log(img);
      img.style.border = '5px solid red';
    }
    if (img.classList.contains('w-screenshot-filled') && !img.classList.contains('w-screenshot')) {

    }
    img.addEventListener('mouseover', () => {
      const position = img.getBoundingClientRect();
      tooltip.style.top = 0;
      tooltip.style.left = 0;
      tooltip.style.display = 'block';
      //console.log({position, tooltip});
    });
  });
}

function headings() {
  //console.log(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
}

function links() {
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseover', () => {
      //window.open(link.href, '_blank');
    })
  });
}

//images();
//headings();
//links();
hero();