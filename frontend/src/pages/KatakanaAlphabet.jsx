import React, { useEffect, useState } from 'react';
import { katakanaChart } from './KatakanaChart';

const KatakanaAlphabet = () => {
  const katakanaRomanji = [
    { ア: 'a', イ: 'i', ウ: 'u', エ: 'e', オ: 'o' },
    { カ: 'ka', キ: 'ki', ク: 'ku', ケ: 'ke', コ: 'ko' },
    { サ: 'sa', シ: 'shi', ス: 'su', セ: 'se', ソ: 'so' },
    { タ: 'ta', チ: 'chi', ツ: 'tsu', テ: 'te', ト: 'to' },
    { ナ: 'na', ニ: 'ni', ヌ: 'nu', ネ: 'ne', ノ: 'no' },
    { ハ: 'ha', ヒ: 'hi', フ: 'fu', ヘ: 'he', ホ: 'ho' },
    { マ: 'ma', ミ: 'mi', ム: 'mu', メ: 'me', モ: 'mo' },
    { ヤ: 'ya', ユ: 'yu', ヨ: 'yo' },
    { ラ: 'ra', リ: 'ri', ル: 'ru', レ: 're', ロ: 'ro' },
    { ワ: 'wa', ヲ: 'wo' },
    { ン: 'n' },
    { ガ: 'ga', ギ: 'gi', グ: 'gu', ゲ: 'ge', ゴ: 'go' },
    { ザ: 'za', ジ: 'ji', ズ: 'zu', ゼ: 'ze', ゾ: 'zo' },
    { ダ: 'da', ヂ: 'di', ヅ: 'du', デ: 'de', ド: 'do' },
    { バ: 'ba', ビ: 'bi', ブ: 'bu', ベ: 'be', ボ: 'bo' },
    { パ: 'pa', ピ: 'pi', プ: 'pu', ペ: 'pe', ポ: 'po' }
  ];

  const columnTitles = [
    'A', 'K', 'S', 'T', 'N', 'H', 'M', 'Y', 'R', 'W', 'N', 'G', 'Z', 'D', 'B', 'P'
  ];

  const katakanaToRomanji = {
    ア: 'a', イ: 'i', ウ: 'u', エ: 'e', オ: 'o',
    カ: 'ka', キ: 'ki', ク: 'ku', ケ: 'ke', コ: 'ko',
    サ: 'sa', シ: 'shi', ス: 'su', セ: 'se', ソ: 'so',
    タ: 'ta', チ: 'chi', ツ: 'tsu', テ: 'te', ト: 'to',
    ナ: 'na', ニ: 'ni', ヌ: 'nu', ネ: 'ne', ノ: 'no',
    ハ: 'ha', ヒ: 'hi', フ: 'fu', ヘ: 'he', ホ: 'ho',
    マ: 'ma', ミ: 'mi', ム: 'mu', メ: 'me', モ: 'mo',
    ヤ: 'ya', ユ: 'yu', ヨ: 'yo',
    ラ: 'ra', リ: 'ri', ル: 'ru', レ: 're', ロ: 'ro',
    ワ: 'wa', ヲ: 'wo', ン: 'n',
    ガ: 'ga', ギ: 'gi', グ: 'gu', ゲ: 'ge', ゴ: 'go',
    ザ: 'za', ジ: 'ji', ズ: 'zu', ゼ: 'ze', ゾ: 'zo',
    ダ: 'da', ヂ: 'di', ヅ: 'du', デ: 'de', ド: 'do',
    バ: 'ba', ビ: 'bi', ブ: 'bu', ベ: 'be', ボ: 'bo',
    パ: 'pa', ピ: 'pi', プ: 'pu', ペ: 'pe', ポ: 'po'
  };
    


  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selectedHiragana");
    return saved ? JSON.parse(saved) : Array(katakanaRomanji.length).fill(true);
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
    const answer = katakanaToRomanji[currentPair];
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
    const filtered = katakanaChart.filter((_, index) => selected[index] !== false);
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
    const filtered = katakanaChart.filter((_, index) => selected[index] !== false);
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
      const filtered = katakanaChart.filter((_, index) => selected[index] !== false);
      const filteredKeys = filtered.flat().map(pair => pair[0]);
      setQuiz(filteredKeys);
      setRemaining(filteredKeys.length);
      setCurrentPair(null);
    }
  }, [quiz, quizMode, selected]);

  useEffect(() => {
    if (!inputValue || !currentPair) return;
    const answer = katakanaToRomanji[currentPair];
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
    <div className="flex justify-center gap-1 p-4 overflow-x-auto">
        {katakanaRomanji.map((row, colIndex) => {
          const isOn = selected[colIndex];

          // Check if this is the ん column
          const isNColumn = Object.values(row).includes('n');

          return (
            <div key={colIndex} className="grid grid-rows-7 gap-1 min-w-[50px] w-full max-w-[90px] text-center">
              {/* Column title */}
              <div className="font-bold text-gray-400 text-sm sm:text-base">{columnTitles[colIndex]}</div>

              {/* Toggle */}
              <div className="flex justify-center items-center py-1">
                <div
                  onClick={() => handleToggle(colIndex)}
                  className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                    isOn ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                      isOn ? 'translate-x-6' : ''
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
          {revealStatus ? katakanaToRomanji[currentPair] : currentPair}
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

export default KatakanaAlphabet;