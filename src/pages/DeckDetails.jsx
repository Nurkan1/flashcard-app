import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, BookOpen, Play } from 'lucide-react';
import { useDeck } from '../context/DeckContext';

/**
 * Deck Details page component - Manages cards inside a specific deck
 */
const DeckDetails = () => {
  const { id } = useParams();
  const { decks, addCard, deleteCard } = useDeck();
  const [newCard, setNewCard] = useState({
    question: '',
    answer: ''
  });

  // Find the deck by ID
  const deck = decks.find(d => d.id === id);

  /**
   * Handle input changes for new card form
   * @param {Object} e - Event object
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission to create new card
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newCard.question.trim()) {
      alert('Please enter a question');
      return;
    }
    
    if (!newCard.answer.trim()) {
      alert('Please enter an answer');
      return;
    }

    // Add the card
    addCard(deck.id, newCard.question, newCard.answer);
    
    // Clear form
    setNewCard({
      question: '',
      answer: ''
    });
  };

  /**
   * Handle card deletion with confirmation
   * @param {string} cardId - Card ID to delete
   */
  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
      deleteCard(deck.id, cardId);
    }
  };

  // If deck not found
  if (!deck) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Deck Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The deck you're looking for doesn't exist or has been deleted.
              </p>
              <Link
                to="/"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Decks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Decks
          </Link>
        </div>

        {/* Deck Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {deck.title}
              </h1>
              {deck.description && (
                <p className="text-gray-600 text-lg mb-4">
                  {deck.description}
                </p>
              )}
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{deck.cards.length} card{deck.cards.length === 1 ? '' : 's'}</span>
                </div>
              </div>
            </div>
            
            {/* Study Button */}
            {deck.cards.length > 0 && (
              <Link
                to={`/study/${deck.id}`}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 font-medium"
              >
                <Play className="w-5 h-5" />
                Study This Deck
              </Link>
            )}
          </div>
        </div>

        {/* Add New Card Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-6 h-6 text-blue-500" />
            Add New Card
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Question Input */}
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <textarea
                  id="question"
                  name="question"
                  value={newCard.question}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="What is the capital of France?"
                  required
                />
              </div>

              {/* Answer Input */}
              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  id="answer"
                  name="answer"
                  value={newCard.answer}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Paris"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Card
            </button>
          </form>
        </div>

        {/* Cards in this Deck Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            Cards in this Deck
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({deck.cards.length} card{deck.cards.length === 1 ? '' : 's'})
            </span>
          </h2>

          {deck.cards.length === 0 ? (
            // Empty State - Enhanced
            <div className="text-center py-16 animate-fade-in">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-12 border-2 border-dashed border-green-200 max-w-lg mx-auto hover-lift">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Add Your First Card
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Start building your study deck by adding flashcards with questions and answers
                  </p>
                </div>
                
                {/* Card Preview */}
                <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-left">
                      <div className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                        Question
                      </div>
                      <p className="text-gray-400 mb-4">Your question will appear here...</p>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="text-sm font-semibold text-green-600 mb-2 uppercase tracking-wide">
                          Answer
                        </div>
                        <p className="text-gray-400">Your answer will appear here...</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => document.getElementById('question').focus()}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-3 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 touch-target mx-auto"
                >
                  <Plus className="w-6 h-6" />
                  Add Your First Card
                </button>
              </div>
            </div>
          ) : (
            // Cards Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deck.cards.map(card => (
                <div
                  key={card.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden hover-lift"
                >
                  {/* Card Content */}
                  <div className="p-6">
                    {/* Question Section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                        Question
                      </h4>
                      <p className="text-gray-800 font-medium line-clamp-3">
                        {card.question}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Answer Section */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-green-600 mb-2 uppercase tracking-wide">
                        Answer
                      </h4>
                      <p className="text-gray-700 line-clamp-3">
                        {card.answer}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Delete card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Study Button (Bottom - for mobile) */}
        {deck.cards.length > 0 && (
          <div className="mt-8 text-center md:hidden">
            <Link
              to={`/study/${deck.id}`}
              className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 font-medium text-lg"
            >
              <Play className="w-6 h-6" />
              Study This Deck
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckDetails;
