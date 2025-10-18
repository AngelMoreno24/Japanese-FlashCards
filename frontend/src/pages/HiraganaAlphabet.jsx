import React, { useState } from 'react';

const HiraganaAlphabet = () => {

  const Row = ({ chars }) => {
    const [isOn, setIsOn] = useState(true);
    const basePattern = ['a', 'i', 'u', 'e', 'o'];

    return (
      <div className="grid grid-rows-6 gap-2 min-w-[100px] items-center">
        {/* Centered Toggle Switch */}
        <div className="flex justify-center">
          <div
            onClick={() => setIsOn(!isOn)}
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
            <p
              key={i}
              className="bg-gray-900 text-white p-2 text-center rounded transition-opacity duration-300"
              style={{ opacity: isOn ? 1 : 0.15 }}
            >
              {match ? `${match[0]}: ${match[1]}` : ''}
            </p>
          );
        })}
      </div>
    );
  };

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

  const Column = () => {
    return (
      <div className="flex flex-nowrap overflow-x-auto gap-4 p-4">
        {hiraganaRomanji.map((row, i) => (
          <Row key={i} chars={row} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="text-2xl font-semibold text-center my-4 text-gray-200">
        Hiragana Alphabet
      </div>
      <Column />
    </>
  );
};

export default HiraganaAlphabet;