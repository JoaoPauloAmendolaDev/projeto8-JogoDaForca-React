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
let string = "";

function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); //random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
} // function to make the array 'palavras' randomized

fisherYatesShuffle(palavras);

function App() {
  function stringToArray(palavra) {
    //unclickLetters()
    string = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let arrayVazio = [];
    for (let i = 0; i < string.length; i++) {
      arrayVazio.push(string[i]);
    }
    console.log(string);
    return arrayVazio;
  }

  let [arrayWord, setArrayWord] = useState(stringToArray(palavras[0]));
  let [image, setImage] = useState(images[0]);
  let [rightLetters, setRightLetters] = useState([]);
  let [lettersClicked, setLettersClicked] = useState(alfabeto);
  let [win, setWin] = useState(false);
  let [lose, setLose] = useState(false);
  let [res, setRes] = useState("");

  function wordsClicked(word) {
    setLettersClicked([...lettersClicked, word]);

    if (arrayWord.includes(word)) {
      for (let i = 0; i < arrayWord.length; i++) {
        if (word === arrayWord[i]) {
          rightLetters.push(word);
          console.log(rightLetters);
        }
      }
    } else {
      wrongChoice();
    }
    setRightLetters([...rightLetters]);
    if (rightLetters.length === arrayWord.length) {
      winner();
    }
  }

  function wrongChoice() {
    if (wrong >= 5) {
      wrong++;
      loser();
    } else {
      wrong++;
      setImage(`images[${wrong}]`);
    }
  }

  function tentar(res) {
    res = res.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    console.log(res);
    console.log(string);
    if (res === string) {
      console.log("entrei no if da vitória");
      winner();
    } else {
      console.log("entrei no if da derrota");
      wrongChoice();
    }
  }
  function unclickLetters() {
    setLettersClicked([]);
  }

  function winner() {
    setTimeout(() => {
      setLettersClicked(alfabeto);
      setRightLetters(arrayWord);
      setWin(true);
    }, 20);
  }

  function loser() {
    setTimeout(() => {
      setLettersClicked(alfabeto);
      setRightLetters(arrayWord);
      setLose(true);
    }, 20);
  }

  return (
    <>
      <div className="fatherTop">
        <img src={images[wrong]} alt="enforcado" />
        <div className="rightTop">
          <div
            className="choiceWord"
            onClick={() => setArrayWord(stringToArray(palavras[0]))}
          >
            <div
              className="liberateLetters"
              onClick={() => unclickLetters()}
            ></div>
            Escolher Palavra
          </div>
          <div className="secretWord">
            {arrayWord.map((letra, index) => (
              <li>
                <div className={win == true ? "green" : ""}>
                  <div className={lose == true ? "red" : ""}>
                    {rightLetters.includes(letra) ? letra : "_"}
                  </div>
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
        <div
          className="try"
          onClick={() => (!lose || !win || wrong == 6 ? tentar(res) : "")}
        >
          Chutar
        </div>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
