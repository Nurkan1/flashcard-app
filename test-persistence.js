// Test script to verify localStorage persistence
// Run this in browser console to test

// Test 1: Check if localStorage is working
console.log('=== Testing localStorage persistence ===');
console.log('localStorage available:', typeof localStorage !== 'undefined');

// Test 2: Save test data
const testData = [
  {
    id: 'test-deck-1',
    title: 'Test Deck',
    description: 'This is a test deck',
    cards: [
      {
        id: 'test-card-1',
        question: 'What is 2+2?',
        answer: '4'
      }
    ]
  }
];

localStorage.setItem('flashcard_decks', JSON.stringify(testData));
console.log('✓ Test data saved to localStorage');

// Test 3: Retrieve test data
const retrieved = JSON.parse(localStorage.getItem('flashcard_decks'));
console.log('✓ Data retrieved:', retrieved);
console.log('✓ Data integrity:', JSON.stringify(retrieved) === JSON.stringify(testData));

// Test 4: Clear test data (uncomment to clean up)
// localStorage.removeItem('flashcard_decks');
// console.log('✓ Test data cleared');

console.log('=== Persistence test complete ===');
