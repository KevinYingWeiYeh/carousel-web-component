// # ReadMe:
// github: https://github.com/KevinYingWeiYeh/carousel-web-component
// ## What is it
// This is a interview coding challange project for carousel component in vanilla javascript with 4 images at a time with two buttons left and right
// ## How should I make it
// 1> add a tag on index.html as an root anchor, the default class name is 'wrapper'
// 2> add a script tag AFTER the root anchor
// ## How should I customized Carousel component
// Carousel accept 5 parameters
// 1> imageSize: image size only can be a square between 50 to 250 pixel. Default is 150 pixel
// 2> imagesOnCarousel: images on carousel can be shown between 1 to 10. Default is 4 images
// 3> imageQuantity: totall images in carousel, and it should to be ( n * ```imagesOnCarousel``` ). Deafult is 16 images
// 4> wrapperTag: the root anchor to allow component to display the carousel. Default is 'wrapper'
// 5> imageList: image list should be an Array with http strings. Notice that default image list auto generate by ```imageQuantity``` from 'https://picsum.photos'

class Carousel {
  constructor(imageSize = 150, imagesOnCarousel = 4, imageQuantity = 16, wrapperTag = '.wrapper', imageList = []) {
    this.imageSize = imageSize;
    this.imagesOnCarousel = imagesOnCarousel;
    this.imageQuantity = imageQuantity;
    this.wrapperTag = wrapperTag;
    this.imageList = imageList;
    this.continueCode = [true];
  }

  GeneratingImageData = () => {
    if (!this.imagesOnCarousel || this.imagesOnCarousel < 1 || this.imageSize < 50 || this.imageSize > 250) {
      continueCode.push(
        'Error: imagesOnCarouse is undefied or smaller than one or ImageSize smaller than 50 or bigger than 250 pixel'
      );
      continueCode[0] = false;
    } else {
      for (let i = 0; i < this.imageQuantity; i += 1) {
        this.imageList.push(
          `https://picsum.photos/id/${Math.round(Math.random() * 1000)}/${this.imageSize}/${this.imageSize}`
        );
      }
    }
  };

  CreateTags = () => {
    if ((!this.imageQuantity && !this.wrapperTag) || this.wrapperTag < this.imagesOnCarousel) {
      this.continueCode.push(
        'Error: imageQuantity &  wrapperTag variables have to be in manifist or wrapperTag smaller than imagesOnCarousel'
      );
      continueCode[0] = false;
    } else {
      const wrapper = document.querySelector(this.wrapperTag);
      const node = document.createElement('ul');
      node.setAttribute('class', 'carousel');
      node.setAttribute('data-target', 'carousel');
      for (let i = 0; i < this.imageQuantity; i += 1) {
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
    }
  };

  AddCSS = () => {
    if (!this.wrapperTag || !document.querySelector(this.wrapperTag)) {
      this.continueCode.push('Error: wrapperTag is empty or root anchor can not be found on HTML file ');
      continueCode[0] = false;
    } else {
      const wrapper = document.querySelector(this.wrapperTag);
      wrapper.setAttribute(
        'style',
        `border:1px solid white; height: ${this.imageSize}px;  width: ${this.imagesOnCarousel * this.imageSize +
          this.imagesOnCarousel}px; position: relative; overflow: hidden; margin: 0 auto;`
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
          `background: black; min-width: ${this.imageSize}px; height: 
                ${this.imageSize}px; margin-right: 1px; display: inline-block;`
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
    }
  };

  AddImages = () => {
    if (this.imageList.length !== this.imageQuantity) {
      this.continueCode.push('Error: Generating image process fails');
      continueCode[0] = false;
    } else {
      const card = document.querySelectorAll('.card');
      card.forEach((ele, index) => {
        const image = document.createElement('img');
        image.setAttribute('src', this.imageList[index]);
        ele.appendChild(image);
      });
    }
  };

  MakeRunable = () => {
    if (this.continueCode[0]) {
      const carousel = document.querySelector("[data-target='carousel']");
      const card = carousel.querySelector("[data-target='card']");
      const leftButton = document.querySelector("[data-action='slideLeft']");
      const rightButton = document.querySelector("[data-action='slideRight']");
      const carouselWidth = carousel.offsetWidth;
      const cardStyle = card.currentStyle || window.getComputedStyle(card);
      const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);
      const cardCount = carousel.querySelectorAll("[data-target='card']").length;
      let offset = 0;
      const maxX = -(
        (cardCount / this.imagesOnCarousel) * carouselWidth +
        cardMarginRight * (cardCount / this.imagesOnCarousel) -
        carouselWidth -
        cardMarginRight
      );

      leftButton.addEventListener('click', () => {
        if (offset !== 0) {
          offset += carouselWidth + cardMarginRight;
          carousel.style.transform = `translateX(${offset + this.imagesOnCarousel - 1}px)`;
        }
      });

      rightButton.addEventListener('click', () => {
        if (offset > maxX) {
          offset -= carouselWidth + cardMarginRight;
          carousel.style.transform = `translateX(${offset + this.imagesOnCarousel - 1}px)`;
        }
      });
    }
  };

  start = () => {
    if (this.imageList.length === 0) this.GeneratingImageData();
    this.CreateTags();
    this.AddCSS();
    this.AddImages();
    this.MakeRunable();

    // Error message printering process
    if (this.continueCode[0] === false) {
      for (let i = 1; i < this.continueCode.length; i += 1) {
        // in a real app this should be handled by logger
        console.error(this.continueCode[i]);
      }
    }
  };
}

const carousel = new Carousel();
carousel.start();
