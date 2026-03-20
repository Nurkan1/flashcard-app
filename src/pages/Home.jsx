import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, BookOpen, FolderOpen } from 'lucide-react';
import { useDeck } from '../context/DeckContext';

/**
 * Home page component - Main dashboard for managing flashcard decks
 */
const Home = () => {
  const { decks, addDeck, deleteDeck } = useDeck();
  const [newDeck, setNewDeck] = useState({
    title: '',
    description: ''
  });

  /**
   * Handle input changes for new deck form
   * @param {Object} e - Event object
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeck(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission to create new deck
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newDeck.title.trim()) {
      alert('Please enter a deck title');
      return;
    }

    // Add the deck
    addDeck(newDeck.title, newDeck.description);
    
    // Clear form
    setNewDeck({
      title: '',
      description: ''
    });
  };

  /**
   * Handle deck deletion with confirmation
   * @param {string} deckId - Deck ID to delete
   * @param {string} deckTitle - Deck title for confirmation message
   */
  const handleDeleteDeck = (deckId, deckTitle) => {
    if (window.confirm(`Are you sure you want to delete "${deckTitle}"? This action cannot be undone.`)) {
      deleteDeck(deckId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Flashcard Study App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create and manage flashcard decks to improve your learning experience
          </p>
        </div>

        {/* Create New Deck Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Plus className="w-6 h-6 text-blue-500" />
            Create New Deck
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title Input */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newDeck.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Spanish Vocabulary"
                  required
                />
              </div>

              {/* Description Input */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newDeck.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the deck"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Deck
            </button>
          </form>
        </div>

        {/* My Decks Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-blue-500" />
            My Decks
            {decks.length > 0 && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({decks.length} deck{decks.length === 1 ? '' : 's'})
              </span>
            )}
          </h2>

          {decks.length === 0 ? (
            // Empty State - Enhanced
            <div className="text-center py-16 animate-fade-in">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-12 border-2 border-dashed border-blue-200 max-w-lg mx-auto hover-lift">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <FolderOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Start Your Learning Journey
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Create your first flashcard deck and begin organizing your study materials effectively
                  </p>
                </div>
                
                {/* Quick Start Guide */}
                <div className="bg-white rounded-xl p-6 mb-8 text-left">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">1</span>
                    Quick Start Guide
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Create a deck with a title and description</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Add flashcards with questions and answers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Study using our interactive flip cards</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center gap-3 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 touch-target"
                >
                  <Plus className="w-6 h-6" />
                  Create Your First Deck
                </button>
              </div>
            </div>
          ) : (
            // Decks Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map(deck => (
                <div
                  key={deck.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden hover-lift"
                >
                  {/* Deck Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                          {deck.title}
                        </h3>
                        {deck.description && (
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {deck.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{deck.cards.length} cards</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      {/* Manage/Open Button */}
                      <Link
                        to={`/deck/${deck.id}`}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <FolderOpen className="w-4 h-4" />
                        Manage
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteDeck(deck.id, deck.title)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Delete ${deck.title}`}
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
      </div>
    </div>
  );
};

export default Home;
