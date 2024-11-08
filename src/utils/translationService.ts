import axios from 'axios'

const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  // const apiKey = process.env.TRANSLATION_API_KEY;
  const response = await axios.get('https://api.mymemory.translated.net/get', {
    params: {
      q: text,
      langpair: `en|${targetLanguage}`, // 'en|es' for English to Spanish
    },
  });
  return response.data.responseData.translatedText;
};

export const translateToLanguages = async (text: string) => {
  const [hindi, spanish] = await Promise.all([
    translateText(text, 'hi'),
    translateText(text, 'es'),
  ]);
  return { hindi, spanish };
};
