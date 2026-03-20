import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const FlashcardContext = createContext();

/**
 * Custom hook to use the flashcard context
 * @returns {Object} - Flashcard context value
 */
export const useFlashcard = () => {
  const context = useContext(FlashcardContext);
  if (!context) {
    throw new Error('useFlashcard must be used within a FlashcardProvider');
  }
  return context;
};

/**
 * Flashcard Provider component - Manages global state for decks and cards
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const FlashcardProvider = ({ children }) => {
  // State for decks
  const [decks, setDecks] = useState([]);
  
  // State for cards
  const [cards, setCards] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDecks = localStorage.getItem('flashcard-decks');
    const savedCards = localStorage.getItem('flashcard-cards');
    
    if (savedDecks) {
      try {
        setDecks(JSON.parse(savedDecks));
      } catch (error) {
        console.error('Error loading decks from localStorage:', error);
      }
    }
    
    if (savedCards) {
      try {
        setCards(JSON.parse(savedCards));
      } catch (error) {
        console.error('Error loading cards from localStorage:', error);
      }
    }
  }, []);

  // Save decks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashcard-decks', JSON.stringify(decks));
  }, [decks]);

  // Save cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashcard-cards', JSON.stringify(cards));
  }, [cards]);

  /**
   * Create a new deck
   * @param {Object} deckData - Deck data
   * @param {string} deckData.name - Deck name
   * @param {string} deckData.description - Deck description
   * @returns {Object} - Created deck
   */
  const createDeck = (deckData) => {
    const newDeck = {
      id: Date.now().toString(),
      name: deckData.name,
      description: deckData.description || '',
      createdAt: new Date().toISOString(),
      cardCount: 0
    };
    
    setDecks(prev => [...prev, newDeck]);
    return newDeck;
  };

  /**
   * Update an existing deck
   * @param {string} deckId - Deck ID
   * @param {Object} updates - Deck updates
   * @returns {Object|null} - Updated deck or null if not found
   */
  const updateDeck = (deckId, updates) => {
    let updatedDeck = null;
    
    setDecks(prev => prev.map(deck => {
      if (deck.id === deckId) {
        updatedDeck = { ...deck, ...updates };
        return updatedDeck;
      }
      return deck;
    }));
    
    return updatedDeck;
  };

  /**
   * Delete a deck and its associated cards
   * @param {string} deckId - Deck ID
   * @returns {boolean} - True if deck was deleted
   */
  const deleteDeck = (deckId) => {
    // Delete the deck
    setDecks(prev => prev.filter(deck => deck.id !== deckId));
    
    // Delete all cards in the deck
    setCards(prev => prev.filter(card => card.deckId !== deckId));
    
    return true;
  };

  /**
   * Create a new card
   * @param {Object} cardData - Card data
   * @param {string} cardData.deckId - Deck ID
   * @param {string} cardData.question - Card question
   * @param {string} cardData.answer - Card answer
   * @returns {Object} - Created card
   */
  const createCard = (cardData) => {
    const newCard = {
      id: Date.now().toString(),
      deckId: cardData.deckId,
      question: cardData.question,
      answer: cardData.answer,
      createdAt: new Date().toISOString()
    };
    
    setCards(prev => [...prev, newCard]);
    
    // Update deck card count
    updateDeck(cardData.deckId, {
      cardCount: getCardsByDeck(cardData.deckId).length + 1
    });
    
    return newCard;
  };

  /**
   * Update an existing card
   * @param {string} cardId - Card ID
   * @param {Object} updates - Card updates
   * @returns {Object|null} - Updated card or null if not found
   */
  const updateCard = (cardId, updates) => {
    let updatedCard = null;
    
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        updatedCard = { ...card, ...updates };
        return updatedCard;
      }
      return card;
    }));
    
    return updatedCard;
  };

  /**
   * Delete a card
   * @param {string} cardId - Card ID
   * @returns {boolean} - True if card was deleted
   */
  const deleteCard = (cardId) => {
    let deletedCard = null;
    
    setCards(prev => {
      const cardToDelete = prev.find(card => card.id === cardId);
      if (cardToDelete) {
        deletedCard = cardToDelete;
      }
      return prev.filter(card => card.id !== cardId);
    });
    
    // Update deck card count if card was deleted
    if (deletedCard) {
      updateDeck(deletedCard.deckId, {
        cardCount: getCardsByDeck(deletedCard.deckId).length - 1
      });
    }
    
    return !!deletedCard;
  };

  /**
   * Get cards for a specific deck
   * @param {string} deckId - Deck ID
   * @returns {Array} - Array of cards
   */
  const getCardsByDeck = (deckId) => {
    return cards.filter(card => card.deckId === deckId);
  };

  /**
   * Get a deck by ID
   * @param {string} deckId - Deck ID
   * @returns {Object|null} - Deck or null if not found
   */
  const getDeckById = (deckId) => {
    return decks.find(deck => deck.id === deckId) || null;
  };

  // Context value
  const value = {
    // State
    decks,
    cards,
    
    // Deck operations
    createDeck,
    updateDeck,
    deleteDeck,
    getDeckById,
    
    // Card operations
    createCard,
    updateCard,
    deleteCard,
    getCardsByDeck
  };

  return (
    <FlashcardContext.Provider value={value}>
      {children}
    </FlashcardContext.Provider>
  );
};

export default FlashcardContext;
