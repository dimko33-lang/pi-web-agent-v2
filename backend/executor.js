
const fs = require('fs')
const { execSync } = require('child_process')

function execute(task) {
  console.log('EXECUTE:', task)

  try {
    if (task.action === 'create_file') {
      fs.writeFileSync(task.path, task.content)
      return { reply: 'Файл создан: ' + task.path }
    }

    if (task.action === 'run_command') {
      const output = execSync(task.command).toString()
      return { reply: output }
    }

    return { reply: 'Неизвестное действие' }

  } catch (err) {
    return { reply: 'Ошибка: ' + err.message }
  }
}

module.exports = { execute }
