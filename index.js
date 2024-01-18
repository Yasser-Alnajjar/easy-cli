#!/usr/bin/env node

import { Command } from "commander";

import { getCLIConfigFile } from "./utils/generateConfig.js";
import initComponent from "./commands/initComponent.js";

async function main() {
  const cliConfigFile = await getCLIConfigFile();

  const program = new Command();
  initComponent(cliConfigFile, program);
}
main();
