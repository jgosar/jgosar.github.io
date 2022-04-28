const wct3dSceneTemplate = document.createElement("template");
wct3dSceneTemplate.innerHTML = `
	<style>
		.wrapper {
		  --perspective: 50vw;
		  position: absolute;
		  height: 100vh;
		  width: 100vw;
		  overflow: hidden;
		  perspective: var(--perspective); 
		  background: linear-gradient(
			180deg,
			rgba(9, 154, 221, 1) 0%,
			rgba(0, 212, 255, 1) 20%,
			rgba(0, 255, 29, 1) 50%
		  );
		  --saturation: 90%;
		}

		.three-d-container {
		  transform-style: preserve-3d;
		  display: block;
		}

		.animated {
		  transition: 0.5s linear;
		}

		.translated-to-screen-centre {
		  transform: translate3d(50vw, 50vh, var(--perspective)) rotateX(var(--camera-rotation-x)) rotateY(var(--camera-rotation-y));
		  position: absolute;
		  z-index: 1;
		}
	</style>
	<div class="wrapper">
		<div id="translated-to-screen-centre" class="three-d-container animated translated-to-screen-centre">
			<div id="translated-to-camera-pos" class="three-d-container animated">
				<slot></slot>
			</div>
		</div>
	</div>
`;

class Wct3dScene extends HTMLElement {
  cameraPosition = { x: "0", y: "0", z: "0" };
  cameraAngle = { x: "0", y: "0" };

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(wct3dSceneTemplate.content.cloneNode(true));
    this.updateCameraPosition({});
  }

  static get observedAttributes() {
    return [
      "camera-x",
      "camera-y",
      "camera-z",
      "camera-anglex",
      "camera-angley",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (["camera-x", "camera-y", "camera-z"].includes(name)) {
      const dimension = name.split("-")[1];
      this.updateCameraPosition({ [dimension]: newValue });
    }
    if (["camera-anglex", "camera-angley"].includes(name)) {
      const dimension = name.replace("camera-angle", "");
      this.updateCameraAngle({ [dimension]: newValue });
    }
  }

  updateCameraPosition(positionChanges) {
    this.cameraPosition = {
      ...this.cameraPosition,
      ...positionChanges,
    };

    this.shadowRoot
      .querySelector("#translated-to-camera-pos")
      .style.setProperty(
        "transform",
        `translate3d(${this.negateNumber(
          this.cameraPosition.x
        )}em, ${this.negateNumber(
          this.cameraPosition.y
        )}em, ${this.negateNumber(this.cameraPosition.z)}em)`
      );
  }

  updateCameraAngle(angleChanges) {
    this.cameraAngle = {
      ...this.cameraAngle,
      ...angleChanges,
    };

    this.shadowRoot
      .querySelector("#translated-to-screen-centre")
      .style.setProperty("--camera-rotation-x", `${this.cameraAngle.x}deg`);
    this.shadowRoot
      .querySelector("#translated-to-screen-centre")
      .style.setProperty("--camera-rotation-y", `${this.cameraAngle.y}deg`);
  }

  negateNumber(numberString) {
    if (numberString.startsWith("-")) {
      return numberString.substring(1);
    } else {
      return `-${numberString}`;
    }
  }
}

window.customElements.define("wct-3d-scene", Wct3dScene);
