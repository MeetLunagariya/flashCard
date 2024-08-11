import { Container } from "react-bootstrap";
import FlashcardList from "./Components/FlashCardList";
import React, { useState } from "react";
import DashBoardCard from "./Components/DashBoardCard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [flashcards, setFlashcards] = useState([
    {
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces",
    },
    { question: "What is JSX?", answer: "A syntax extension for JavaScript" },
  ]);
  return (
    <>
      {/* <FlashCard /> */}

      <Container className="p-4">
        <h1 className="text-center mb-4">Flashcard Learning Tool</h1>
        <FlashcardList flashcards={flashcards} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/DashBoardCard"
              element={
                <DashBoardCard
                  flashcards={flashcards}
                  setFlashcards={setFlashcards}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
