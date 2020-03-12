console.log('4');

function images() {
  document.querySelectorAll('img').forEach(img => {
    if (!img.alt) {
      console.log(img);
      img.style.border = '5px solid red';
    }
  });
}

function headings() {
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    console.log(heading);
  });
}

// no-cors doesn't seem to be working. Might need to request more permissions in manifest.json and use cors mode.
function links() {
  document.querySelectorAll('a').forEach(link => {
    const options = {
      mode: 'no-cors',
    };
    fetch(link.href, options).then(response => {
      console.log(`${response.ok} ${link.href}`);
    });
  });
}

images();
headings();
links();
