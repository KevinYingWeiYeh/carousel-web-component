class Manifist {
  constructor() {
    this.imageSize = 150;
    this.imagesOnCarousel = 4;
    this.imageQuantity = 10;
    this.wrapperTag = '.wrapper';
  }
}

const GeneratingImageData = (data) => {
  const list = [];
  if (!data.imagesOnCarousel) {
    console.log('Error: imagesOnCarouse variable has to be in manifist');
  } else {
    for (let i = 0; i < data.imageQuantity; i += 1) {
      list.push(`https://picsum.photos/id/${Math.round(Math.random() * 1000)}/${data.imageSize}/${data.imageSize}`);
    }
  }
};

const CreateTags = ({ imageQuantity, wrapperTag }) => {
  const wrapper = document.querySelector(wrapperTag);
  const node = document.createElement('ul');
  node.setAttribute('class', 'carousel');
  node.setAttribute('data-target', 'carousel');
  for (let i = 0; i < imageQuantity; i += 1) {
    const li = document.createElement('li');
    li.setAttribute('class', 'card');
    li.setAttribute('data-target', 'card');
    node.appendChild(li);
  }
  const buttons = document.createElement('div');
  const leftButton = document.createElement('button');
  const rightButton = document.createElement('button');
  const testLeft = document.createTextNode('<');
  const testRight = document.createTextNode('>');

  leftButton.appendChild(testLeft);
  leftButton.setAttribute('data-action', 'slideLeft');
  leftButton.setAttribute('class', 'button');
  rightButton.appendChild(testRight);
  rightButton.setAttribute('data-action', 'slideRight');
  rightButton.setAttribute('class', 'button');
  buttons.appendChild(leftButton);
  buttons.appendChild(rightButton);
  buttons.setAttribute('class', 'button-wrapper');
  wrapper.appendChild(node);
  wrapper.appendChild(buttons);
};
const AddCSS = ({ imageSize, imagesOnCarousel, wrapperTag }) => {
  const wrapper = document.querySelector(wrapperTag);
  wrapper.setAttribute(
    'style',
    `border:1px solid white; height: ${imageSize}px;  width: ${imagesOnCarousel * imageSize +
      imagesOnCarousel}px; position: relative; overflow: hidden; margin: 0 auto;`
  );
  const node = document.querySelector('.carousel');
  node.setAttribute(
    'style',
    'margin: 0; padding: 0; list-style: none; width: 100%; display: flex; position: absolute; left: 0; transition: all 1s ease;'
  );
  const card = document.querySelectorAll('.card');
  card.forEach((ele) => {
    ele.setAttribute(
      'style',
      `background: black; min-width: ${imageSize}px; height: ${imageSize}px; margin-right: 1px; display: inline-block;`
    );
  });
  const buttons = document.querySelector('.button-wrapper');
  buttons.setAttribute(
    'style',
    `width: 100%; height: 100%; display: flex; justify-content: space-between; align-items: center; position: absolute;`
  );
  const button = document.querySelectorAll('.button');
  button.forEach((ele) => {
    ele.setAttribute('style', 'font-size: 30px; opacity: 0.5');
  });
};
const AddButtons = () => {};

const carousel = (data) => {
  const imageList = GeneratingImageData(data);
  CreateTags(data);
  AddCSS(data);
};

carousel(new Manifist());
