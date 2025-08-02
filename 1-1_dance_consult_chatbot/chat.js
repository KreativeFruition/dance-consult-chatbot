
const toggleBtn = document.getElementById('chat-toggle');
const chatModal = document.getElementById('chat-modal');
const sendBtn = document.getElementById('chat-send');
const input = document.getElementById('chat-input');
const messages = document.getElementById('chat-messages');

toggleBtn.onclick = () => {
  chatModal.style.display = chatModal.style.display === 'flex' ? 'none' : 'flex';
};

sendBtn.onclick = async () => {
  const userMsg = input.value.trim();
  if (!userMsg) return;

  appendMessage(userMsg, 'user');
  input.value = '';
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMsg })
  });
  const data = await res.json();
  appendMessage(data.reply, 'bot');
};

function appendMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `chat-bubble ${sender}`;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
