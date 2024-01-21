import capitalize from "../utils/capitalize.js";

export default function reactTemplate(typescript, name, style) {
  if (typescript) {
    return `${
      style ? `import ${name} from './${name}.${style}'` : null
    }interface IProps{}
export default function ${capitalize(name)}({}:IProps) {
  return (
    <div>${capitalize(name)}</div>
  )
}`;
  } else {
    return `${style ? `import ${name} from './${name}.${style}'` : null}
export default function ${capitalize(name)}({}:IProps) {
  return (
    <div>${capitalize(name)}</div>
  )
}`;
  }
}
