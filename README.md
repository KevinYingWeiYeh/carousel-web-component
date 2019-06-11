# ReadMe:

github: https://github.com/KevinYingWeiYeh/carousel-web-component

## What is it

This is a interview coding challange project for carousel component in vanilla javascript with 4 images at a time with two buttons left and right

## How should I make it

1> add a tag on index.html as an root anchor, the default class name is `wrapper`
2> add a script tag AFTER the root anchor

## How should I customized Carousel component

Carousel accept 5 parameters
1> imageSize: image size only can be a square between 50 to 250 pixel. Default is 150 pixel
2> imagesOnCarousel: images on carousel can be shown between 1 to 10. Default is 4 images
3> imageQuantity: totall images in carousel, and it should to be ( n \* `imagesOnCarousel` ). Deafult is 16 images
4> wrapperTag: the root anchor to allow component to display the carousel. Default is 'wrapper'
5> imageList: image list should be an Array with http strings. Notice that default image list auto generate by `imageQuantity` from 'https://picsum.photos'
