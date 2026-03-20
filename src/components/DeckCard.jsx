import { Link } from 'react-router-dom';
import { Trash2, Edit, BookOpen } from 'lucide-react';
import { useFlashcard } from '../contexts/FlashcardContext';

/**
 * DeckCard component - Individual deck card with actions
 * @param {Object} props - Component props
 * @param {Object} props.deck - Deck object
 * @param {Function} props.onEdit - Function to handle deck edit
 * @param {Function} props.onDelete - Function to handle deck delete
 */
const DeckCard = ({ deck, onEdit, onDelete }) => {
  const { deleteDeck } = useFlashcard();

  /**
   * Handle deck deletion with confirmation
   */
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${deck.name}"? This will also delete all cards in this deck.`)) {
      deleteDeck(deck.id);
      if (onDelete) {
        onDelete(deck.id);
      }
    }
  };

  /**
   * Handle deck edit
   */
  const handleEdit = () => {
    if (onEdit) {
      onEdit(deck);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Deck Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {deck.name}
            </h3>
            {deck.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {deck.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 ml-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {deck.cardCount || 0} cards
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>
            Created {formatDate(deck.createdAt)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Study Button */}
          <Link
            to={`/study/${deck.id}`}
            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            Study
          </Link>

          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label={`Edit ${deck.name}`}
          >
            <Edit className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            aria-label={`Delete ${deck.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer Link */}
      <div className="border-t border-gray-100">
        <Link
          to={`/deck/${deck.id}`}
          className="block w-full px-6 py-3 text-center text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default DeckCard;
