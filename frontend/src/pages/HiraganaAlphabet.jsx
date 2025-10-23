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
    { わ: 'wa', を: 'wo' },
    { ん: 'n' },
    { が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go' },
    { ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo' },
    { だ: 'da', ぢ: 'di', づ: 'du', で: 'de', ど: 'do' },
    { ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo' },
    { ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po' }
  ];

  // Column titles in order, easy to change
  const columnTitles = [
    'A', 'K', 'S', 'T', 'N', 'H', 'M', 'Y', 'R', 'W', 'N', 'G', 'Z', 'D', 'B', 'P'
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
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedHiragana");
    return saved ? JSON.parse(saved) : Array(hiraganaRomanji.length).fill(true);
  });
  const [quizMode, setQuizMode] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [currentPair, setCurrentPair] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [remaining, setRemaining] = useState(0);
  const [randomIndex, setRandomIndex] = useState(null);
  const [revealStatus, setRevealStatus] = useState(false);




  const [incorrect, setIncorrect] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  
  useEffect(() => {
    if (!inputValue || !currentPair) return;
    const answer = hiraganaToRomanji[currentPair];
    if (inputValue.length === answer.length) {
      setTotalAttempts(prev => prev + 1); // increment total attempts
      if (inputValue === answer) {
        setInputValue('');
        const newChart = quiz.filter((_, i) => i !== randomIndex);
        setQuiz(newChart);
        setRemaining(newChart.length);
        setRevealStatus(false);
        if (newChart.length > 0) selectCharacter(newChart);
        else setCurrentPair(null);
      } else {
        setInputValue('');
        setIncorrect(prev => prev + 1); // increment incorrect counter
      }
    }
  }, [inputValue]);



  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const handleToggle = (index) => {
    setSelected(prev => prev.map((on, i) => (i === index ? !on : on)));
  };

  useEffect(() => {
    const filtered = hiraganaChart.filter((_, index) => selected[index] !== false);
    const filteredKeys = filtered.flat().map(pair => pair[0]);
    setRemaining(filteredKeys.length);
    setQuiz(filteredKeys);

    localStorage.setItem("selectedHiragana", JSON.stringify(selected));
  }, [selected]);

  const selectCharacter = (data) => {
    if (!data || data.length === 0) return;
    const index = getRandomInt(data.length);
    setRandomIndex(index);
    setCurrentPair(data[index]);
  };

  const startQuiz = () => {
    const filtered = hiraganaChart.filter((_, index) => selected[index] !== false);
    const filteredKeys = filtered.flat().map(pair => pair[0]);
    setQuiz(filteredKeys);
    setRemaining(filteredKeys.length);
    setQuizMode(true);
    setInputValue('');
    setRevealStatus(false);
    setCurrentPair(null);
  };

  useEffect(() => {
    if (quizMode && quiz.length > 0 && !currentPair) selectCharacter(quiz);
  }, [quiz, quizMode]);

  useEffect(() => {
    if (quizMode && quiz.length === 0) {
      const filtered = hiraganaChart.filter((_, index) => selected[index] !== false);
      const filteredKeys = filtered.flat().map(pair => pair[0]);
      setQuiz(filteredKeys);
      setRemaining(filteredKeys.length);
      setCurrentPair(null);
    }
  }, [quiz, quizMode, selected]);

  useEffect(() => {
    if (!inputValue || !currentPair) return;
    const answer = hiraganaToRomanji[currentPair];
    if (inputValue.length === answer.length) {
      if (inputValue === answer) {
        setInputValue('');
        const newChart = quiz.filter((_, i) => i !== randomIndex);
        setQuiz(newChart);
        setRemaining(newChart.length);
        setRevealStatus(false);
        if (newChart.length > 0) selectCharacter(newChart);
        else setCurrentPair(null);
      } else setInputValue('');
    }
  }, [inputValue]);

  useEffect(() => {
    if (!quizMode) return;
    const handleSpace = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setRevealStatus(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, [quizMode]);

  // Each column displays in top-to-bottom vowel order
  const Column = () => {
    const basePattern = ['a', 'i', 'u', 'e', 'o'];

    return (
      <div className="flex flex-nowrap overflow-x-auto gap-4 p-4">
        {hiraganaRomanji.map((row, colIndex) => {
          const isOn = selected[colIndex];

          // Check if this is the ん column
          const isNColumn = Object.values(row).includes('n');

          return (
            <div key={colIndex} className="grid grid-rows-7 gap-1 min-w-[50px] w-full max-w-[90px] text-center">
              {/* Column title */}
              <div className="font-bold text-gray-400 text-sm sm:text-base">{columnTitles[colIndex]}</div>

              {/* Toggle */}
              <div className="flex justify-center">
                <div
                  onClick={() => handleToggle(colIndex)}
                  className={`relative w-10 sm:w-12 h-6 sm:h-7 rounded-full cursor-pointer transition-colors duration-300 ${
                    isOn ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                >
                  <div
                    className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      isOn ? 'translate-x-4 sm:translate-x-5' : ''
                    }`}
                  ></div>
                </div>
              </div>

              {/* Hiragana characters */}
              {isNColumn
                ? // For the ん column: show 'ん' at top, rest invisible
                  [0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-gray-900 text-white py-[2px] rounded transition-opacity duration-300 flex flex-col items-center"
                      style={{ opacity: isOn ? 1 : 0.2 }}
                    >
                      {i === 0 ? (
                        <>
                          <span className="text-lg sm:text-xl text-yellow-100 leading-none">ん</span>
                          <span className="text-[10px] sm:text-xs text-gray-400">n</span>
                        </>
                      ) : (
                        <span className="invisible">.</span>
                      )}
                    </div>
                  ))
                : // For other columns: use normal vowel matching
                  basePattern.map((vowel, i) => {
                    const match = Object.entries(row).find(([_, rom]) => rom.endsWith(vowel));
                    return (
                      <div
                        key={i}
                        className="bg-gray-900 text-white py-[2px] rounded transition-opacity duration-300 flex flex-col items-center"
                        style={{ opacity: isOn ? 1 : 0.2 }}
                      >
                        {match ? (
                          <>
                            <span className="text-lg sm:text-xl text-yellow-100 leading-none">{match[0]}</span>
                            <span className="text-[10px] sm:text-xs text-gray-400">{match[1]}</span>
                          </>
                        ) : (
                          <span className="invisible">.</span>
                        )}
                      </div>
                    );
                  })}
            </div>
          );
        })}
      </div>
    );
  };

  if (quizMode) {
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
        <p className="text-4xl font-semibold text-center my-4 p-4 w-64 mx-auto h-20">
          {revealStatus ? hiraganaToRomanji[currentPair] : currentPair}
        </p>
        <input
          type="text"
          className="block bg-gray-700 text-center rounded-2xl w-64 mx-auto text-2xl p-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
          autoFocus
        />
        <p
          className="text-2xl font-semibold text-center my-4 bg-gray-600 p-2 w-24 mx-auto rounded-2xl cursor-pointer"
          onClick={() => setRevealStatus(prev => !prev)}
        >
          {revealStatus ? 'hide' : 'reveal'}
        </p>
        <button
          onClick={() => setQuizMode(false)}
          className="bg-red-900 text-white px-6 py-2 rounded-2xl text-xl block mx-auto mt-4"
        >
          Exit Quiz
        </button>
      </>
    );
  }

  return (
    <>
      <div className="text-2xl font-semibold text-center my-4 text-gray-200">Hiragana Alphabet</div>
      <Column />
      <button
        className="text-2xl font-semibold text-center my-4 bg-green-600 p-4 rounded-2xl block mx-auto"
        onClick={() => !quizMode && startQuiz()}
      >
        quizMode
      </button>
    </>
  );
};

export default HiraganaAlphabet;