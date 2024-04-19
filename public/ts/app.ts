// Types
type WordAudio = undefined | string;

// Utils
const $: Document = document;
const apiRoute: string = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

// Dom Elements
const searchInputSelector = <HTMLInputElement>$.querySelector(`.input`);
const wordTitleSelector = <HTMLParagraphElement>(
  document.querySelector(`.word-title`)
);
const wordMeaningSelector = <HTMLParagraphElement>(
  document.querySelector(`.word-meaning`)
);
const audioSelector = <HTMLAudioElement>document.querySelector(`.audio`);
const meaningContainerSelector = <HTMLDivElement>(
  document.querySelector(`.meaning-container`)
);

// Values
let searchValue: string = ``;

// Funcs
const wordFetcher = async (searchVal: string) => {
  const res = await fetch(`${apiRoute}${searchVal}`);

  return res.json();
};

// Event Listeners
window.addEventListener(`load`, () => {
  searchInputSelector.focus();
});
window.removeEventListener(`load`, () => {
  searchInputSelector.focus();
});

searchInputSelector.addEventListener(`keyup`, (e) => {
  e.preventDefault();

  if (e.keyCode === 13) {
    e.target && (searchValue = (e.target as HTMLInputElement).value);
    wordFetcher(searchValue)
      .then((res) => {
        let wordTitle: WordAudio = res[0].word;
        let wordMeaning: WordAudio =
          res[0].meanings[0].definitions[0].definition;
        let wordAudio: WordAudio = res[0].phonetics[0].audio;

        meaningContainerSelector.classList.remove(`hidden`);
        meaningContainerSelector.classList.add(`block`);
        wordTitle
          ? (wordTitleSelector.innerHTML = wordTitle)
          : (wordTitleSelector.innerHTML = `___`);
        wordMeaning
          ? (wordMeaningSelector.innerHTML = wordMeaning)
          : (wordMeaningSelector.innerHTML = `___`);
        (wordAudio as string).length
          ? (function () {
              audioSelector.setAttribute(`src`, wordAudio as string);
              audioSelector.classList.remove(`hidden`);
              audioSelector.classList.add(`block`);
            })()
          : (function () {
              audioSelector.classList.remove(`block`);
              audioSelector.classList.add(`hidden`);
            })();

        console.log(res);
      })
      .catch((err: Error) => {
        meaningContainerSelector.classList.remove(`block`);
        meaningContainerSelector.classList.add(`hidden`);

        alert(`Sorry, The Word Is Not Found!`);
        console.log(err);
      })
      .finally(() => {
        searchInputSelector.value = ``;
        searchInputSelector.focus();
      });
  }
});
