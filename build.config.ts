import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    {
      builder: 'mkdist',
      input: './src/plugins/',
      outDir: './dist/plugins'
    }
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true
  }
})
