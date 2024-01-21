import fs from "node:fs";

import reactTemplate from "../templates/react.js";
import vueTemplate from "../templates/vue.js";
import capitalize from "./capitalize.js";

export default function createFiles(path, name, framework, typescript, style) {
  let extension;
  if (framework === "vue") {
    extension = ".vue";
    fs.writeFile(
      `${path}/${capitalize(name)}/index${extension}`,
      vueTemplate(typescript, style),
      "utf8",
      (error) => {
        if (error !== null) {
          console.log("error", error);
        }
      }
    );
  } else if (framework === "react") {
    if (typescript) {
      extension = ".tsx";
    } else {
      extension = ".jsx";
    }

    fs.writeFile(
      `${path}/${capitalize(name)}/index${extension}`,
      reactTemplate(typescript, name, style),
      "utf8",
      (error) => {
        if (error !== null) {
          console.log("error", error);
        }
      }
    );
    if (style !== "none") {
      fs.writeFile(
        `${path}/${capitalize(name)}/${capitalize(name)}.${style}`,
        ``,
        "utf8",
        (error) => {
          if (error !== null) {
            console.log("error", error);
          }
        }
      );
    }
  }

  console.log(`Component "${name}" created successfully.`);
}
