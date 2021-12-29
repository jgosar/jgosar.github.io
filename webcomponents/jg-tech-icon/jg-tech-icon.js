const techIconTemplate = document.createElement('template');
techIconTemplate.innerHTML = `
  <style>
    .jg-tech-icon{
      margin-left: 4px;
    }
    .jg-tech-icon img{
      width: 24px;
      height: 24px;
    }
  </style>
  <a class="jg-tech-icon" href="https://angular.io/" title="Angular" target="_blank">
    <img src="./assets/icons/angular.svg"></img>
  </a>
`;

class JgTechIcon extends HTMLElement {
  CONFIG = {
    angular: {
      title: 'Angular',
      icon: './assets/icons/angular.svg',
      homepage: 'https://angular.io/',
    },
    typescript: {
      title: 'Typescript',
      icon: './assets/icons/typescript.svg',
      homepage: 'https://www.typescriptlang.org/',
    },
    csharp: {
      title: 'C#',
      icon: './assets/icons/csharp.svg',
      homepage: 'https://docs.microsoft.com/en-us/dotnet/csharp/',
    },
    elm: {
      title: 'Elm',
      icon: './assets/icons/elm.svg',
      homepage: 'https://elm-lang.org/',
    },
    react: {
      title: 'React',
      icon: './assets/icons/react.svg',
      homepage: 'https://reactjs.org/',
    },
  };

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(techIconTemplate.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'type') {
      const iconConfig = this.CONFIG[newValue];
      const linkElement = this.shadowRoot.querySelector('.jg-tech-icon');
      linkElement.innerHTML = '';
      linkElement.setAttribute('href', iconConfig.homepage);
      linkElement.setAttribute('title', iconConfig.title);
      
      const iconElement = document.createElement('img');
      iconElement.setAttribute('src', iconConfig.icon);
      linkElement.appendChild(iconElement);
    }
  }
}

window.customElements.define('jg-tech-icon', JgTechIcon);
