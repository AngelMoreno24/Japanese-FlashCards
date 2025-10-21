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
  const hiraganaToRomanji = {
    あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
    か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
    さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
    た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
    な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
    は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
    ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
    や: 'ya', ゆ: 'yu', よ: 'yo',
    ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
    わ: 'wa', を: 'wo', ん: 'n',
    が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
    ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
    だ: 'da', ぢ: 'di', づ: 'du', で: 'de', ど: 'do',
    ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
    ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po'
  };
    
  const romanjiToHiragana = {
    a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
    ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
    sa: 'さ', shi: 'し', su: 'す', se: 'せ', so: 'そ',
    ta: 'た', chi: 'ち', tsu: 'つ', te: 'て', to: 'と',
    na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
    ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ',
    ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
    ya: 'や', yu: 'ゆ', yo: 'よ',
    ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
    wa: 'わ', wo: 'を', n: 'ん',
    ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
    za: 'ざ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
    da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど',
    ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
    pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ'
  };

  const [selected, setSelected] = useState(hiraganaRomanji.map(() => true))

  const [quizMode, setQuizMode] = useState(false);

  const [quiz, setQuiz] = useState(hiraganaRomanji)

  const [currentPair, setCurrentPair] = useState()

  const [inputValue, setInputValue] = useState(''); // Initialize with an empty string

  const [remaining, setRemaining] = useState(71); // Initialize with an empty string

  const handleToggle = (index) => {

    setSelected((prev) => prev.map((on, i) => (i === index ? !on : on))); 
  }

  useEffect(() => {

 
    
    const filtered = hiraganaChart.filter((_, index) => selected[index] !== false);
 

    const filteredKeys = filtered.flat().map(pair => pair[0]);
    console.log(filteredKeys);


    setRemaining(filteredKeys.length)
    setQuiz(filteredKeys) 
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

    var randomIndex = getRandomInt(data.length)

    var newChart = data.map(rows => [...rows]);
    var [info] = newChart.splice(randomIndex, 1); // remove and return that pair
console.log(info)
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
 
  

  const reveal = () => {
    setRevealStatus(prev => !prev);
  };
  
  const [revealStatus,setRevealStatus] = useState(false)
  useEffect(() => {
    if(inputValue){


        if (inputValue.length == hiraganaToRomanji[currentPair].length) {
          
          if (inputValue == hiraganaToRomanji[currentPair]) {
            console.log("correct")
            setInputValue("")
            //reduce remaining by 1
            setRemaining(remaining-1);
            selectCharacter(quiz)
          }else{
            
            console.log("wrong")
            setInputValue("")
          }
        }


    }
  }, [inputValue]);

  useEffect(() => {
    if (!quizMode) return; // 🚫 don't add listener if quizMode is false

    const handleSpace = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        reveal();
      }
    };

    window.addEventListener('keydown', handleSpace);
    console.log('Spacebar listener active');

    // 🧹 cleanup when quizMode turns false or component unmounts
    return () => {
      window.removeEventListener('keydown', handleSpace);
      console.log('Spacebar listener removed');
    };
  }, [quizMode]); // runs whenever quizMode changes

  if(quizMode){
    return(
      <>
      <p className='text-2xl font-semibold text-center my-4 bg-gray-600 p-4 w-64 mx-auto h-auto rounded-2xl'>remaining: {remaining}</p>

      <p className='text-4xl font-semibold text-center my-4 p-4 w-64 mx-auto h-20'>
        {revealStatus ? hiraganaToRomanji[currentPair] : currentPair}
      </p>
      
      <input type="text" className='block  bg-gray-700 text-center rounded-2xl w-64 mx-auto h-auto text-2xl p-4'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}

      />
      
      {revealStatus==true?
      (
      <p className='text-2xl font-semibold text-center my-4 bg-gray-600 p-2 w-24 mx-auto h-auto rounded-2xl'
        onClick={()=>{reveal()}}
      >
        hide
      </p>

      ):(

      <p className='text-2xl font-semibold text-center my-4 bg-gray-600 p-2 w-24 mx-auto h-auto rounded-2xl'
        onClick={()=>{reveal()}}
      >
        reveal
      </p>
      )

      }
       
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