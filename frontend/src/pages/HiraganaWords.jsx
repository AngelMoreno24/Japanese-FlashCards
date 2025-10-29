import React, { useEffect, useState } from 'react';

const HiraganaWords = () => {
  const hiraganaWords = {
    こんにちは: { romaji: 'konnichiwa', english: 'hello' },
    おはよう: { romaji: 'ohayou', english: 'good morning' },
    こんばんは: { romaji: 'konbanwa', english: 'good evening' },
    さようなら: { romaji: 'sayounara', english: 'goodbye' },
    ありがとう: { romaji: 'arigatou', english: 'thank you' },
    はい: { romaji: 'hai', english: 'yes' },
    いいえ: { romaji: 'iie', english: 'no' },
    すみません: { romaji: 'sumimasen', english: 'excuse me / sorry' },
    おねがいします: { romaji: 'onegaishimasu', english: 'please' },
    ごめんなさい: { romaji: 'gomennasai', english: 'I’m sorry' },
    わたし: { romaji: 'watashi', english: 'I / me' },
    あなた: { romaji: 'anata', english: 'you' },
    かれ: { romaji: 'kare', english: 'he' },
    かのじょ: { romaji: 'kanojo', english: 'she' },
    ともだち: { romaji: 'tomodachi', english: 'friend' },
    いち: { romaji: 'ichi', english: 'one' },
    に: { romaji: 'ni', english: 'two' },
    さん: { romaji: 'san', english: 'three' },
    よん: { romaji: 'yon', english: 'four' },
    ご: { romaji: 'go', english: 'five' },
    やま: { romaji: 'yama', english: 'mountain' },
    かわ: { romaji: 'kawa', english: 'river' },
    はな: { romaji: 'hana', english: 'flower' },
    そら: { romaji: 'sora', english: 'sky' },
    みず: { romaji: 'mizu', english: 'water' },
    ごはん: { romaji: 'gohan', english: 'rice / meal' },
    みそしる: { romaji: 'misoshiru', english: 'miso soup' },
    さかな: { romaji: 'sakana', english: 'fish' },
    にく: { romaji: 'niku', english: 'meat' },
    やさい: { romaji: 'yasai', english: 'vegetables' },
    きょう: { romaji: 'kyou', english: 'today' },
    あした: { romaji: 'ashita', english: 'tomorrow' },
    きのう: { romaji: 'kinou', english: 'yesterday' },
    とき: { romaji: 'toki', english: 'time' },
    じかん: { romaji: 'jikan', english: 'hour / time' },
    がっこう: { romaji: 'gakkou', english: 'school' },
    せんせい: { romaji: 'sensei', english: 'teacher' },
    がくせい: { romaji: 'gakusei', english: 'student' },
    ほん: { romaji: 'hon', english: 'book' },
    えんぴつ: { romaji: 'enpitsu', english: 'pencil' },
    いえ: { romaji: 'ie', english: 'house' },
    みせ: { romaji: 'mise', english: 'shop' },
    まち: { romaji: 'machi', english: 'town' },
    えき: { romaji: 'eki', english: 'station' },
    くるま: { romaji: 'kuruma', english: 'car' },
    たべる: { romaji: 'taberu', english: 'to eat' },
    のむ: { romaji: 'nomu', english: 'to drink' },
    みる: { romaji: 'miru', english: 'to see / watch' },
    いく: { romaji: 'iku', english: 'to go' },
    くる: { romaji: 'kuru', english: 'to come' },
    ちち: { romaji: 'chichi', english: 'father' },
    はは: { romaji: 'haha', english: 'mother' },
    あに: { romaji: 'ani', english: 'older brother' },
    あね: { romaji: 'ane', english: 'older sister' },
    いもうと: { romaji: 'imouto', english: 'younger sister' }
  };

  const allWords = Object.keys(hiraganaWords);

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
    const answer = hiraganaWords[currentWord].romaji;

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

      {/* Japanese word */}
      <p className="text-4xl font-semibold text-center my-4 p-4 w-64 mx-auto h-20">
        {currentWord}
      </p>

      {/* English translation */}
      <p className="text-xl text-center text-gray-300 italic mb-2">
        {hiraganaWords[currentWord].english}
      </p>

      {/* Reveal Romanji */}
      {revealStatus && (
        <p className="text-2xl text-center text-yellow-300 mb-4">
          {hiraganaWords[currentWord].romaji}
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

export default HiraganaWords;