import Jogo from "./Jogo";
import Letras from "./Letras";
import { useState } from "react";
import palavras from "./palavras";
import Chute from "./Chute";

export default function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentGameState, setCurrentGameState] = useState(0);
    const [currentGameWord, setCurrentGameWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    const [hasWonGame, setWonGame] = useState(false);
    
    const removeDiacritics = require('diacritics').remove;

    function isEqual(str1, str2) {
        return removeDiacritics(str1.toLowerCase()) === removeDiacritics(str2.toLowerCase());
    }


    function StartGame() {

        let palavra = palavras[getRandomInt(0, palavras.length-1)];
        setGameStarted(true);
        setCurrentGameState(0);
        setCurrentGameWord(palavra);
        setGuessedLetters([]);
        setWonGame(false);
        console.log(palavra);
    }

    function addGuessedLetter(char)
    {
        setGuessedLetters([
            ...guessedLetters,char
        ]);

        setCurrentGameState(currentGameState + (removeDiacritics(currentGameWord).toLowerCase().includes(char) ? 0 : 1 ))
    }


    function getCurrentUnderlinedWord() {
        if(currentGameState == 6 || hasWonGame == true)
        {
            return currentGameWord;
        }

        let word = '';

        for (let index = 0; index < currentGameWord.length; index++) {
            word += guessedLetters.includes(removeDiacritics(currentGameWord[index].toLowerCase())) ? currentGameWord[index] : " _";
        }

        if(isEqual(word, currentGameWord))
        {
            setWonGame(true);
        }

        return word;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function guessWord(word)
    {
        if(currentGameState == 6 || hasWonGame)
        {
            return;
        }

        if(isEqual(word, currentGameWord))
        {
            setWonGame(true);
        }
        else
        {
            setCurrentGameState(6);
        }
    }

    return (
        <div className="website">
            <Jogo onChange = {StartGame}  gameState={currentGameState} currentWord={getCurrentUnderlinedWord()} wonGame ={hasWonGame}  />
            <Letras guessedLettersArr = {guessedLetters} onChange = {(char) => addGuessedLetter(char)} gameState={currentGameState} isGameStarted={gameStarted} wonGame = {hasWonGame}/>
            <Chute onChange = {(gword) => guessWord(gword)} wonGame ={hasWonGame}  gameState={currentGameState} isGameStarted={gameStarted}/>
        </div>
    );
}
