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
const audioSelector = <HTMLAudioElement>document.querySelector(`.word-meaning`);

// Values
let searchValue: string = ``;

// Funcs
const wordFetcher = async (searchVal: string) => {
  const res = await fetch(`${apiRoute}${searchVal}`);

  return res.json();
};

// Event Listeners
searchInputSelector.addEventListener(`keyup`, (e) => {
  e.preventDefault();

  if (e.keyCode === 13) {
    e.target && (searchValue = (e.target as HTMLInputElement).value);
    wordFetcher(searchValue).then((res) => {
      console.log(res);
    });
  }
});
