import React, { useState, useEffect, useRef } from "react";

function TypewriterEffect() {
  const [generatedText, setGeneratedText] = useState(""); // The text being generated
  const [isGenerating, setIsGenerating] = useState(false); // Track if the text generation is in progress
  const [reset, setReset] = useState(false); // Reset flag
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // To keep track of which word is being typed
  const text = "This is a typewriter effect demonstration in React."; // Sample text
  const words = text.split(" "); // Split the sample text into words
  const timerRef = useRef(null); // Ref to hold the timeout ID

  // Start the typewriter effect
  const startGenerating = () => {
    if (isGenerating) return; // Prevent generating again if it's already running
    setIsGenerating(true);
    setCurrentWordIndex(0);
    setGeneratedText(""); // Clear generated text on start
    setReset(false); // Reset the reset flag

    // Recursive function to generate the text word by word
    const generateWord = () => {
      if (currentWordIndex < words.length) {
        setGeneratedText((prev) => prev + " " + words[currentWordIndex]); // Add the next word to the text
        setCurrentWordIndex((prev) => prev + 1); // Move to the next word
        timerRef.current = setTimeout(generateWord, 10); // Delay next word generation by 10ms
      } else {
        setIsGenerating(false); // Stop generating when all words are typed
      }
    };

    // Start the first word
    generateWord();
  };

  // Reset the text and stop the current generation
  const resetGeneration = () => {
    clearTimeout(timerRef.current); // Clear any ongoing timeouts
    setGeneratedText(""); // Clear generated text
    setIsGenerating(false); // Stop any ongoing generation
    setReset(true); // Set the reset flag
  };

  // Clean up the timeout when the component unmounts or on reset
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current); // Cleanup timeout on unmount or reset
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ marginBottom: "20px", fontSize: "24px", fontFamily: "monospace" }}>
        {generatedText}
      </div>

      <button
        onClick={startGenerating}
        disabled={isGenerating || reset} // Disable the button if already generating or reset
        style={{ padding: "10px 20px", marginRight: "10px" }}
      >
        Start Generating
      </button>

      <button
        onClick={resetGeneration}
        style={{ padding: "10px 20px" }}
      >
        Reset
      </button>
    </div>
  );
}

export default TypewriterEffect;
