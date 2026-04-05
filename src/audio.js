/**
 * 起码 QiMa — Bilingual Speech Playback
 * Shared audio logic for glossary and commands pages.
 */

/**
 * Speaks a bilingual string (English then Chinese).
 * Expects format: "English text / 中文文本"
 */
export function speakBilingual(text) {
  window.speechSynthesis.cancel();

  const parts = text.split(' / ');
  if (parts.length < 2) return;

  const enUtterance = new SpeechSynthesisUtterance(parts[0].trim());
  enUtterance.lang = 'en-US';
  enUtterance.rate = 0.9;

  const zhUtterance = new SpeechSynthesisUtterance(parts[1].trim());
  zhUtterance.lang = 'zh-CN';
  zhUtterance.rate = 0.85;

  enUtterance.onend = () => window.speechSynthesis.speak(zhUtterance);
  window.speechSynthesis.speak(enUtterance);
}

/**
 * Attaches a delegated click handler for audio playback.
 * Listens for clicks on elements matching `selector` within `container`.
 * Expects the element to have a `data-example` attribute with bilingual text.
 */
export function initAudioPlayback(container, selector, playingClass) {
  if (!container) return;

  container.addEventListener('click', (e) => {
    const audioEl = e.target.closest(selector);
    if (!audioEl) return;

    const text = audioEl.dataset.example;
    if (!text) return;

    audioEl.classList.add(playingClass);
    speakBilingual(text);

    const checkDone = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        audioEl.classList.remove(playingClass);
        clearInterval(checkDone);
      }
    }, 200);
  });
}
