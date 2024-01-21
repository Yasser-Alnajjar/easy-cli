import createFolder from "../utils/createFolder.js";
const localRequire = createRequire(import.meta.url);
const pkg = localRequire("../package.json");
import { createRequire } from "module";
import inquirer from "inquirer";
import fs from "node:fs";

const questions = [
  { name: "name", type: "input", message: "Write Component Name." },
  {
    name: "path",
    type: "input",
    message: "Write the path you want to send files on it.",
    default: () => "src/components",
  },
  {
    name: "typescript",
    type: "confirm",
    message: "Do you want to use typescript ?",
  },
  {
    name: "style",
    type: "list",
    message: "What you style language you use ?",
    choices: ["css", "styl", "less", "scss", "none"],
  },
  {
    name: "framework",
    type: "list",
    message: "choose a framework name.",
    choices: ["react", "vue"],
  },
];
export default function initComponent(cliConfigFile, program) {
  program
    .name("component-generator")
    .description(
      "This is a very small library that helps you create your own component files without having to do it yourself manually"
    )
    .version(pkg.version);

  program
    .command("generate [names...]")
    .alias("g")
    .action((name) => {
      let path;
      if (cliConfigFile.path.startsWith("./")) {
        path = cliConfigFile.path;
      } else if (cliConfigFile.path.startsWith("/")) {
        path = `.${cliConfigFile.path}`;
      } else {
        path = `./${cliConfigFile.path}`;
      }
      if (!fs.existsSync(path)) {
        if (path.includes("src")) {
          fs.mkdir("src", (e) => {
            console.log(e);
          });
        }
        if (path.includes("components")) {
          fs.mkdir("src/components", (e) => {
            console.log(e);
          });
        }
      }
      if (!fs.existsSync(`${path}/${name[0]}`)) {
        createFolder(
          path,
          name[0],
          cliConfigFile.framework,
          cliConfigFile.ts,
          cliConfigFile.style
        );
      } else {
        console.log(`${name[0]} component already exists!`);
      }
    });

  program.parse(process.argv);
}
