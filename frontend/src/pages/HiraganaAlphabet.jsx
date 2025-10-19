import React, { useState } from 'react';

const HiraganaAlphabet = () => {
  // Hiragana data
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

  // Track toggle states
  const [toggles, setToggles] = useState(hiraganaRomanji.map(() => true));
  const [quizMode, setQuizMode] = useState(false);

  // Toggle a column
  const handleToggle = (index) => {
    setToggles((prev) => prev.map((on, i) => (i === index ? !on : on)));
  };

  // Start quiz
  const startQuiz = () => setQuizMode(true);

  // Filter selected columns
  const selectedGroups = hiraganaRomanji.filter((_, i) => toggles[i]);

  // Row component
  const Row = ({ chars, isOn, onToggle }) => {
    const basePattern = ['a', 'i', 'u', 'e', 'o'];

    return (
      <div className="grid grid-rows-6 gap-2 min-w-[100px] items-center">
        {/* Section Label */}
        <div className="text-center font-bold text-lg text-gray-400">
          {Object.values(chars)[0][0].toUpperCase()}
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center">
          <div
            onClick={onToggle}
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

        {/* Characters */}
        {basePattern.map((vowel, i) => {
          const match = Object.entries(chars).find(([_, rom]) =>
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
                  <span className="text-2xl mb-1 text-yellow-100">{match[0]}</span>
                  <span className="text-sm text-gray-400">{match[1]}</span>
                </>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Quiz component
  const Quiz = ({ selectedGroups, onBack }) => {
    return (
      <div className="p-4 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Quiz Mode</h2>
        <p className="mb-2">You selected {selectedGroups.length} groups:</p>
        {console.log(selectedGroups)}

        <div className="flex flex-wrap justify-center gap-2">
          {selectedGroups.map((group, i) => (
            <div key={i} className="p-2 bg-gray-800 rounded">
              {Object.values(group)[0][0].toUpperCase()}
            </div>
          ))}
        </div>

        <button
          onClick={onBack}
          className="mt-6 px-4 py-2 bg-red-500 rounded hover:bg-red-400"
        >
          Back
        </button>
      </div>
    );
  };

  // Main render
  if (quizMode) {
    return <Quiz selectedGroups={selectedGroups} onBack={() => setQuizMode(false)} />;
  }

  return (
    <>
      <div className="text-2xl font-semibold text-center my-4 text-gray-200">
        Hiragana Alphabet
      </div>

      <div className="flex flex-nowrap overflow-x-auto gap-4 p-4">
        {hiraganaRomanji.map((row, i) => (
          <Row
            key={i}
            chars={row}
            isOn={toggles[i]}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={startQuiz}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          Start Quiz
        </button>
      </div>
    </>
  );
};

export default HiraganaAlphabet;