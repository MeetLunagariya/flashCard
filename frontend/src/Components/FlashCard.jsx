import React, { useState,useEffect } from "react";
import { Card } from "react-bootstrap";
export default function FlashCard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/cards")
      .then((result) => setData(result.data));
  }, []);
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  return (
    <>
    
      <Card
        className="mb-3"
        onClick={handleFlip}
        style={{
          cursor: "pointer",
          width: "18rem",
          height: "10rem",
          perspective: "1000px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transition: "transform 0.6s",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Side */}
          <Card.Body
            className="d-flex justify-content-center align-items-center text-center text-dark bg-light"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
            }}
          >
            {flashcard.question}
          </Card.Body>

          {/* Back Side */}
          <Card.Body
            className="d-flex justify-content-center align-items-center text-center text-white bg-dark"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {flashcard.answer}
          </Card.Body>
        </div>
      </Card>
    </>
  );
}
