const projectCardTemplate = document.createElement('template');
projectCardTemplate.innerHTML = `
  <style>
    .jg-project-card{
      width: 320px;
      height: 480px;
      border: 2px solid grey;
      border-radius: 10px;
      font-family: "Segoe UI";
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      margin: 10px;
      box-shadow: 5px 10px 5px grey;
      transition: 500ms;
    }
    
    .jg-project-card:hover{
      box-shadow: 7px 12px 8px grey;
    }

    .jg-project-card__title{
      margin: 0 0 10px 0;
    }

    .jg-project-card__img{
      width: 100%;
      height: 40%;
      object-fit: cover;
      margin-bottom: 10px;
    }

    .jg-project-card__info{
      border-top: 1px solid grey;
      flex-grow: 1;
      padding-top: 10px;
    }

    .jg-project-card__tech-stack{
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      height: 40px;
    }

    .jg-project-card__links{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 60px;
    }
  </style>

  <div class="jg-project-card">
    <h2 class="jg-project-card__title">
    </h2>
    <img class="jg-project-card__img"></img>
    <div class="jg-project-card__info">
      <slot></slot>
    </div>
    <div class="jg-project-card__tech-stack">
    </div>
    <div class="jg-project-card__links">
    </div>
	</div>
`;

class JgProjectCard extends HTMLElement {
  projectUrl = undefined;
  demoUrl = undefined;
  
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(projectCardTemplate.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['title', 'img', 'project-url', 'demo-url', 'tech-stack'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'title') {
		  this.shadowRoot.querySelector(
        '.jg-project-card__title'
      ).innerText = newValue;
    }
    if (name == 'img') {
		  this.shadowRoot.querySelector(
        '.jg-project-card__img'
      ).setAttribute('src', newValue);
    }
    if (name == 'project-url') {
		  this.projectUrl = newValue;
      this.updateLinks();
    }
    if (name == 'demo-url') {
		  this.demoUrl = newValue;
      this.updateLinks();
    }
    if (name == 'tech-stack') {
      this.updateTechStack(newValue);
    }
  }

  updateLinks(){
    const linksElement = this.shadowRoot.querySelector('.jg-project-card__links');
    linksElement.innerHTML = '';

    if(this.projectUrl!==undefined){
      this.addLinkButton(linksElement, 'View code', this.projectUrl, 'github');
    }

    if(this.demoUrl!==undefined){
      this.addLinkButton(linksElement, 'Try it', this.demoUrl, 'launch');
    }
  }

  addLinkButton(linksContainer, text, href, icon){
    createChild(linksContainer, 'jg-link-button', {text, href, icon});
  }

  updateTechStack(techStack){
    const techStackElement = this.shadowRoot.querySelector('.jg-project-card__tech-stack');
    techStackElement.innerHTML = 'Tech stack:';

    techStack.split(',').map(x=>x.trim()).forEach(techType => {
      createChild(techStackElement, 'jg-tech-icon', {type: techType});
    });
  }
}

window.customElements.define('jg-project-card', JgProjectCard);
