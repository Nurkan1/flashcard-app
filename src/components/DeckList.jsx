import { Plus } from 'lucide-react';
import DeckCard from './DeckCard';
import { useFlashcard } from '../contexts/FlashcardContext';

/**
 * DeckList component - Displays list of all decks
 * @param {Object} props - Component props
 * @param {Function} props.onCreateDeck - Function to open create deck form
 * @param {Function} props.onEditDeck - Function to handle deck edit
 */
const DeckList = ({ onCreateDeck, onEditDeck }) => {
  const { decks } = useFlashcard();

  return (
    <div>
      {/* Header with Create Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Your Decks
          </h2>
          <p className="text-gray-600 mt-1">
            {decks.length === 0 
              ? 'Create your first deck to get started'
              : `${decks.length} deck${decks.length === 1 ? '' : 's'} available`
            }
          </p>
        </div>
        
        <button
          onClick={onCreateDeck}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Deck
        </button>
      </div>

      {/* Deck Grid */}
      {decks.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No decks yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first flashcard deck to start studying
            </p>
            <button
              onClick={onCreateDeck}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Your First Deck
            </button>
          </div>
        </div>
      ) : (
        // Deck grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map(deck => (
            <DeckCard
              key={deck.id}
              deck={deck}
              onEdit={onEditDeck}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckList;
