import React, { useEffect, useState } from 'react';
import { hiraganaChart } from './HiraganaChart';

const HiraganaAlphabet = () => {
 
  const hiraganaRomanji = [
    { あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o' },
    { か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko' },
    { さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so' },
    { た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to' },
    { な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no' },
    { は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho' },
    { ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo' },
    { や: 'ya', ゆ: 'yu', よ: 'yo' },
    { ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro' },
    { わ: 'wa', を: 'wo', ん: 'n' },
    { が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go' },
    { ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo' },
    { だ: 'da', ぢ: 'di', づ: 'du', で: 'de', ど: 'do' },
    { ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo' },
    { ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po' }
  ];


  const [selected, setSelected] = useState(hiraganaRomanji.map(() => true))

  const [quizMode, setQuizMode] = useState(false);

  const [quiz, setQuiz] = useState(hiraganaRomanji)

  const [currentPair, setCurrentPair] = useState()


  const handleToggle = (index) => {

    setSelected((prev) => prev.map((on, i) => (i === index ? !on : on))); 
  }

  useEffect(() => {
  const filteredKeys = hiraganaChart.flat().map(pair => pair[0]);
  console.log(filteredKeys);

 
    
    const filtered = hiraganaChart.filter((_, index) => {(selected[index] != false)});
 

    setQuiz(filtered) 
    if(quizMode){
      
    selectCharacter(quiz)
    }
  },[selected])



  const Row = ({ chars, isOn, onToggle}) => {
     const basePattern = ['a', 'i', 'u', 'e', 'o'];

    return (
      <div className="grid grid-rows-6 gap-2 min-w-[100px] items-center">

        {/* Section Label (like K, S, T...) */}
        <div className="text-center font-bold text-lg text-gray-400">
          {Object.values(chars)[0][0].toUpperCase()}
        </div>

        {/* Centered Toggle Switch */}
        <div className="flex justify-center">
          <div
            onClick={() => onToggle()}
            className={`relative w-10 h-5 rounded-full cursor-pointer transition-colors duration-300 ${
              isOn ? 'bg-green-500' : 'bg-gray-500'
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                isOn ? 'translate-x-5' : ''
              }`}
            ></div>
          </div>
        </div>

        {/* Character Rows */}
        {basePattern.map((vowel, i) => {
          const match = Object.entries(chars).find(([jp, rom]) =>
            rom.endsWith(vowel)
          );

          return (
            <div
              key={i}
              className="bg-gray-900 text-white p-2 text-center rounded transition-opacity duration-300 flex flex-col items-center"
              style={{ opacity: isOn ? 1 : 0.15 }}
            >
              {match ? (
                <>
                  <span className="text-2xl mb-1 text-yellow-100">{match[0]}</span> {/* Hiragana */}
                  <span className="text-sm text-gray-400">{match[1]}</span> {/* Romaji */}
                </>
              ) : (
                <span>&nbsp;</span> // keeps spacing even if empty
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const Column = () => {
    return (
      <div className="flex flex-nowrap overflow-x-auto gap-4 p-4">
        {hiraganaRomanji.map((row, i) => (
          <Row key={i} chars={row}  isOn={selected[i]} onToggle={() => handleToggle(i)}/>
        ))}
      </div>
    );
  };

  const selectCharacter = (data)=>{

      console.log(quiz)
    if(data.length==0){
      const filtered = hiraganaChart.filter((_, index) => selected[index] != false);
      setQuiz(filtered) 
      console.log("reset")
      return;
    }
    if(data.length[0]==0){
      const filtered = hiraganaChart.filter((_, index) => selected[index] != false);
      setQuiz(filtered)       
      console.log("reset")

      return;
    }

    var row = getRandomInt(data.length)
    var col = getRandomInt(data[row].length)
    while(!data[row][col] || data[row].length == 0){
      
      row = getRandomInt(data.length)
      col = getRandomInt(data[row].length)
    
    }
    const newChart = data.map(rows => [...rows]);
    const [info] = newChart[row].splice(col, 1); // remove and return that pair

    setQuiz(newChart);
    setCurrentPair(info);
  }

  useEffect(()=>{

    if(quiz){ 
      for(let i=0; i<quiz.length; i++ ){

        if(quiz[i].length==0){

          quiz.splice(i,1)
        }
      }
    }
  },[quiz])
 
  useEffect(() => {
    if (quizMode && quiz.length > 0) {
      selectCharacter(quiz);
    }
  }, [quizMode]);

  if(quizMode){
    return(
      <>
      <p className='text-2xl font-semibold text-center my-4 bg-gray-500 p-4 w-64 mx-auto h-20'>{currentPair}</p>
      <input type="text" className='block  bg-gray-700 text-center rounded-2xl w-64 mx-auto h-20 text-2xl p-4'/>
      <p className='text-2xl font-semibold text-center my-4 bg-green-500 p-1 w-64 mx-auto'
        onClick={()=>{selectCharacter(quiz)}}
      >
        next
      </p>
      <p className='text-2xl font-semibold text-center my-4 bg-green-500 p-1 w-64 mx-auto'
        onClick={()=>{selectCharacter(quiz)}}
      >
        next
      </p>
      <button className='text-2xl font-semibold text-center my-4 bg-gray-500 p-1'
        onClick={()=>{quizMode?(setQuizMode(false)):(setQuizMode(true))}}
      >
        exit quizMode
      </button>
      </>
    )
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



  return (
    <>
      <div className="text-2xl font-semibold text-center my-4 text-gray-200">
        Hiragana Alphabet
      </div>
      <Column />

      <button className='text-2xl font-semibold text-center my-4 bg-green-600 p-4 rounded-2xl'
        onClick={() => {
          if (!quizMode) {
            // Before entering quiz mode, select the first character
            selectCharacter(quiz);
          }
          setQuizMode(!quizMode);
        }}      
        >
        quizMode
      </button>
    </>
  );
};

export default HiraganaAlphabet;