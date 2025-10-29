import React, { useEffect, useState } from 'react';
import { katakanaWords } from './KatakanaWordsChart';
const KatakanaWords = () => {
  

  const allWords = Object.keys(katakanaWords);

  const [quiz, setQuiz] = useState(allWords);
  const [currentWord, setCurrentWord] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [remaining, setRemaining] = useState(allWords.length);
  const [revealStatus, setRevealStatus] = useState(false);
  const [randomIndex, setRandomIndex] = useState(null);

  const [incorrect, setIncorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const selectWord = (data) => {
    if (!data || data.length === 0) return;
    const index = getRandomInt(data.length);
    setRandomIndex(index);
    setCurrentWord(data[index]);
  };

  // Start quiz immediately
  useEffect(() => {
    setQuiz(allWords);
    setRemaining(allWords.length);
    selectWord(allWords);
  }, []);

  // Input check
  useEffect(() => {
    if (!inputValue || !currentWord) return;
    const answer = katakanaWords[currentWord].romaji;

    if (inputValue.length === answer.length) {
      setTotalAttempts((prev) => prev + 1);
      if (inputValue === answer) {
        setInputValue('');
        const newQuiz = quiz.filter((_, i) => i !== randomIndex);
        setQuiz(newQuiz);
        setRemaining(newQuiz.length);
        setRevealStatus(false);
        if (newQuiz.length > 0) selectWord(newQuiz);
        else setCurrentWord(null);
      } else {
        setInputValue('');
        setIncorrect((prev) => prev + 1);
      }
    }
  }, [inputValue]);

  // Spacebar toggles reveal
  useEffect(() => {
    const handleSpace = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setRevealStatus((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, []);

  if (!currentWord) {
    return (
      <p className="text-3xl text-center mt-20 font-semibold text-gray-200">
        🎉 Quiz Complete!
      </p>
    );
  }

  return (
    <>
      <div className="flex justify-center gap-4 my-4">
        <p className="text-2xl font-semibold bg-gray-600 p-4 rounded-2xl text-center">
          Remaining: {remaining}
        </p>
        <p className="text-2xl font-semibold bg-gray-600 p-4 rounded-2xl text-center">
          Accuracy: {totalAttempts ? Math.round(((totalAttempts - incorrect) / totalAttempts) * 100) : 100}%
        </p>
        <p className="text-2xl font-semibold bg-gray-600 p-4 rounded-2xl text-center">
          Incorrect: {incorrect}
        </p>
      </div>

      {/* Katakana word */}
      <p className="text-4xl font-semibold text-center my-4 p-4 w-64 mx-auto h-20">
        {currentWord}
      </p>

      {/* English translation */}
      <p className="text-xl text-center text-gray-300 italic mb-2">
        {katakanaWords[currentWord].english}
      </p>

      {/* Reveal Romanji */}
      {revealStatus && (
        <p className="text-2xl text-center text-yellow-300 mb-4">
          {katakanaWords[currentWord].romaji}
        </p>
      )}

      <input
        type="text"
        className="block bg-gray-700 text-center rounded-2xl w-64 mx-auto text-2xl p-4"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
        autoFocus
      />

      <p
        className="text-2xl font-semibold text-center my-4 bg-gray-600 p-2 w-24 mx-auto rounded-2xl cursor-pointer"
        onClick={() => setRevealStatus((prev) => !prev)}
      >
        {revealStatus ? 'hide' : 'reveal'}
      </p>
    </>
  );
};

export default KatakanaWords;