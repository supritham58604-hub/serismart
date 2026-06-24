
import { GoogleGenAI, Type, Modality, LiveServerMessage, Blob } from "@google/genai";
import { DiseaseResult } from "../types";

const API_KEY = process.env.API_KEY || '';

export const analyzeDisease = async (base64Image: string): Promise<DiseaseResult> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: "Analyze this silkworm/cocoon image for diseases (e.g., Grasserie, Flacherie, Muscardine, Pebrine). Return a JSON response following the specified schema. Be very accurate for Karnataka sericulture contexts." }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseaseName: { type: Type.STRING },
          kannadaName: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          description: { type: Type.STRING },
          kannadaDescription: { type: Type.STRING },
          actions: { type: Type.ARRAY, items: { type: Type.STRING } },
          kannadaActions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["diseaseName", "kannadaName", "confidence", "description", "kannadaDescription", "actions", "kannadaActions"]
      }
    }
  });

  return JSON.parse(response.text);
};

// --- Live Audio Utilities ---

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function createPcmBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export const connectLiveAssistant = (language: string, callbacks: any) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const systemInstruction = language === 'kn' 
    ? 'ನೀವು ಕರ್ನಾಟಕದ ರೇಷ್ಮೆ ರೈತರಿಗೆ ಸಹಾಯ ಮಾಡುವ ರೇಷ್ಮೆ ಕೃಷಿ ತಜ್ಞರು. ಕನ್ನಡದಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ಮತ್ತು ಸರಳವಾಗಿ ಮಾತನಾಡಿ.' 
    : 'You are a sericulture expert helping farmers in Karnataka. Speak clearly and simply in English.';

  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks,
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
      systemInstruction,
    },
  });
};
