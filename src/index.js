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
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let arrayVazio = [];
    for (let i = 0; i < string.length; i++) {
      arrayVazio.push(string[i]);
    }
    console.log(string);
    return arrayVazio;
  }

  let [arrayWord, setArrayWord] = useState(stringToArray(""));
  let [image, setImage] = useState(images[0]);
  let [rightLetters, setRightLetters] = useState([]);
  let [lettersClicked, setLettersClicked] = useState([]);
  let [win, setWin] = useState(0);
  let [lose, setLose] = useState(0);
  let [res, setRes] = useState("");

  function wordsClicked(word) {

    
    setLettersClicked([...lettersClicked, word]);


    if (arrayWord.includes(word)) {
      for (let i = 0; i < arrayWord.length; i++) {
        if (word === arrayWord[i]) {
          setRightLetters([...rightLetters, word]);
        }
      }
    } else {
      wrongChoice();
    }
  }


  function wrongChoice() {
    if (wrong >= 5) {
      wrong++;
      setImage(`images[${wrong}]`);
      setLettersClicked(alfabeto);
      setRightLetters(arrayWord);
      setLose(true)
    } else {
      wrong++;
      setImage(`images[${wrong}]`);
    }
  }

  function tentar(res) {
    console.log(res === palavras[0])
    if (res === palavras[0]) {
      console.log("acertou!");
      setLettersClicked(alfabeto);
      setRightLetters(arrayWord);
      setWin(true)
    } else {
      wrongChoice()
    }
  }

  return (
    <>
      <div className="fatherTop">
        <img src={images[wrong]} alt="enforcado" />
        <div className="rightTop">
          <div className="choiceWord" onClick={() => setArrayWord(stringToArray(palavras[0]))}>
            Escolher Palavra
          </div>
          <div className="secretWord">
            {arrayWord.map((letra, index) => (
              <li>
                <div>
                  {rightLetters.includes(letra) ? letra :"_"}
                </div>
              </li>
            ))}
          </div>
        </div>
      </div>

      <div className="letters">
        {alfabeto.map((letra, index) => (
          <ul>
            <li
              onClick={() =>
                lettersClicked.includes(letra) ? "" : wordsClicked(letra)
              }
              className={lettersClicked.includes(letra) ? "clicked" : ""}
            >
              {letra}
            </li>
          </ul>
        ))}
      </div>

      <div className="guessBox">
        <p>Já sei a palavra!</p>
        <input
          type="text"
          value={res}
          onChange={(e) => setRes(e.target.value)}
        ></input>
        <div className="try" onClick={() => tentar(res)}>
          Chutar
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
