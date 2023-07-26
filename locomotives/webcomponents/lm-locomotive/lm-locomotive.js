const locomotiveTemplate = document.createElement("template");
locomotiveTemplate.innerHTML = `
  <style>
    .lm-locomotive{
      width: 320px;
      height: 480px;
      border: 2px solid grey;
      border-radius: 10px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      margin: 10px;
      box-shadow: 5px 10px 5px grey;
      transition: 500ms;
    }
    
    .lm-locomotive:hover{
      box-shadow: 7px 12px 8px grey;
    }
	
	.lm-locomotive__header{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin: 0 0 10px 0;
	}

    .lm-locomotive__title{
		margin: 0;
    }
	
	
	.lm-locomotive__flag{
		width: 30px;
		aspect-ratio: 4 / 3;
	}

    .lm-locomotive__images{
      width: 100%;
      height: 40%;
      margin-bottom: 10px;
      overflow: hidden;
      position: relative;
    }

    .lm-locomotive__images:hover .lm-locomotive__image_btn{
      display: flex;
    }

    .lm-locomotive__image_btn{
      display: none;
      height: 100%;
      z-index: 1;
      position: absolute;
      background-color: rgba(100,100,100,0.5);
      color: white;
      font-size: 24px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 20px;
    }

    .lm-locomotive__image_btn:hover{
      font-size: 28px;
    }

    .lm-locomotive__image_btn--right{
      right: 0;
    }

    .lm-locomotive__img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: zoom-in;
      position: relative;
      top: calc(-100% * var(--image-shown));
    }

    .lm-locomotive__img:focus{
      position: fixed;
      width: min(120vh, 90vw);
      height: min(90vh, 67.5vw);
      top: calc((100% - min(90vh, 67.5vw)) / 2);
      left:calc((100% - min(120vh, 90vw)) / 2);
      z-index: 1;
    }

    .lm-locomotive__info{
      border-top: 1px solid grey;
      flex-grow: 1;
      padding-top: 10px;
    }
  </style>

  <div class="lm-locomotive">
	<div class="lm-locomotive__header">
		<h2 class="lm-locomotive__title">
		</h2>
  <img class="lm-locomotive__flag"></img>
  </div>
	<div id="images_div" class="lm-locomotive__images" style="--image-count: 1;--image-shown: 0;">
  <div id="prev_image_btn" class="lm-locomotive__image_btn">
    <
  </div>
  <div id="next_image_btn" class="lm-locomotive__image_btn lm-locomotive__image_btn--right">
    >
  </div>
  </div>
  <div class="lm-locomotive__info">
  </div>
  </div>
`;

class LmLocomotive extends HTMLElement {
  imageCount = 1;
  imageShown = 0;

  imagesDiv = undefined;
  prevImageBtn = undefined;
  nextImageBtn = undefined;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(locomotiveTemplate.content.cloneNode(true));

    this.imagesDiv = this.shadowRoot.getElementById("images_div");
    this.prevImageBtn = this.shadowRoot.getElementById("prev_image_btn");
    this.nextImageBtn = this.shadowRoot.getElementById("next_image_btn");

    this.prevImageBtn.addEventListener("click", () => {
      this.imageShown =
        (this.imageShown + this.imageCount - 1) % this.imageCount;
      this.updateCssVars();
    });
    this.nextImageBtn.addEventListener("click", () => {
      this.imageShown =
        (this.imageShown + this.imageCount + 1) % this.imageCount;
      this.updateCssVars();
    });
  }

  static get observedAttributes() {
    return ["title", "country", "images", "info"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "title") {
      this.shadowRoot.querySelector(".lm-locomotive__title").innerText =
        newValue;
    }
    if (name == "country") {
      let flagUrl = `https://flagicons.lipis.dev/flags/4x3/${newValue}.svg`;

      if (["dd", "yu"].includes(newValue)) {
        flagUrl = `./assets/flags/${newValue}.svg`;
      }
      this.shadowRoot
        .querySelector(".lm-locomotive__flag")
        .setAttribute("src", flagUrl);
    }
    if (name == "images") {
      const imageUrls = newValue
        .split(",")
        .map((image) => `./assets/${image}.jpg`);

      this.imageCount = imageUrls.length;
      this.imageShown = 0;
      this.updateCssVars();

      imageUrls.forEach((imageUrl) => {
        const imgElement = document.createElement("img");
        setAttributes(imgElement, {
          class: `lm-locomotive__img`,
          tabindex: 0,
          src: imageUrl,
        });
        this.imagesDiv.appendChild(imgElement);
      });
    }
    if (name == "info") {
      this.shadowRoot.querySelector(".lm-locomotive__info").innerText =
        newValue;
    }
  }

  updateCssVars() {
    this.imagesDiv.style.setProperty("--image-count", this.imageCount);
    this.imagesDiv.style.setProperty("--image-shown", this.imageShown);
  }
}

window.customElements.define("lm-locomotive", LmLocomotive);
