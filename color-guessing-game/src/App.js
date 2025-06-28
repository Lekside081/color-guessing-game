import React, { useState, useEffect } from 'react';

const COLORS = [
  'red', 'green', 'blue', 'yellow', 'orange',
  'purple', 'pink', 'brown', 'teal', 'gray',
  'cyan', 'lime', 'indigo', 'violet', 'magenta',
  'maroon', 'olive', 'navy', 'turquoise', 'gold'
];

function App() {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showGame, setShowGame] = useState(false); // 👈 welcome screen toggle

  // 🔊 Load audio
  const correctSound = new Audio('/sound/correct-83487.mp3');
  const wrongSound = new Audio('/sound/wrong.mp3');
  const endSound = new Audio('/sound/congratulation.mp3');
  const welcomeSound = new Audio('/sound/welcomesound.mp3'); // 👈 your welcome sound file

  const startNewGame = () => {
    const shuffled = [...COLORS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);
    const randomColor = selected[Math.floor(Math.random() * selected.length)];
    setOptions(selected);
    setTargetColor(randomColor);
    setGameStatus('');
    setScore(0);
    setGameOver(false);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      correctSound.play();
      const newScore = score + 1;
      setScore(newScore);

      if (newScore >= 20) {
        endSound.play();
        setGameStatus("🎉 Awesome! You scored 20! You're a Color Master! 🏆");
        setGameOver(true);
      } else {
        setGameStatus('Correct!');
        const shuffled = [...COLORS].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 20);
        const randomColor = selected[Math.floor(Math.random() * selected.length)];
        setOptions(selected);
        setTargetColor(randomColor);
      }
    } else {
      wrongSound.play();
      setGameStatus('Wrong, try again!');
      setScore(0);
      const shuffled = [...COLORS].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 20);
      const randomColor = selected[Math.floor(Math.random() * selected.length)];
      setOptions(selected);
      setTargetColor(randomColor);
    }
  };

  // Show welcome message at start
  useEffect(() => {
    // Optional: Automatically play welcome sound when component mounts
    // welcomeSound.play(); // Uncomment if you want auto-play (browser may block)
  }, []);

  const handleStartGame = () => {
    welcomeSound.play(); // 🔊 Play welcome sound
    setTimeout(() => {
      setShowGame(true); // 🎮 Show the game after a short delay
      startNewGame();
    }, 2500); // ⏱ 2.5 seconds delay
  };

  // 🟦 Welcome Screen
  if (!showGame) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-center animate-pulse">
          🎉 Welcome to Don-Lekside Show Game 🎮
        </h1>
        <p className="text-lg sm:text-xl mb-6 text-center">Test your color guessing skills!</p>
        <button
          onClick={handleStartGame}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded text-lg font-semibold transition"
        >
          Start Game
        </button>
      </div>
    );
  }

  // 🟩 Actual Game
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className='text-3xl sm:text-5xl font-bold mb-4 text-center text-green-500'>
        WELCOME TO DON-LEKSIDE SHOW GAME
      </h1>
      <h2 className="text-3xl font-bold mb-4 text-center">🎨 Color Guessing Game 🎨</h2>

      <div className="w-32 h-32 rounded shadow-lg mb-4 border-4 border-gray-700"
        style={{ backgroundColor: targetColor }}>
      </div>

      <p className="mb-2 text-lg font-medium text-gray-800">Guess the correct color!</p>

      <p className={`text-xl font-semibold mb-4 ${gameStatus.includes('Wrong') ? 'text-red-600' : 'text-green-600'}`}>
        {gameStatus}
      </p>

      <div className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-6">
        {options.map((color, index) => (
          <button
            key={index}
            className="w-16 h-16 rounded shadow-lg border-2 border-gray-300 hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            disabled={gameOver}
          ></button>
        ))}
      </div>

      <p className="text-lg font-bold mb-6">Score: {score}</p>

      <div className="flex gap-4">
        <button
          onClick={startNewGame}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          New Game
        </button>
        <button
          onClick={() => setScore(0)}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
        >
          Reset Score
        </button>
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-10 animate-pulse">🎉 Congratulation! You've reached the final stage.</h1>
          <h2>🎉 Awesome! You scored 20! You're a Color Master! 🏆</h2>
          <p className="text-2xl mb-6">Click below to play again.</p>
          <button
            onClick={startNewGame}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
