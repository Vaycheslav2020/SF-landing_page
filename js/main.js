const items = document.querySelectorAll(".menu__item");
items.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    let num = item.getAttribute("href");
    let elem = document.querySelector(num);
    elem.scrollIntoView({
      behavior: "smooth",
    });
  });
});

class slider {
  constructor(sliderWrap, ...arg) {
    if ([...arg].length) {
      this.options = Object.assign(...arg);
    } else {
      this.options = {
        prev: ".slide-prev",
        next: ".slide-next",
        dots: false,
        dotsWrap: ".dots",
        autoplay: true,
        interval: 4000,
        tabs: false,
      };
    }
    this.updateInfo = this.options.updateInfo;

    this.wrapper = document.querySelector(sliderWrap);
    this.sliderDots = document.querySelector(this.options.dotsWrap);
    this.sliderTabs = document.querySelector(this.options.tabs);
    this.sliderImages = this.wrapper.querySelectorAll(".slide");

    this.PREV = document.querySelector(this.options.prev);
    this.NEXT = document.querySelector(this.options.next);
  }

  initSlider() {
    this.sliderImages.forEach((image, index) => {
      image.dataset.index = index;
      image.classList.add("n" + index);
    });
    this.addEventArrows();
    this.initDots();
    this.initAuto();
    this.initTabs();
    this.initUpdateInfo();
  }

  addEventArrows() {
    let nextNumber;
    this.PREV.addEventListener("click", () => {
      let indexEl = +this.wrapper.querySelector(".__active").dataset.index;
      nextNumber = indexEl === 0 ? this.sliderImages.length - 1 : indexEl - 1;
      this.moveSlider(nextNumber);
    });
    this.NEXT.addEventListener("click", () => {
      let indexEl = +this.wrapper.querySelector(".__active").dataset.index;
      nextNumber = indexEl === this.sliderImages.length - 1 ? 0 : indexEl + 1;
      this.moveSlider(nextNumber);
    });
  }

  initTabs() {
    if (this.options.tabs === false) {
      console.log("tabs false");
      return;
    }
    this.sliderTabs.querySelectorAll(".tab").forEach((tab, index) => {
      tab.dataset.index = index;
      tab.classList.add(`n${index}`);
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        this.moveSlider(+e.target.dataset.index);
      });
    });
  }

  initUpdateInfo() {
    if (this.options.updateInfo === undefined) {
      console.log("updateInfo false");
      return;
    }
    
    this.updateInfo.forEach((item) => {
      let items = document.querySelectorAll(item)
      items.forEach((itemText, index) => {
        itemText.dataset.index = index;
        itemText.classList.add(`n${index}`);
        itemText.style.display = "none";
      });
      items[0].style.display = "block"
    });
  }

  initDots() {
    if (this.options.dots === false) {
      console.log("dots false");
      return;
    }
    this.sliderImages.forEach((image, index) => {
      let dot = `<div class="dot n${index} ${
        index === 0 ? "__active" : ""
      }" data-index="${index}"></div>`;
      this.sliderDots.innerHTML += dot;
    });

    this.sliderDots.querySelectorAll(".dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        this.moveSlider(+e.target.dataset.index);
      });
    });
  }

  moveSlider(index) {
    this.wrapper.querySelector(".__active").classList.remove("__active");
    this.sliderImages[index].classList.add("__active");

    if (this.options.updateInfo !== undefined) {
      this.updateInfo.forEach((item) => {
        let items = document.querySelectorAll(item);
        items.forEach((textItem) => {
          textItem.style.display = "none";
        });
        items[index].style.display = "block";
      });
    }

    if (this.options.tabs !== false) {
      this.sliderTabs.querySelector(".active").classList.remove("active");
      this.sliderTabs.querySelector(".n" + index).classList.add("active");
    }

    if (this.options.dots === true) {
      this.sliderDots.querySelectorAll(".dot").forEach((dot) => {
        dot.classList.remove("prev-slide");
        dot.classList.remove("next-slide");
      });

      this.sliderDots.querySelector(".__active").classList.remove("__active");
      this.sliderDots.querySelector(".n" + index).classList.add("__active");
      this.sliderDots
        .querySelector(
          ".n" + (index === 0 ? +this.sliderImages.length - 1 : index - 1)
        )
        .classList.add("prev-slide");
      this.sliderDots
        .querySelector(
          ".n" + (index === +this.sliderImages.length - 1 ? 0 : index + 1)
        )
        .classList.add("next-slide");
    }
  }

  initAuto() {
    const intervalFunc = () => {
      let curNumber = +this.wrapper.querySelector(".__active").dataset.index;
      let nextNumber =
        curNumber === this.sliderImages.length - 1 ? 0 : curNumber + 1;
      this.moveSlider(nextNumber);
    };

    if (this.options.autoplay === false) return;

    let ID = setInterval(intervalFunc, this.options.interval);

    this.wrapper.addEventListener("mouseover", () => {
      clearInterval(ID);
    });
    this.wrapper.addEventListener("mouseout", () => {
      ID = setInterval(intervalFunc, this.options.interval);
    });
  }
}

if (window.matchMedia("(min-width: 1200px)").matches) {
  const initSlider = new slider(".completed-projects__slides", {
    prev: ".slide-prev",
    next: ".slide-next",
    dots: true,
    dotsWrap: ".completed__control-dots",
    autoplay: true,
    interval: 3000,
    tabs: ".completed-projects__tabs",
    updateInfo: [
      ".completed-info__city",
      ".completed-info__area",
      ".completed-info__time",
      ".completed-info__cost",
    ],
  });
  initSlider.initSlider();
} else {
  const initMobileSlider = new slider(".mobile-slider", {
    prev: ".slide-left-0",
    next: ".slide-right-0",
    dots: false,
    autoplay: false,
    tabs: false,
    updateInfo: [
      ".completed-info__city",
      ".completed-info__area",
      ".completed-info__time",
      ".completed-info__cost",
    ],
  });
  initMobileSlider.initSlider();

  const initTwoMobileSlider = new slider(".fantasies-slider", {
    prev: ".slide-left-1",
    next: ".slide-right-1",
    dots: false,
    autoplay: false,
    tabs: false,
    updateInfo: undefined
  })
  initTwoMobileSlider.initSlider()
}
