import type { SpeechRecognition } from "dom-speech-recognition";

type SpeechRecognitionConstructor = new () => SpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export const useVoicer = (
  inputValue: Ref<string>,
  voiceLintening: Ref<boolean>
) => {
  const SpeechRecognitionVal =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognitionVal!();

  recognition.onend = (event) => {
    voiceLintening.value = false;
  };

  recognition.onresult = (event) => {
    inputValue.value = event.results[0][0].transcript;
  };

  recognition.onstart = (event) => {
    inputValue.value = "";
    voiceLintening.value = true;
  };

  const start = () => recognition.start();

  return { start };
};
