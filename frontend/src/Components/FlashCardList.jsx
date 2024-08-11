import React, { useState,useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import FlashCard from "./flashCard";

export default function FlashcardList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/cards")
      .then((result) => setFlashcards(result.data))
      .catch((error) => console.error("Error fetching flashcards:", error));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <FlashCard flashcard={flashcards[currentIndex]} />
        <ButtonGroup className="mt-3">
          <Button onClick={handlePrevious}>Previous</Button>
          <Button onClick={handleNext}>Next</Button>
        </ButtonGroup>
      </div>
    </>
  );
}
