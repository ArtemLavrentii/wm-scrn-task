export default function el(elementType, props = {}, childs = []) {
  const element = global.document.createElement(elementType);
  Object.assign(element, props);
  childs.forEach((child) => element.appendChild(child));
  return element;
}
