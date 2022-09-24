import ReactDOM from "react-dom";
import palavras from "./palavras";
import "./reset.css";
import "./style.css";
import { useState } from "react";
import { images } from "./assets/images";

const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let wrong = 0;

function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
} // function to make the array 'palavras' randomized

fisherYatesShuffle(palavras);

function App() {
  function stringToArray(string) {
    let arrayVazio = [];
    for (let i = 0; i < string.length; i++) {
      arrayVazio.push(string[i]);
    }
    console.log(arrayVazio)
    return arrayVazio;
  }

  let [arrayWord, setArrayWord] = useState(stringToArray(palavras[0]));
  let [image, setImage] = useState(images[0]);
  let [rightLetters, setRightLetters] = useState([])

  function wordsClicked(word) {
    if (arrayWord.includes(word)) {
      for (let i = 0; i < arrayWord.length; i++) {
        console.log(word === arrayWord[i])
        if (word === arrayWord[i]) {
          setRightLetters([...rightLetters, word]);
        }
      }
    } else {
      wrongChoice();
    }
  }

  function wrongChoice() {
    console.log(wrong);
    wrong++;
    setImage(`images[${wrong}]`);
    console.log(image);
  }

  return (
    <>
      <div className="fatherTop">
        <img src={images[wrong]} alt="enforcado" />
        <div className="rightTop">
          <div className="choiceWord">Escolher Palavra</div>
          <div className="secretWord">
            {arrayWord.map((letra, index) => (
              <li>
                <div className={rightLetters.includes(letra) ? "" : "hidden" }>{letra}</div>
              </li>
            ))}
          </div>
        </div>
      </div>

      <div className="letters">
        {alfabeto.map((letra, index) => (
          <li onClick={() => wordsClicked(letra)}>{letra}</li>
        ))}
      </div>

      <div className="guessBox">
        <p>Já sei a palavra!</p>
        <input></input>
        <div className="try">Chutar</div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
