import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const DeckContext = createContext();

/**
 * Custom hook to use the deck context
 * @returns {Object} - Deck context value
 */
export const useDeck = () => {
  const context = useContext(DeckContext);
  if (!context) {
    throw new Error('useDeck must be used within a DeckProvider');
  }
  return context;
};

/**
 * Deck Provider component - Manages global state for decks and cards
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const DeckProvider = ({ children }) => {
  // State for decks array
  const [decks, setDecks] = useState([]);

  // Load decks from localStorage on component mount
  useEffect(() => {
    const savedDecks = localStorage.getItem('flashcard_decks');
    
    if (savedDecks) {
      try {
        const parsedDecks = JSON.parse(savedDecks);
        // Validate that it's an array
        if (Array.isArray(parsedDecks)) {
          setDecks(parsedDecks);
        } else {
          console.warn('Invalid data format in localStorage, initializing with empty array');
          setDecks([]);
        }
      } catch (error) {
        console.error('Error loading decks from localStorage:', error);
        setDecks([]);
      }
    }
  }, []);

  // Save decks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('flashcard_decks', JSON.stringify(decks));
    } catch (error) {
      console.error('Error saving decks to localStorage:', error);
    }
  }, [decks]);

  /**
   * Add a new deck
   * @param {string} title - Deck title
   * @param {string} description - Deck description
   * @returns {Object} - Created deck
   */
  const addDeck = (title, description) => {
    const newDeck = {
      id: Date.now().toString(), // Using Date.now().toString() for unique ID
      title: title.trim(),
      description: description.trim(),
      cards: []
    };

    setDecks(prevDecks => [...prevDecks, newDeck]);
    return newDeck;
  };

  /**
   * Delete a deck by ID
   * @param {string} deckId - Deck ID to delete
   * @returns {boolean} - True if deck was deleted
   */
  const deleteDeck = (deckId) => {
    setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId));
    return true;
  };

  /**
   * Add a new card to a specific deck
   * @param {string} deckId - Deck ID to add card to
   * @param {string} question - Card question
   * @param {string} answer - Card answer
   * @returns {Object|null} - Created card or null if deck not found
   */
  const addCard = (deckId, question, answer) => {
    const newCard = {
      id: Date.now().toString(), // Using Date.now().toString() for unique ID
      question: question.trim(),
      answer: answer.trim()
    };

    let cardAdded = false;

    setDecks(prevDecks => 
      prevDecks.map(deck => {
        if (deck.id === deckId) {
          cardAdded = true;
          return {
            ...deck,
            cards: [...deck.cards, newCard]
          };
        }
        return deck;
      })
    );

    return cardAdded ? newCard : null;
  };

  /**
   * Delete a card from a specific deck
   * @param {string} deckId - Deck ID containing the card
   * @param {string} cardId - Card ID to delete
   * @returns {boolean} - True if card was deleted
   */
  const deleteCard = (deckId, cardId) => {
    let cardDeleted = false;

    setDecks(prevDecks => 
      prevDecks.map(deck => {
        if (deck.id === deckId) {
          const originalCardCount = deck.cards.length;
          const updatedDeck = {
            ...deck,
            cards: deck.cards.filter(card => card.id !== cardId)
          };
          cardDeleted = updatedDeck.cards.length < originalCardCount;
          return updatedDeck;
        }
        return deck;
      })
    );

    return cardDeleted;
  };

  /**
   * Get a specific deck by ID
   * @param {string} deckId - Deck ID
   * @returns {Object|null} - Deck object or null if not found
   */
  const getDeckById = (deckId) => {
    return decks.find(deck => deck.id === deckId) || null;
  };

  /**
   * Get all decks
   * @returns {Array} - Array of all decks
   */
  const getAllDecks = () => {
    return decks;
  };

  // Context value
  const value = {
    // State
    decks,
    
    // Deck operations
    addDeck,
    deleteDeck,
    getDeckById,
    getAllDecks,
    
    // Card operations
    addCard,
    deleteCard
  };

  return (
    <DeckContext.Provider value={value}>
      {children}
    </DeckContext.Provider>
  );
};

export default DeckContext;
