let galleryListItems = document.querySelectorAll(".slide")
// let gallery = document.getElementsByClassName("gallery__item")
let gallery = document.querySelector(".js-gallery")



let slideWidth = galleryListItems[0].offsetWidth;
let slideCount = galleryListItems.length;


setInterval(transitionSlide, 5000)
let currentSlide = 1;

// let time = setInterval

function transitionSlide(){
  console.log("Called!")
  // gallery.style.transform = "translateX(-1000px)"


if(currentSlide < slideCount) {

  let delta = -1 * slideWidth * slideCount;
  gallery.style.transform = `translateX(${delta}px)`
  currentSlide++
} else {
  gallery.style.transform = 'translateX(0px)'
  currentSlide = 1
}

}

transitionSlide()