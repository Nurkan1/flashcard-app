import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DeckProvider } from './context/DeckContext';
import Home from './pages/Home';
import DeckDetails from './pages/DeckDetails';
import StudyMode from './pages/StudyMode';

/**
 * Main App component with navigation and routing setup
 */
function App() {
  const currentYear = new Date().getFullYear();

  return (
    <DeckProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Sticky Navigation Bar */}
          <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* App Title/Logo */}
                <Link 
                  to="/" 
                  className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-all duration-200 hover:scale-105 transform"
                >
                  📚 Flashcard App
                </Link>
                
                {/* Navigation Links */}
                <div className="flex space-x-6">
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105 transform font-medium"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/deck/:id" 
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105 transform font-medium"
                  >
                    Deck Details
                  </Link>
                  <Link 
                    to="/study/:id" 
                    className="text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105 transform font-medium"
                  >
                    Study Mode
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="flex-1 animate-fade-in">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/deck/:id" element={<DeckDetails />} />
              <Route path="/study/:id" element={<StudyMode />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-gray-600">
                <p className="flex items-center justify-center gap-2">
                  <span>Built with</span>
                  <span className="text-blue-500 font-semibold">React</span>
                  <span>&</span>
                  <span className="text-cyan-500 font-semibold">Tailwind CSS</span>
                  <span>•</span>
                  <span>{currentYear}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Your personal flashcard study companion
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </DeckProvider>
  );
}

export default App;
