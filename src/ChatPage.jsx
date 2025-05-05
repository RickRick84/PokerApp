import { useAuth } from './AuthContext';
import { useState, useEffect, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import AdminControls from './AdminControls';
import UserMenu from './UserMenu';
import './App.css';
import buttons from './buttonLabels';
import SidebarMenu from './SidebarMenu';

const translations = {
  es: {
    system: 'Eres un asistente amigable y servicial en español.',
    welcome: '¡Hola! Soy tu asistente. ¿En qué puedo ayudarte hoy?',
    placeholder: 'Escribí tu pregunta...',
    writing: 'Escribiendo...',
    fetchError: 'Ocurrió un error al conectarse con la API.',
    openaiError: (code, msg) => `Error de OpenAI: ${code || 'Código desconocido'} - ${msg || 'Error desconocido'}`,
    invalidOpenAIResponse: 'No se pudo obtener una respuesta válida de OpenAI.',
    choosePlan: 'Elegí tu plan',
    selectOne: 'Seleccioná una opción para disfrutar del bot sin límites.',
    monthly: 'Mensual',
    annual: 'Anual',
    month: 'mes',
    year: 'año',
    support: 'Soporte incluido',
    basicLimit: 'Preguntas limitadas por día',
    oneTeam: 'Solo 1 usuario',
    proLimit: 'Preguntas casi ilimitadas',
    unlimitedUsers: 'Usuarios y equipos ilimitados',
    prioritySupport: 'Soporte prioritario',
    exclusiveContent: 'Acceso a trivias y contenido exclusivo',
    pickPlan: 'Elegir este plan',
    comingSoon: 'Tranca... se viene algo lindo 😉',
  },  
  en: {
    system: 'You are a friendly and helpful assistant in English.',
    welcome: 'Hello! I am your assistant. How can I help you today?',
    placeholder: 'Type your question...',
    writing: 'Typing...',
    fetchError: 'An error occurred while connecting to the API.',
    openaiError: (code, msg) => `OpenAI Error: ${code || 'Unknown Code'} - ${msg || 'Unknown Error'}`,
    invalidOpenAIResponse: 'Could not get a valid response from OpenAI.',
    choosePlan: 'Choose your plan',
    selectOne: 'Select an option to enjoy the bot without limits.',
    monthly: 'Monthly',
    annual: 'Annual',
    month: 'month',
    year: 'year',
    support: 'Support included',
    basicLimit: 'Limited questions per day',
    oneTeam: 'Only 1 user',
    proLimit: 'Almost unlimited questions',
    unlimitedUsers: 'Unlimited users and teams',
    prioritySupport: 'Priority support',
    exclusiveContent: 'Access to trivia and exclusive content',
    pickPlan: 'Pick this plan',
    comingSoon: 'Relax... something great is coming 😉',
  },  
  ru: {
    system: 'Вы дружелюбный и полезный помощник на русском языке.',
    welcome: 'Привет! Я ваш помощник. Чем могу помочь?',
    placeholder: 'Введите ваш вопрос...',
    writing: 'Печатает...',
    fetchError: 'Произошла ошибка при подключении к API.',
    openaiError: (code, msg) => `Ошибка OpenAI: ${code || 'Неизвестный код'} - ${msg || 'Неизвестная ошибка'}`,
    invalidOpenAIResponse: 'Не удалось получить допустимый ответ от OpenAI.',
    choosePlan: 'Выберите свой план',
    selectOne: 'Выберите опцию, чтобы пользоваться ботом без ограничений.',
    monthly: 'Ежемесячно',
    annual: 'Ежегодно',
    month: 'месяц',
    year: 'год',
    support: 'Включена поддержка',
    basicLimit: 'Ограниченное количество вопросов в день',
    oneTeam: 'Только 1 пользователь',
    proLimit: 'Почти неограниченное количество вопросов',
    unlimitedUsers: 'Неограниченное количество пользователей и команд',
    prioritySupport: 'Приоритетная поддержка',
    exclusiveContent: 'Доступ к викторинам и эксклюзивному контенту',
    pickPlan: 'Выбрать этот план',
    comingSoon: 'Спокойно... скоро будет кое-что классное 😉',
  },  
  fr: {
    system: "Vous êtes un assistant amical et serviable en français.",
    welcome: "Bonjour ! Je suis votre assistant. Comment puis-je vous aider aujourd'hui ?",
    placeholder: "Tapez votre question...",
    writing: "Écriture...",
    fetchError: "Une erreur s'est produite lors de la connexion à l'API.",
    openaiError: (code, message) =>
      `Erreur OpenAI : ${code || 'Code inconnu'} - ${message || 'Erreur inconnue'}`,
    invalidOpenAIResponse: "Impossible d'obtenir une réponse valide d'OpenAI.",
  },
  de: {
    system: "Du bist ein freundlicher und hilfsbereiter Assistent auf Deutsch.",
    welcome: "Hallo! Ich bin dein Assistent. Wie kann ich dir heute helfen?",
    placeholder: "Gib deine Frage ein...",
    writing: "Schreibe...",
    fetchError: "Beim Verbinden mit der API ist ein Fehler aufgetreten.",
    openaiError: (code, message) =>
      `OpenAI-Fehler: ${code || 'Unbekannter Code'} - ${message || 'Unbekannter Fehler'}`,
    invalidOpenAIResponse: "Es konnte keine gültige Antwort von OpenAI erhalten werden.",
  },
  tr: {
    system: "Türkçe konuşan dostça ve yardımsever bir asistansınız.",
    welcome: "Merhaba! Ben senin asistanınım. Bugün sana nasıl yardımcı olabilirim?",
    placeholder: "Sorunuzu yazın...",
    writing: "Yazıyor...",
    fetchError: "API'ye bağlanırken bir hata oluştu.",
    openaiError: (code, message) =>
      `OpenAI Hatası: ${code || 'Bilinmeyen Kod'} - ${message || 'Bilinmeyen Hata'}`,
    invalidOpenAIResponse: "OpenAI'dan geçerli bir yanıt alınamadı.",
  },
  nl: {
    system: "Je bent een vriendelijke en behulpzame assistent in het Nederlands.",
    welcome: "Hallo! Ik ben je assistent. Waarmee kan ik je vandaag helpen?",
    placeholder: "Typ je vraag...",
    writing: "Bezig met typen...",
    fetchError: "Er is een fout opgetreden bij het verbinden met de API.",
    openaiError: (code, message) =>
      `OpenAI-fout: ${code || 'Onbekende code'} - ${message || 'Onbekende fout'}`,
    invalidOpenAIResponse: "Kan geen geldige reactie van OpenAI krijgen.",
  },
  ar: {
    system: "أنت مساعد ودود ومتعاون باللغة العربية.",
    welcome: "مرحبًا! أنا مساعدك. كيف يمكنني مساعدتك اليوم؟",
    placeholder: "اكتب سؤالك...",
    writing: "يكتب...",
    fetchError: "حدث خطأ أثناء الاتصال بواجهة برمجة التطبيقات.",
    openaiError: (code, message) =>
      `خطأ OpenAI: ${code || 'رمز غير معروف'} - ${message || 'خطأ غير معروف'}`,
    invalidOpenAIResponse: "تعذر الحصول على رد صالح من OpenAI.",
  },
  ja: {
    system: "あなたは日本語で親切で役立つアシスタントです。",
    welcome: "こんにちは！私はあなたのアシスタントです。今日はどうされましたか？",
    placeholder: "質問を入力してください...",
    writing: "入力中...",
    fetchError: "APIへの接続中にエラーが発生しました。",
    openaiError: (code, message) =>
      `OpenAIエラー: ${code || '不明なコード'} - ${message || '不明なエラー'}`,
    invalidOpenAIResponse: "OpenAIから有効な応答を得ることができませんでした。",
  },
  th: {
    system: "คุณเป็นผู้ช่วยที่เป็นมิตรและมีประโยชน์ในภาษาไทย",
    welcome: "สวัสดี! ฉันคือผู้ช่วยของคุณ วันนี้คุณต้องการให้ฉันช่วยอะไร?",
    placeholder: "พิมพ์คำถามของคุณ...",
    writing: "กำลังพิมพ์...",
    fetchError: "เกิดข้อผิดพลาดในการเชื่อมต่อกับ API",
    openaiError: (code, message) =>
      `ข้อผิดพลาด OpenAI: ${code || 'รหัสที่ไม่รู้จัก'} - ${message || 'ข้อผิดพลาดที่ไม่รู้จัก'}`,
    invalidOpenAIResponse: "ไม่สามารถรับคำตอบที่ถูกต้องจาก OpenAI ได้",
  },
  it: {
    system: "Sei un assistente amichevole e disponibile in italiano.",
    welcome: "Ciao! Sono il tuo assistente. Come posso aiutarti oggi?",
    placeholder: "Scrivi la tua domanda...",
    writing: "Scrivendo...",
    fetchError: "Si è verificato un errore durante la connessione all'API.",
    openaiError: (code, message) =>
      `Errore OpenAI: ${code || 'Codice sconosciuto'} - ${message || 'Errore sconosciuto'}`,
    invalidOpenAIResponse: "Non è stato possibile ottenere una risposta valida da OpenAI.",
  },
  no: {
    system: "Du er en vennlig og hjelpsom assistent på norsk.",
    welcome: "Hei! Jeg er assistenten din. Hvordan kan jeg hjelpe deg i dag?",
    placeholder: "Skriv inn spørsmålet ditt...",
    writing: "Skriver...",
    fetchError: "Det oppstod en feil ved tilkobling til API-et.",
    openaiError: (code, message) =>
      `OpenAI-feil: ${code || 'Ukjent kode'} - ${message || 'Ukjent feil'}`,
    invalidOpenAIResponse: "Kunne ikke få et gyldig svar fra OpenAI.",
  },
  fi: {
    system: "Olet ystävällinen ja avulias suomenkielinen avustaja.",
    welcome: "Hei! Olen avustajasi. Miten voin auttaa sinua tänään?",
    placeholder: "Kirjoita kysymyksesi...",
    writing: "Kirjoitetaan...",
    fetchError: "Yhteydessä API:in tapahtui virhe.",
    openaiError: (code, message) =>
      `OpenAI-virhe: ${code || 'Tuntematon koodi'} - ${message || 'Tuntematon virhe'}`,
    invalidOpenAIResponse: "OpenAI:lta ei saatu kelvollista vastausta.",
  },
  sv: {
    system: 'Du är en vänlig och hjälpsam assistent på svenska.',
    welcome: 'Hej! Jag är din assistent. Hur kan jag hjälpa dig idag?',
    placeholder: 'Skriv din fråga...',
    writing: 'Skriver...',
    fetchError: 'Ett fel uppstod vid anslutning till API:t.',
    openaiError: (code, message) =>
      `OpenAI-fel: ${code || 'Okänt kod'} - ${message || 'Okänt fel'}`,
    invalidOpenAIResponse: 'Kunde inte få ett giltigt svar från OpenAI.',
  },
  ko: {
    system: '당신은 한국어로 친절하고 유용한 어시스턴트입니다.',
    welcome: '안녕하세요! 저는 당신의 어시스턴트입니다. 무엇을 도와드릴까요?',
    placeholder: '질문을 입력하세요...',
    writing: '작성 중...',
    fetchError: 'API 연결 중 오류가 발생했습니다.',
    openaiError: (code, message) =>
      `OpenAI 오류: ${code || '알 수 없는 코드'} - ${message || '알 수 없는 오류'}`,
    invalidOpenAIResponse: 'OpenAI에서 유효한 응답을 받을 수 없습니다.',
  },
  el: {
    system: 'Είστε ένας φιλικός και εξυπηρετικός βοηθός στα ελληνικά.',
    welcome: 'Γεια! Είμαι ο βοηθός σας. Πώς μπορώ να σας βοηθήσω σήμερα;',
    placeholder: 'Πληκτρολογήστε την ερώτησή σας...',
    writing: 'Πληκτρολόγηση...',
    fetchError: 'Παρουσιάστηκε σφάλμα κατά τη σύνδεση με το API.',
    openaiError: (code, message) =>
      `Σφάλμα OpenAI: ${code || 'Άγνωστος κωδικός'} - ${message || 'Άγνωστο σφάλμα'}`,
    invalidOpenAIResponse: 'Δεν ήταν δυνατή η λήψη έγκυρης απάντησης από το OpenAI.',
  },
  hu: {
    system: 'Ön egy barátságos és segítőkész asszisztens magyarul.',
    welcome: 'Helló! Én vagyok az asszisztense. Miben segíthetek?',
    placeholder: 'Írja be a kérdését...',
    writing: 'Írás...',
    fetchError: 'Hiba történt az API-hoz való csatlakozáskor.',
    openaiError: (code, message) =>
      `OpenAI hiba: ${code || 'Ismeretlen kód'} - ${message || 'Ismeretlen hiba'}`,
    invalidOpenAIResponse: 'Nem sikerült érvényes választ kapni az OpenAI-tól.',
  },
  ro: {
    system: 'Ești un asistent prietenos și de ajutor în română.',
    welcome: 'Salut! Sunt asistentul tău. Cu ce te pot ajuta azi?',
    placeholder: 'Scrie întrebarea ta...',
    writing: 'Scriere...',
    fetchError: 'A apărut o eroare la conectarea cu API-ul.',
    openaiError: (code, message) =>
      `Eroare OpenAI: ${code || 'Cod necunoscut'} - ${message || 'Eroare necunoscută'}`,
    invalidOpenAIResponse: 'Nu s-a putut obține un răspuns valid de la OpenAI.',
  },
  cs: {
    system: 'Jste přátelský a nápomocný asistent v češtině.',
    welcome: 'Ahoj! Jsem tvůj asistent. S čím ti mohu dnes pomoci?',
    placeholder: 'Napiš svou otázku...',
    writing: 'Píšu...',
    fetchError: 'Došlo k chybě při připojování k API.',
    openaiError: (code, message) =>
      `Chyba OpenAI: ${code || 'Neznámý kód'} - ${message || 'Neznámá chyba'}`,
    invalidOpenAIResponse: 'Nepodařilo se získat platnou odpověď od OpenAI.',
  },
  sr: {
    system: 'Vi ste prijateljski i korisni asistent na srpskom jeziku.',
    welcome: 'Zdravo! Ja sam vaš asistent. Kako mogu da vam pomognem danas?',
    placeholder: 'Upišite svoje pitanje...',
    writing: 'Kucam...',
    fetchError: 'Došlo je do greške prilikom povezivanja sa API-jem.',
    openaiError: (code, message) =>
      `Greška OpenAI: ${code || 'Nepoznat kod'} - ${message || 'Nepoznata greška'}`,
    invalidOpenAIResponse: 'Nije moguće dobiti važeći odgovor od OpenAI.',
  },
  bs: {
    system: 'Vi ste prijateljski i korisni asistent na bosanskom jeziku.',
    welcome: 'Zdravo! Ja sam tvoj asistent. Kako mogu pomoći danas?',
    placeholder: 'Unesi svoje pitanje...',
    writing: 'Pišem...',
    fetchError: 'Desila se greška prilikom povezivanja sa API-jem.',
    openaiError: (code, message) =>
      `Greška OpenAI: ${code || 'Nepoznat kod'} - ${message || 'Nepoznata greška'}`,
    invalidOpenAIResponse: 'Nije moguće dobiti ispravan odgovor od OpenAI.',
  },
  tl: {
    choosePlan: 'Piliin ang iyong plano',
    selectOne: 'Pumili ng opsyon upang masiyahan sa bot nang walang limitasyon.',
    monthly: 'Buwanang',
    annual: 'Taunan',
    month: 'buwan',
    year: 'taon',
    support: 'Kasamang suporta',
    basicLimit: 'Limitadong tanong bawat araw',
    oneTeam: 'Isang user lamang',
    proLimit: 'Halos walang limitasyong tanong',
    unlimitedUsers: 'Walang limitasyong mga user at team',
    prioritySupport: 'Prayoridad na suporta',
    exclusiveContent: 'Access sa mga trivia at eksklusibong nilalaman',
    pickPlan: 'Piliin ang planong ito',
    comingSoon: 'Relax... may maganda kaming paparating 😉',
  },
  id: {
    choosePlan: 'Pilih paket Anda',
    selectOne: 'Pilih opsi untuk menikmati bot tanpa batas.',
    monthly: 'Bulanan',
    annual: 'Tahunan',
    month: 'bulan',
    year: 'tahun',
    support: 'Dukungan disertakan',
    basicLimit: 'Pertanyaan terbatas per hari',
    oneTeam: 'Hanya 1 pengguna',
    proLimit: 'Pertanyaan hampir tak terbatas',
    unlimitedUsers: 'Pengguna dan tim tanpa batas',
    prioritySupport: 'Dukungan prioritas',
    exclusiveContent: 'Akses trivia dan konten eksklusif',
    pickPlan: 'Pilih paket ini',
    comingSoon: 'Tenang... sesuatu yang keren akan datang 😉',
  },
  zh: {
    choosePlan: '选择你的方案',
    selectOne: '选择一个选项以无限使用机器人。',
    monthly: '每月',
    annual: '每年',
    month: '月',
    year: '年',
    support: '包含支持',
    basicLimit: '每天提问次数有限',
    oneTeam: '仅限1位用户',
    proLimit: '几乎无限提问',
    unlimitedUsers: '无限用户与团队',
    prioritySupport: '优先支持',
    exclusiveContent: '访问测验和独家内容',
    pickPlan: '选择此方案',
    comingSoon: '别急……精彩即将上线 😉',
  },
  mn: {
    choosePlan: 'Төлөвлөгөөгөө сонгоно уу',
    selectOne: 'Ботыг хязгааргүй ашиглахын тулд сонголтоо хийнэ үү.',
    monthly: 'Сар бүр',
    annual: 'Жил бүр',
    month: 'сар',
    year: 'жил',
    support: 'Дэмжлэг орсон',
    basicLimit: 'Өдөрт хязгаартай асуулт',
    oneTeam: 'Зөвхөн 1 хэрэглэгч',
    proLimit: 'Бараг хязгааргүй асуулт',
    unlimitedUsers: 'Хязгааргүй хэрэглэгч ба баг',
    prioritySupport: 'Тэргүүлэх дэмжлэг',
    exclusiveContent: 'Сонирхолтой асуулт, онцгой агуулга',
    pickPlan: 'Энэ төлөвлөгөөг сонгох',
    comingSoon: 'Түр азнаарай... гайхалтай зүйл ирж байна 😉',
  },
  bg: {
    choosePlan: 'Изберете своя план',
    selectOne: 'Изберете опция, за да се наслаждавате на бота без ограничения.',
    monthly: 'Месечно',
    annual: 'Годишно',
    month: 'месец',
    year: 'година',
    support: 'Включена поддръжка',
    basicLimit: 'Ограничени въпроси на ден',
    oneTeam: 'Само 1 потребител',
    proLimit: 'Почти неограничени въпроси',
    unlimitedUsers: 'Неограничени потребители и екипи',
    prioritySupport: 'Приоритетна поддръжка',
    exclusiveContent: 'Достъп до викторини и ексклузивно съдържание',
    pickPlan: 'Избери този план',
    comingSoon: 'Спокойно... нещо яко предстои 😉',
  },
  pl: {
    choosePlan: 'Wybierz swój plan',
    selectOne: 'Wybierz opcję, aby korzystać z bota bez ograniczeń.',
    monthly: 'Miesięcznie',
    annual: 'Rocznie',
    month: 'miesiąc',
    year: 'rok',
    support: 'Wsparcie w zestawie',
    basicLimit: 'Ograniczona liczba pytań dziennie',
    oneTeam: 'Tylko 1 użytkownik',
    proLimit: 'Prawie nieograniczone pytania',
    unlimitedUsers: 'Nieograniczeni użytkownicy i zespoły',
    prioritySupport: 'Priorytetowe wsparcie',
    exclusiveContent: 'Dostęp do quizów i ekskluzywnej treści',
    pickPlan: 'Wybierz ten plan',
    comingSoon: 'Spokojnie... coś świetnego nadchodzi 😉',
  },
  uk: {
    choosePlan: 'Оберіть свій план',
    selectOne: 'Виберіть опцію, щоб користуватися ботом без обмежень.',
    monthly: 'Щомісячно',
    annual: 'Щорічно',
    month: 'місяць',
    year: 'рік',
    support: 'Підтримка включена',
    basicLimit: 'Обмежені запитання на день',
    oneTeam: 'Лише 1 користувач',
    proLimit: 'Майже необмежені запитання',
    unlimitedUsers: 'Необмежені користувачі та команди',
    prioritySupport: 'Пріоритетна підтримка',
    exclusiveContent: 'Доступ до вікторин та ексклюзивного контенту',
    pickPlan: 'Обрати цей план',
    comingSoon: 'Не хвилюйся... щось круте вже на підході 😉',
  },
  vi: {
    choosePlan: 'Chọn gói của bạn',
    selectOne: 'Chọn một tùy chọn để sử dụng bot không giới hạn.',
    monthly: 'Hàng tháng',
    annual: 'Hàng năm',
    month: 'tháng',
    year: 'năm',
    support: 'Bao gồm hỗ trợ',
    basicLimit: 'Câu hỏi giới hạn mỗi ngày',
    oneTeam: 'Chỉ 1 người dùng',
    proLimit: 'Gần như không giới hạn câu hỏi',
    unlimitedUsers: 'Người dùng và nhóm không giới hạn',
    prioritySupport: 'Hỗ trợ ưu tiên',
    exclusiveContent: 'Truy cập đố vui và nội dung độc quyền',
    pickPlan: 'Chọn gói này',
    comingSoon: 'Bình tĩnh... điều tuyệt vời đang đến 😉',
  },
  da: {
    choosePlan: 'Vælg din plan',
    selectOne: 'Vælg en mulighed for at bruge botten uden begrænsninger.',
    monthly: 'Månedligt',
    annual: 'Årligt',
    month: 'måned',
    year: 'år',
    support: 'Support inkluderet',
    basicLimit: 'Begrænsede spørgsmål pr. dag',
    oneTeam: 'Kun 1 bruger',
    proLimit: 'Næsten ubegrænsede spørgsmål',
    unlimitedUsers: 'Ubegrænsede brugere og teams',
    prioritySupport: 'Prioriteret support',
    exclusiveContent: 'Adgang til quizzer og eksklusivt indhold',
    pickPlan: 'Vælg denne plan',
    comingSoon: 'Bare rolig... noget fedt er på vej 😉',
  },
  he: {
    choosePlan: 'בחר את התוכנית שלך',
    selectOne: 'בחר אפשרות כדי ליהנות מהבוט ללא הגבלה.',
    monthly: 'חודשי',
    annual: 'שנתי',
    month: 'חודש',
    year: 'שנה',
    support: 'תמיכה כלולה',
    basicLimit: 'שאלות מוגבלות ביום',
    oneTeam: 'משתמש אחד בלבד',
    proLimit: 'כמעט ללא הגבלה בשאלות',
    unlimitedUsers: 'משתמשים וצוותים ללא הגבלה',
    prioritySupport: 'תמיכה עדיפה',
    exclusiveContent: 'גישה לטריוויה ותוכן בלעדי',
    pickPlan: 'בחר בתוכנית זו',
    comingSoon: 'רגע... משהו מגניב בדרך 😉',
  },
};

function ChatPage() {
  const { user, loading: authLoading } = useAuth();
  const [currentLang, setCurrentLang] = useState('es');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const sendAudioRef = useRef(new Audio('/sounds/button-click.mp3'));
  const chatEndRef = useRef(null);

  const playSendSound = () => {
    sendAudioRef.current.currentTime = 0;
    sendAudioRef.current.play().catch((error) => console.error('Error playing sound:', error));
  };

  useEffect(() => {
    const browserLang = navigator.language?.slice(0, 2) || 'en';
    const availableLangs = Object.keys(translations);
    const selectedLang = availableLangs.includes(browserLang) ? browserLang : 'en';
    setCurrentLang(selectedLang);
  }, []);  

  useEffect(() => {
    const t = translations[currentLang];
    setMessages([
      { role: 'system', content: t.system },
      { role: 'assistant', content: t.welcome },
    ]);
  }, [currentLang]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [messages, loading]);

  if (authLoading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" />;

  const t = translations[currentLang];
  const isAdmin = user?.email === 'rickybarba@hotmail.com';

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
      setShowPopup(true); // 👉 activa el popup
      return;
    }    

    const userMessage = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMessage]);
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
        setMessages((msgs) => [...msgs, { role: 'assistant', content: errorMsg }]);
        return;
      }

      const data = await response.json();
      if (data.choices?.[0]?.message) {
        setMessages((msgs) => [...msgs, data.choices[0].message]);
      } else if (data.error) {
        setMessages((msgs) => [
          ...msgs,
          { role: 'assistant', content: t.openaiError(data.error.code, data.error.message) },
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          { role: 'assistant', content: t.invalidOpenAIResponse },
        ]);
      }
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { role: 'assistant', content: `${t.fetchError} (${error.message})` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      playSendSound();
      sendMessageLogic();
    }
  };

  const handleButtonClick = () => {
    if (!loading) {
      playSendSound();
      sendMessageLogic();
    }
  };
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <UserMenu />
      <SidebarMenu currentLang={currentLang} setShowPopup={setShowPopup} />
      
      {showPopup && (
  <div className="popup-overlay" onClick={() => setShowPopup(false)}>
    <img
      src="/popup_image_poker_plans_.jpg"
      alt="Poker Plans"
      style={{
        maxWidth: '90vw',
        maxHeight: '90vh',
        borderRadius: '20px',
        boxShadow: '0 0 30px rgba(0,0,0,0.7)',
        cursor: 'pointer'
      }}
    />
  </div>
)}


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
  
          {/* Marcador para scroll automático */}
          <div ref={chatEndRef}></div>
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