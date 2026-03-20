import { Plus } from 'lucide-react';
import CardItem from './CardItem';
import { useFlashcard } from '../contexts/FlashcardContext';

/**
 * CardList component - Displays list of cards for a specific deck
 * @param {Object} props - Component props
 * @param {string} props.deckId - Deck ID
 * @param {Function} props.onCreateCard - Function to open create card form
 * @param {Function} props.onEditCard - Function to handle card edit
 */
const CardList = ({ deckId, onCreateCard, onEditCard }) => {
  const { getCardsByDeck } = useFlashcard();
  const cards = getCardsByDeck(deckId);

  return (
    <div>
      {/* Header with Create Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Cards
          </h2>
          <p className="text-gray-600 mt-1">
            {cards.length === 0 
              ? 'Add your first card to this deck'
              : `${cards.length} card${cards.length === 1 ? '' : 's'} in this deck`
            }
          </p>
        </div>
        
        <button
          onClick={onCreateCard}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Card
        </button>
      </div>

      {/* Card Grid */}
      {cards.length === 0 ? (
        // Empty state
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 border-2 border-dashed border-gray-300">
            <div className="mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No cards yet
            </h3>
            <p className="text-gray-600 mb-4">
              Add your first flashcard to start studying
            </p>
            <button
              onClick={onCreateCard}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Your First Card
            </button>
          </div>
        </div>
      ) : (
        // Card grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <CardItem
              key={card.id}
              card={card}
              onEdit={onEditCard}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
