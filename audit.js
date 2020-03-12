const images = () => {
  document.querySelectorAll('img').forEach(img => {
    if (!img.alt) {
      console.log(img);
      img.style.border = '5px solid red';
    }
  });
};

const headings = () => {
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    console.log(heading);
  });
};

images();
headings();
