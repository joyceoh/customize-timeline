import React, { useState } from 'react';

// Import components
import NavBar from './navigation/navBar.jsx';
import Arcus from './components/arcus.jsx';
import Comments from './components/comments.jsx';
import ArcusEdit from './components/arcusEdit.jsx';

/**
 * Main Application Component
 * 
 * Arcus - A healthcare journey timeline application that helps patients
 * visualize their health events and connect with others.
 */
const App = () => {
  // State to toggle edit mode
  const [showEditor, setShowEditor] = useState(false);
  
  const toggleEditor = () => {
    setShowEditor(!showEditor);
  };
  
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <NavBar />
      
      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Timeline Component */}
          <Arcus />
          {/* Toggle Edit Mode Button */}
          <div className="edit-toggle">
            <button 
              className="secondary" 
              onClick={toggleEditor}
            >
              {showEditor ? "Hide Timeline Editor" : "Customize Timeline"}
            </button>
          </div>
          
          {/* Timeline Editor (conditionally rendered) */}
          {showEditor && <ArcusEdit />}
          
          {/* Comments & Community Section */}
          <Comments />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <p>Arcus Health Timeline &copy; 2025 • Your Personal Health Journey Companion</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
