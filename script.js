const textarea = document.querySelector("textarea");
const voicelist = document.querySelector("select");
const speechBtn = document.querySelector("button");
const synth = window.speechSynthesis;

voices();

function voices() {
    const voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
        const voice = voices[i];
        const selected = voice.name === "Google US English" ? "selected" : "";
        voicelist.insertAdjacentHTML("beforeend", `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`);
    }
}

function textToSpeech(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = synth.getVoices().find(v => v.name === voicelist.value);
    utterance.voice = voice;
    synth.speak(utterance);
}

function updateSpeechButton() {
    if (synth.speaking) {
        synth.pause();
        speechBtn.innerText = "Resume Speech";
    } else {
        synth.resume();
        speechBtn.innerText = "Pause Speech";
    }
}

speechBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (textarea.value.trim() !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
            speechBtn.innerText = "Pause Speech";
        } else {
            updateSpeechButton();
        }
    } else {
        speechBtn.innerText = "Convert to Speech";
    }
});

synth.addEventListener("voiceschanged", voices);
