
const axios = require('axios')

const GROQ_API_KEY = process.env.GROQ_API_KEY
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

async function askLLM(message) {

  // 👉 пока используем GROQ (быстро)
  const res = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'system',
          content: `
Ты агент. Отвечай JSON.

Если нужно действие:
{
  "action": "run_command",
  "command": "ls"
}

или:
{
  "action": "create_file",
  "path": "test.txt",
  "content": "hello"
}

Иначе:
{
  "reply": "текст"
}
`
        },
        { role: 'user', content: message }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`
      }
    }
  )

  const text = res.data.choices[0].message.content

  try {
    return JSON.parse(text)
  } catch {
    return { reply: text }
  }
}

module.exports = { askLLM }
