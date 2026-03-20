import { useState } from 'react';
import { Trash2, Edit, Eye, EyeOff } from 'lucide-react';
import { useFlashcard } from '../contexts/FlashcardContext';

/**
 * CardItem component - Individual flashcard with flip functionality
 * @param {Object} props - Component props
 * @param {Object} props.card - Card object
 * @param {Function} props.onEdit - Function to handle card edit
 * @param {Function} props.onDelete - Function to handle card delete
 */
const CardItem = ({ card, onEdit, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { deleteCard } = useFlashcard();

  /**
   * Handle card deletion with confirmation
   */
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id);
      if (onDelete) {
        onDelete(card.id);
      }
    }
  };

  /**
   * Handle card edit
   */
  const handleEdit = () => {
    if (onEdit) {
      onEdit(card);
    }
  };

  /**
   * Handle card flip
   */
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Card Content */}
      <div 
        className="relative h-48 cursor-pointer"
        onClick={handleFlip}
      >
        {/* Front of card (Question) */}
        <div 
          className={`absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-all duration-300 ${
            isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100 rotate-y-0'
          }`}
        >
          <div className="mb-4">
            <Eye className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Question
          </h3>
          <p className="text-gray-600 line-clamp-3">
            {card.question}
          </p>
          <p className="text-xs text-gray-400 mt-4">
            Click to reveal answer
          </p>
        </div>

        {/* Back of card (Answer) */}
        <div 
          className={`absolute inset-0 p-6 flex flex-col justify-center items-center text-center bg-blue-50 transition-all duration-300 ${
            isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 -rotate-y-180'
          }`}
        >
          <div className="mb-4">
            <EyeOff className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-medium text-blue-800 mb-2">
            Answer
          </h3>
          <p className="text-blue-700 line-clamp-3">
            {card.answer}
          </p>
          <p className="text-xs text-blue-400 mt-4">
            Click to see question
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Created {formatDate(card.createdAt)}
          </span>
          
          <div className="flex items-center gap-2">
            {/* Edit Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Edit card"
            >
              <Edit className="w-4 h-4" />
            </button>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete card"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Flip styles */}
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .-rotate-y-180 {
          transform: rotateY(-180deg);
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CardItem;
