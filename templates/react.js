import capitalize from "../utils/capitalize.js";

export default function reactTemplate(typescript, name) {
  if (typescript) {
    console.log("typescript", true);
    return `interface IProps{}

export default function ${capitalize(name)}({}:IProps) {
  return (
    <div>${capitalize(name)}</div>
  )
}`;
  } else {
    return `export default function ${capitalize(name)}() {
  return (
    <div>${capitalize(name)}</div>
  )
}`;
  }
}
