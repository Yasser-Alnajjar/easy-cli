#!/usr/bin/env
import { Command } from "commander";
import inquirer from "inquirer";
import fs from "node:fs";
const questions = [
  { name: "name", type: "input", message: "Write Component Name." },
  {
    name: "path",
    type: "input",
    message: "Write the path you want to send files on it.",
  },
  {
    name: "ts",
    type: "confirm",
    message: "Do you use typescript ?",
  },
  {
    name: "styleLang",
    type: "list",
    message: "What you style language you use ?",
    choices: ["css", "styl", "less", "sass", "scss"],
  },
  {
    name: "framework",
    type: "list",
    message: "choose a framework name.",
    choices: ["react", "vue"],
  },
];
const program = new Command();

program
  .name("component-generator")
  .description(
    "This is a very small library that helps you create your own component files without having to do it yourself manually"
  )
  .version("1.0.0");

program
  .command("generate")
  .alias("g")
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      let path;
      if (answers.path.startsWith("./")) {
        path = answers.path;
      } else if (answers.path.startsWith("/")) {
        path = `.${answers.path}`;
      } else {
        path = `./${answers.path}`;
      }

      if (!fs.existsSync(`${path}/${answers.name}`)) {
        createFolder(
          path,
          answers.name,
          answers.framework,
          answers.ts,
          answers.styleLang
        );
      } else {
        console.log(`${answers.name} component already exists!`);
      }
    });
  });

program.parse(process.argv);

function createFolder(path, name, framework, ts, styleLang) {
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
function createFiles(path, name, framework, ts, styleLang) {
  let extension;
  if (framework === "vue") {
    extension = ".vue";
    fs.writeFile(
      `${path}/${capitalize(name)}/${capitalize(name)}${extension}`,
      `<template>
</template>
<script ${ts ? 'lang="ts"' : ""}>
export default {
  data() {
    return {}
  }
}
</script>
<style ${styleLang !== "css" ? `lang="${styleLang}"` : ""}></style>`,
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
      `${path}/${capitalize(name)}/${capitalize(name)}${extension}`,
      `${
        ts
          ? `interface IProps {};
export default function ${capitalize(name)}(props:IProps) {
  return <div></div>;
}`
          : `export default function ${capitalize(name)}() {
  return <div></div>;
}`
      }`,
      "utf8",
      (error) => {
        if (error !== null) {
          console.log("error", error);
        }
      }
    );
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
  console.log(`Component "${name}" created successfully.`);
}

// utils
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
