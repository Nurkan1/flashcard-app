import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';
import { useDeck } from '../context/DeckContext';

/**
 * StudyMode page component - Flashcard study interface with flip animation
 */
const StudyMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { decks } = useDeck();
  
  // Find the deck by ID
  const deck = decks.find(d => d.id === id);

  // Study session state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // If deck not found or has no cards
  if (!deck || deck.cards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {deck ? 'No Cards Available' : 'Deck Not Found'}
              </h2>
              <p className="text-gray-600 mb-6">
                {deck 
                  ? 'This deck has no cards to study. Add some cards first!'
                  : 'The deck you\'re looking for doesn\'t exist.'
                }
              </p>
              <Link
                to={`/deck/${id}`}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Deck
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = deck.cards[currentCardIndex];
  const progress = `${currentCardIndex + 1} of ${deck.cards.length}`;

  /**
   * Handle card flip
   */
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  /**
   * Handle answer selection
   * @param {boolean} isCorrect - Whether the answer was correct
   */
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    // Move to next card or show results
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  /**
   * Restart study session
   */
  const handleRestart = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setShowResults(false);
    setCorrectCount(0);
  };

  /**
   * Calculate score percentage
   */
  const scorePercentage = Math.round((correctCount / deck.cards.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Study Mode
          </h1>
          <p className="text-gray-600">
            {deck.title}
          </p>
        </div>

        {!showResults ? (
          // Study Session
          <div>
            {/* Progress */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                <span className="text-sm font-medium text-gray-600">
                  Card
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {progress}
                </span>
              </div>
            </div>

            {/* Flashcard Container */}
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-md h-80">
                <div 
                  className="absolute inset-0 cursor-pointer"
                  onClick={handleFlip}
                  style={{ perspective: '1000px' }}
                >
                  {/* Card Front - Question */}
                  <div
                    className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center text-center transition-all duration-500 ${
                      isFlipped 
                        ? 'opacity-0 rotate-y-180' 
                        : 'opacity-100 rotate-y-0'
                    }`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">?</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Question
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {currentCard.question}
                    </p>
                    <p className="text-sm text-gray-400 mt-6">
                      Tap to reveal answer
                    </p>
                  </div>

                  {/* Card Back - Answer */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center text-center transition-all duration-500 ${
                      isFlipped 
                        ? 'opacity-100 rotate-y-0' 
                        : 'opacity-0 -rotate-y-180'
                    }`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">A</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Answer
                    </h3>
                    <p className="text-lg text-white leading-relaxed">
                      {currentCard.answer}
                    </p>
                    <p className="text-sm text-white text-opacity-80 mt-6">
                      Tap to see question
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Study Controls - Only show when flipped */}
            {isFlipped && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                {/* Incorrect Button */}
                <button
                  onClick={() => handleAnswer(false)}
                  className="w-full sm:w-auto bg-red-500 text-white px-8 py-4 rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 touch-target min-h-[44px]"
                >
                  <XCircle className="w-5 h-5" />
                  Incorrect
                </button>

                {/* Correct Button */}
                <button
                  onClick={() => handleAnswer(true)}
                  className="w-full sm:w-auto bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 touch-target min-h-[44px]"
                >
                  <CheckCircle className="w-5 h-5" />
                  Correct
                </button>
              </div>
            )}
          </div>
        ) : (
          // Results Screen
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
              {/* Results Icon */}
              <div className="mb-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
                  scorePercentage >= 70 
                    ? 'bg-green-100' 
                    : scorePercentage >= 40 
                    ? 'bg-yellow-100' 
                    : 'bg-red-100'
                }`}>
                  <span className={`text-3xl font-bold ${
                    scorePercentage >= 70 
                      ? 'text-green-600' 
                      : scorePercentage >= 40 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                  }`}>
                    {scorePercentage}%
                  </span>
                </div>
              </div>

              {/* Results Message */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Study Complete!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                You got <span className="font-bold text-blue-600">{correctCount}</span> out of{' '}
                <span className="font-bold text-blue-600">{deck.cards.length}</span> correct!
              </p>

              {/* Performance Message */}
              <div className="mb-8">
                <p className={`text-sm font-medium ${
                  scorePercentage >= 70 
                    ? 'text-green-600' 
                    : scorePercentage >= 40 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
                }`}>
                  {scorePercentage >= 70 
                    ? 'Great job! You mastered this deck!' 
                    : scorePercentage >= 40 
                    ? 'Good effort! Keep practicing to improve.' 
                    : 'Keep studying! You\'ll get better with practice.'
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleRestart}
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart Study
                </button>
                
                <Link
                  to={`/deck/${deck.id}`}
                  className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Home className="w-4 h-4" />
                  Back to Deck
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyMode;
