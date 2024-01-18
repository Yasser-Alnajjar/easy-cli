import capitalize from "./capitalize.js";
import createFiles from "./createFiles.js";
import fs from "node:fs";

export default function createFolder(path, name, framework, ts, styleLang) {
  try {
    if (name === "") {
      console.error("Component name cannot be empty !");
    } else {
      fs.mkdirSync(`${path}/${capitalize(name)}`);
      createFiles(path, name, framework, ts, styleLang);
    }
  } catch (error) {
    console.error(`Error creating component: ${error}`);
  }
}
