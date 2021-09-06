// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?(.{1,10})?: .{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/

if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log(msg)
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`提交的内容格式不正确.`)}\n\n` +
        chalk.red(`  比如:\n\n`) +
        `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
        `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
        chalk.red(`  具体规则查看 https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md for more details.\n`)
    )
    process.exit(1)
  }
}
