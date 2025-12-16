import React from "react";
import "./HelpModal.css";

const HelpModal = ({ onClose, show }) => {
  return (
    <div className={`help-modal-overlay ${show ? "slide-down" : "slide-up"}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>How to use</h2>
        <p>This app supports keyboard shortcuts to help you work faster.</p>

        <ul className="shortcuts">
          <li><kbd>S</kbd> / <kbd>ENTER</kbd> - Starts timer</li>
          <li><kbd>SPACE</kbd> / <kbd>P</kbd> - Pauses / resumes timer</li>
          <li><kbd>R</kbd> - Resets timer</li>
          <li><kbd>↑</kbd> / <kbd>↓</kbd> - Adjusts time</li>
          <li><kbd>?</kbd>  - Open / closes this help</li>
          <li><kbd>Esc</kbd> - Close help</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpModal;
