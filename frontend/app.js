
async function sendMessage() {
  const input = document.getElementById('input')
  const message = input.value

  const res = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  })

  const data = await res.json()

  console.log(data)
}
