import chalk from "chalk";

import deepKeys from "deep-keys";
import inquirer from "inquirer";
import fsExtra from "fs-extra";

const { accessSync, constants, outputFileSync, readFileSync } = fsExtra;
const { prompt } = inquirer;

const questions = [
  {
    name: "typescript",
    type: "confirm",
    message: "Do you want to use typescript ?",
  },
  {
    name: "path",
    type: "input",
    message: "Write the path you want to send files on it.",
    default: () => "src/components",
  },
  {
    name: "framework",
    type: "list",
    message: "choose a framework you want.",
    choices: ["react", "vue"],
  },
  {
    name: "style",
    type: "list",
    message: "What you style language you use ?",
    choices: ["css", "styl", "less", "scss", "none"],
  },
];

async function createCLIConfigFile() {
  try {
    console.log();
    console.log();
    console.log(
      chalk.bold(
        chalk.magenta(
          "It looks like this is the first time that you're running easy-cli-cp within this project."
        )
      )
    );
    console.log();
    console.log(
      chalk.bold(
        chalk.magenta(
          'Answer a few questions to customize easy-cli-cp for your project needs (this will create a "easy-cli-cp.config.json" config file on the root level of this project).'
        )
      )
    );
    console.log();
    console.log();

    const answers = await prompt(questions);

    outputFileSync("easy-cli-cp.config.json", JSON.stringify(answers, null, 2));

    console.log();
    console.log(
      chalk.cyan(
        'The "easy-cli-cp.config.json" config file has been successfully created on the root level of your project.'
      )
    );

    return answers;
  } catch (error) {
    console.error(
      chalk.red.bold(
        'ERROR: Could not create a "easy-cli-cp.config.json" config file.'
      )
    );
    return error;
  }
}

async function updateCLIConfigFile(missingConfigQuestions, currentConfigFile) {
  try {
    console.log("");
    console.log(
      chalk.cyan(
        "------------------------------------------------------------------------------------------------------------------------------"
      )
    );
    console.log(
      chalk.cyan(
        "Easy cli cp has been updated and has a few new features from the last time you ran it within this project."
      )
    );
    console.log("");
    console.log(
      chalk.cyan(
        'Please answer a few questions to update the "easy-cli-cp.config.json" config file.'
      )
    );
    console.log(
      chalk.cyan(
        "------------------------------------------------------------------------------------------------------------------------------"
      )
    );
    console.log("");

    const answers = await prompt(missingConfigQuestions);
    const updatedAnswers = merge({}, currentConfigFile, answers);

    outputFileSync(
      "easy-cli-cp.config.json",
      JSON.stringify(updatedAnswers, null, 2)
    );

    console.log();
    console.log(
      chalk.cyan(
        'The ("easy-cli-cp.config.json") has successfully updated for this project.'
      )
    );

    console.log();
    console.log(
      chalk.cyan("You can always go back and manually update it as needed.")
    );
    console.log();
    console.log(chalk.cyan("Happy Hacking!"));
    console.log();
    console.log();

    return updatedAnswers;
  } catch (error) {
    console.error(
      chalk.red.bold(
        'ERROR: Could not update the "easy-cli-cp.config.json" config file.'
      )
    );
    return error;
  }
}

export async function getCLIConfigFile() {
  try {
    accessSync("./package.json", constants.R_OK);

    // --- Check to see if the config file exists

    try {
      accessSync("./easy-cli-cp.config.json", constants.R_OK);
      const currentConfigFile = JSON.parse(
        readFileSync("./easy-cli-cp.config.json")
      );

      const missingConfigQuestions = questions.filter(
        (question) =>
          !deepKeys(currentConfigFile).includes(question.name) &&
          (question.when ? question.when(currentConfigFile) : true)
      );

      if (missingConfigQuestions.length) {
        return await updateCLIConfigFile(
          missingConfigQuestions,
          currentConfigFile
        );
      }

      return currentConfigFile;
    } catch (e) {
      return await createCLIConfigFile();
    }
  } catch (error) {
    console.error(
      chalk.red.bold(
        "ERROR: Please make sure that you're running the easy-cli-cp commands from the root level of your project"
      )
    );
    return process.exit(1);
  }
}
