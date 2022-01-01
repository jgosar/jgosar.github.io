function setAttributes(element, attributeMap){
  Object.entries(attributeMap).forEach(([attributeName, attributeValue])=>
    element.setAttribute(attributeName, attributeValue)
  );
}

function createElement(elementType, attributeMap){
  const element = document.createElement(elementType);
  setAttributes(element, attributeMap);
  return element;
}

function createChild(parentElement, elementType, attributeMap){
  const childElement = createElement(elementType, attributeMap);
  parentElement.appendChild(childElement);
}
