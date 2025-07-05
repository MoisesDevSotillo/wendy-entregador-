import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { ArrowLeft, Send } from 'lucide-react'

const ChatScreen = ({ user }) => {
  const navigate = useNavigate()
  const { participantId } = useParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [conversationId, setConversationId] = useState(null)
  const messagesEndRef = useRef(null)

  const API_BASE_URL = 'https://vgh0i1cjw858.manus.space/api/chat'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        // Em um ambiente real, você faria uma chamada para criar ou obter a conversa
        // Simulando a criação de uma conversa para demonstração
        const response = await fetch(`${API_BASE_URL}/conversations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({
            participant2_id: parseInt(participantId), // ID do cliente
            order_id: 1, // Simula um ID de pedido
          }),
        })
        const data = await response.json()
        if (response.ok) {
          setConversationId(data.conversation.id)
        } else {
          console.error('Erro ao criar/obter conversa:', data.error)
        }
      } catch (error) {
        console.error('Erro de conexão ao criar/obter conversa:', error)
      }
    }
    fetchConversation()
  }, [participantId, user])

  useEffect(() => {
    if (!conversationId) return

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
          headers: {
            // 'Authorization': `Bearer ${user.token}`
          },
        })
        const data = await response.json()
        if (response.ok) {
          setMessages(data)
        } else {
          console.error('Erro ao carregar mensagens:', data.error)
        }
      } catch (error) {
        console.error('Erro de conexão ao carregar mensagens:', error)
      }
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 3000) // Atualiza mensagens a cada 3 segundos
    return () => clearInterval(interval)
  }, [conversationId, user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !conversationId) return

    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ content: newMessage }),
      })
      const data = await response.json()
      if (response.ok) {
        setMessages((prevMessages) => [...prevMessages, data.message_data])
        setNewMessage('')
        scrollToBottom()
      } else {
        console.error('Erro ao enviar mensagem:', data.error)
      }
    } catch (error) {
      console.error('Erro de conexão ao enviar mensagem:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#66CCFF] text-white p-4 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-white hover:bg-[#4DB8FF]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Chat com Cliente</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${msg.sender_id === user.id
                ? 'bg-[#66CCFF] text-white' : 'bg-gray-200 text-gray-800'}
              `}
            >
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage()
            }
          }}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#66CCFF]"
        />
        <Button
          onClick={handleSendMessage}
          className="bg-[#66CCFF] hover:bg-[#4DB8FF] text-white p-3 rounded-lg"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

export default ChatScreen


