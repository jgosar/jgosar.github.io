const projectCardTemplate = document.createElement("template");
projectCardTemplate.innerHTML = `
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

    .lm-locomotive__img{
      width: 100%;
      height: 40%;
      object-fit: cover;
      margin-bottom: 10px;
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
    <img class="lm-locomotive__img"></img>
    <div class="lm-locomotive__info">
    </div>
  </div>
`;

class LmLocomotive extends HTMLElement {
  projectUrl = undefined;
  demoUrl = undefined;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(projectCardTemplate.content.cloneNode(true));
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

      this.shadowRoot
        .querySelector(".lm-locomotive__img")
        .setAttribute("src", imageUrls[0]);
    }
    if (name == "info") {
      this.shadowRoot.querySelector(".lm-locomotive__info").innerText =
        newValue;
    }
  }
}

window.customElements.define("lm-locomotive", LmLocomotive);
