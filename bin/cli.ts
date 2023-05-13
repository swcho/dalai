#! /usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { Dalai } from '../DalaiRoot';
import { start } from './web';

async function main() {
  const argv = await yargs(hideBin(process.argv)).argv;
  const cmd = argv._[0];
  if (argv._.length > 0) {
    const args = argv._.slice(1);
    const home = argv.home as string;
    if (cmd === 'serve') {
      const port = typeof args[0] === 'number' ? args[0] : 3000;
      start(port, home);
    } else if (cmd === 'setup') {
      new Dalai(home)
        .setup()
        .then(() => {
          process.exit(0);
        })
        .catch((e) => {
          console.log('Error', e);
          process.exit(1);
        });
    } else {
      if (args.length > 0) {
        const core = cmd;
        const [method, ...callparams] = args;
        const dalai = new Dalai(home);
        console.log({ method, callparams });
        // 1. install => install the core module
        // 2. get => get models
        dalai[method](core, ...callparams)
          .then(() => {
            process.exit(0);
          })
          .catch((e) => {
            console.log('ERROR', e);
            process.exit(1);
          });
      } else {
        console.log('############################################');
        console.log('#');
        console.log('#  Supported Commands:');
        console.log('#');
        console.log('#  1. System command');
        console.log('#');
        console.log('#    dalai serve <port (optional)>');
        console.log('#');
        console.log('#  2. Model command');
        console.log('#');
        console.log('#    dalai llama get <model names>');
        console.log('#');
        console.log('############################################');
      }
    }
  } else {
    console.log('ERROR: Please pass a command');
    process.exit(1);
  }

  //if (process.argv.length > 0) {
  //  let [cmd, ...args] = process.argv.slice(2)
  //  if (cmd === "serve") {
  //    const port = (args.length > 0 ? parseInt(args[0]) : 3000)
  //    Web(port)
  //  } else if (cmd === "setup") {
  //    new Dalai().setup().then(() => {
  //      process.exit(0)
  //    }).catch((e) => {
  //      console.log("Error", e)
  //      process.exit(1)
  //    })
  //  } else {
  //    if (args.length > 0) {
  //      let core = cmd
  //      let [method, ...callparams] = args
  //      let dalai = new Dalai()
  //      console.log({ method, callparams })
  //      // 1. install => install the core module
  //      // 2. get => get models
  //      dalai[method](core, ...callparams).then(() => {
  //        process.exit(0)
  //      }).catch((e) => {
  //        console.log("ERROR", e)
  //        process.exit(1)
  //      })
  //    } else {
  //      console.log("############################################")
  //      console.log("#")
  //      console.log("#  Supported Commands:")
  //      console.log("#")
  //      console.log("#  1. System command")
  //      console.log("#")
  //      console.log("#    dalai serve <port (optional)>")
  //      console.log("#")
  //      console.log("#  2. Model command")
  //      console.log("#")
  //      console.log("#    dalai llama get <model names>")
  //      console.log("#")
  //      console.log("############################################")
  //    }
  //  }
  //} else {
  //  console.log("ERROR: Please pass a command")
  //  process.exit(1)
  //}
}

main();
