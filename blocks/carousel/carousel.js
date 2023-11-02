function nextSlide() {
  const carouselButtons = document.querySelector('.carousel-buttons');

  for (let i = 0; i < carouselButtons.children.length; i += 1) {
    if (carouselButtons.children[i].classList.contains('selected')) {
      if (carouselButtons.children[i].nextElementSibling != null) {
        carouselButtons.children[i].nextElementSibling.click();
        return;
      }
      carouselButtons.children[0].click();
      return;
    }
  }
}

// eslint-disable-next-line no-unused-vars
function prevSlide() {
  const carouselButtons = document.querySelector('.carousel-buttons');

  for (let i = carouselButtons.children.length - 1; i >= 0; i -= 1) {
    // console.log(i);
    if (carouselButtons.children[i].classList.contains('selected')) {
      if (i !== 0) {
        carouselButtons.children[i].previousElementSibling.click();
        return;
      }
      carouselButtons.children[carouselButtons.children.length - 1].click();
      return;
    }
  }
}

function start() {
  setInterval(() => nextSlide(), 5000);
}

export default function decorate(block) {
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  [...block.children].forEach((row, i) => {
    const classes = ['image', 'text'];
    classes.forEach((e, j) => {
      row.children[j].classList.add(`carousel-${e}`);
    });
    /* buttons */
    const button = document.createElement('button');
    button.title = 'Carousel Nav';
    if (!i) button.classList.add('selected');
    button.addEventListener('click', () => {
      block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
      [...buttons.children].forEach((r) => r.classList.remove('selected'));
      button.classList.add('selected');
    });
    buttons.append(button);
  });
  block.parentElement.append(buttons);

  // create controls
  const controls = document.createElement('div');
  controls.className = 'carousel-controls';

  const btnPrev = document.createElement('button');
  btnPrev.ariaLabel = 'previous';
  btnPrev.classList.add('btn', 'btn-prev');
  btnPrev.addEventListener('click', () => prevSlide());
  controls.appendChild(btnPrev);
  const btnNext = document.createElement('button');
  btnNext.ariaLabel = 'next';
  btnNext.classList.add('btn', 'btn-next');
  btnNext.addEventListener('click', () => nextSlide());
  controls.appendChild(btnNext);

  block.parentElement.appendChild(controls);

  start();
}
