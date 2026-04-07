
const { execute } = require('./executor')
const { askLLM } = require('./llm')

async function runAgent(message) {
  // 👉 спрашиваем модель (Groq / OpenRouter)
  const decision = await askLLM(message)

  console.log("LLM:", decision)

  // 👉 если модель вернула действие
  if (decision.action) {
    return execute(decision)
  }

  // 👉 иначе просто ответ
  return {
    reply: decision.reply || decision
  }
}

module.exports = { runAgent }
