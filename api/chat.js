// api/chat.js
/* eslint-env node */
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 🔒 Lee desde variables de entorno
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages, model = 'gpt-4-turbo', temperature = 0.7 } = req.body;

    console.log('[API] Request to OpenAI:', { model, temperature });

    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
    });

    const assistantMessage = response.choices?.[0]?.message;

    if (!assistantMessage) {
      console.error('[API] ❌ OpenAI respondió sin mensaje válido');
      return res.status(502).json({
        error: {
          code: 'invalid_response',
          message: 'OpenAI no devolvió un mensaje válido.',
          type: 'response_format_error',
        },
      });
    }

    res.status(200).json({ choices: [{ message: assistantMessage }] });
  } catch (error) {
    console.error('[API] ❌ Error en /api/chat:', error);

    res.status(500).json({
      error: {
        code: error.code || 'internal_error',
        message: error.message || 'Error inesperado en el servidor.',
        type: error.type || 'api_error',
      },
    });
  }
}
