import fs from "node:fs";

import reactTemplate from "../templates/react.js";
import vueTemplate from "../templates/vue.js";
import capitalize from "./capitalize.js";

export default function createFiles(path, name, framework, ts, styleLang) {
  let extension;
  if (framework === "vue") {
    extension = ".vue";
    fs.writeFile(
      `${path}/${capitalize(name)}/index${extension}`,
      vueTemplate(ts, styleLang),
      "utf8",
      (error) => {
        if (error !== null) {
          console.log("error", error);
        }
      }
    );
  } else if (framework === "react") {
    if (ts) {
      extension = ".tsx";
    } else {
      extension = ".jsx";
    }

    fs.writeFile(
      `${path}/${capitalize(name)}/index${extension}`,
      reactTemplate(ts, name, styleLang),
      "utf8",
      (error) => {
        if (error !== null) {
          console.log("error", error);
        }
      }
    );
    if (styleLang !== "none") {
      fs.writeFile(
        `${path}/${capitalize(name)}/${capitalize(name)}.${styleLang}`,
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
