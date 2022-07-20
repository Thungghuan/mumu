import fs from 'fs'
import { cac } from 'cac'
import { build } from 'tsup'

const cli = cac()
cli
  .command('[example]', 'Develop a example')
  .option('--dir <dir>', 'Oxample director')
  .action((example, options) => {
    const examplePath = `${options.dir || 'examples'}/${example}.ts`

    if (!example) {
      console.log('ERROR: You need to specify a example file to develop.')
      console.log(cli.outputHelp())
    } else if (!fs.existsSync(examplePath)) {
      console.log(`ERROR: Example file "${example}" not found.`)
      console.log('Check your file name or specify the example diretory.')
      console.log(cli.outputHelp())
    } else {
      console.log(`Developing example ${example}...`)

      build({
        watch: true,
        onSuccess: `tsx ${examplePath}`
      })
    }
  })

cli.help()

cli.parse()
