import { useAuth } from './AuthContext';
import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FaHome, FaPaperPlane } from 'react-icons/fa';
import AdminControls from './AdminControls';
import LogoutIcon from './LogoutIcon'; // ✅ agregado
import './App.css';

const translations = {
  es: {
    system: 'Eres un asistente amigable y servicial en español.',
    welcome: '¡Hola! Soy tu asistente. ¿En qué puedo ayudarte hoy?',
    placeholder: 'Escribí tu pregunta...',
    writing: 'Escribiendo...',
    fetchError: 'Ocurrió un error al conectarse con la API.',
    openaiError: (code, message) =>
      `Error de OpenAI: ${code || 'Código desconocido'} - ${message || 'Error desconocido'}`,
    invalidOpenAIResponse: 'No se pudo obtener una respuesta válida de OpenAI.',
  },
  pt: {
    system: 'Você é um assistente amigável e útil em português.',
    welcome: 'Olá! Eu sou o seu assistente. Em que posso ajudar hoje?',
    placeholder: 'Escreva sua pergunta...',
    writing: 'Escrevendo...',
    fetchError: 'Ocorreu um error ao conectar com a API.',
    openaiError: (code, message) =>
      `Erro da OpenAI: ${code || 'Código desconhecido'} - ${message || 'Erro desconhecido'}`,
    invalidOpenAIResponse: 'Não foi possível obter una resposta válida da OpenAI.',
  },
  en: {
    system: 'You are a friendly and helpful assistant in English.',
    welcome: 'Hello! I am your assistant. How can I help you today?',
    placeholder: 'Type your question...',
    writing: 'Typing...',
    fetchError: 'An error occurred while connecting to the API.',
    openaiError: (code, message) =>
      `OpenAI Error: ${code || 'Unknown Code'} - ${message || 'Unknown Error'}`,
    invalidOpenAIResponse: 'Could not get a valid response from OpenAI.',
  },
};

function ChatPage() {
  const { lang } = useParams();
  const [currentLang, setCurrentLang] = useState(lang || 'es');
  const { user, loading: authLoading } = useAuth();
  const isAdmin = user?.email === 'rickybarba@hotmail.com';

  const t = translations[currentLang] || translations['es'];

  const [messages, setMessages] = useState([
    { role: 'system', content: t.system },
    { role: 'assistant', content: t.welcome },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const chatBoxRef = useRef(null);
  const sendAudioRef = useRef(new globalThis.Audio('/sounds/button-click.mp3'));

  const playSendSound = () => {
    sendAudioRef.current.currentTime = 0;
    sendAudioRef.current.play().catch((error) => console.error('Error playing send sound:', error));
  };

  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      const timeoutId = globalThis.setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 50);
      return () => globalThis.clearTimeout(timeoutId);
    }
  }, [messages, loading]);

  useEffect(() => {
    setCurrentLang(lang || 'es');
  }, [lang]);

  if (authLoading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" />;

  const getTodayKey = () => new Date().toISOString().split('T')[0];
  const getTodayCount = () => parseInt(localStorage.getItem(getTodayKey())) || 0;
  const incrementTodayCount = () => {
    const key = getTodayKey();
    const current = getTodayCount();
    localStorage.setItem(key, current + 1);
  };

  const sendMessageLogic = async () => {
    if (!input.trim()) return;

    const MAX_FREE_QUESTIONS = 3;
    if (getTodayCount() >= MAX_FREE_QUESTIONS) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            t.fetchError + ' Ya hiciste 3 preguntas hoy. Para seguir, suscribite o volvé mañana 😉',
        },
      ]);
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput('');
    setLoading(true);
    incrementTodayCount();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [...messages, userMessage],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMsg = errorData?.error || `HTTP error! status: ${response.status}`;
        setMessages((currentMessages) => [...currentMessages, { role: 'assistant', content: errorMsg }]);
        return;
      }

      const data = await response.json();
      if (data.choices?.[0]?.message) {
        setMessages((currentMessages) => [...currentMessages, data.choices[0].message]);
      } else if (data.error) {
        setMessages((currentMessages) => [
          ...currentMessages,
          { role: 'assistant', content: t.openaiError(data.error.code, data.error.message) },
        ]);
      } else {
        setMessages((currentMessages) => [
          ...currentMessages,
          { role: 'assistant', content: t.invalidOpenAIResponse },
        ]);
      }
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: t.fetchError + ' (' + error.message + ')' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!loading) {
        playSendSound();
        sendMessageLogic();
      }
    }
  };

  const handleButtonClick = () => {
    if (!loading) {
      playSendSound();
      sendMessageLogic();
    }
  };

  return (
    <>
      <LogoutIcon /> {/* ✅ agregado acá arriba del todo */}

      <Link to="/" className="home-link">
        <FaHome size={15} />
      </Link>

      {isAdmin && (
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <AdminControls />
        </div>
      )}

      <div className="app chat-page-container">
        <div className="chat-box" ref={chatBoxRef}>
          {messages.slice(1).map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-content">
                <span>{msg.content}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message assistant">
              <span>{t.writing}</span>
            </div>
          )}
        </div>

        <div className="input-bar">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.placeholder}
            disabled={loading}
          />
          <button onClick={handleButtonClick} disabled={loading}>
            <FaPaperPlane size={20} color="#000" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
