import React, { useEffect, useState } from "react";
import { Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";

export default function DashBoardCard({ flashcards, setFlashcards }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/cards")
      .then((result) => setData(result.data));
  }, []);

  const handleAdd = async () => {
    const newFlashcard = { question, answer };

    if (editIndex === null) {
      const response = await axios.post(
        "http://localhost:3001/users",
        newFlashcard
      );
      setFlashcards([...flashcards, { question, answer }]);
    } else {
      const updatedFlashcards = flashcards.map((fc, index) =>
        index === editIndex ? { question, answer } : fc
      );
      setFlashcards(updatedFlashcards);
      setEditIndex(null);
    }
    setQuestion("");
    setAnswer("");
  };

  const handleEdit = (index) => {
    setQuestion(flashcards[index].question);
    setAnswer(flashcards[index].answer);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
  };

  return (
    <>
      <div className="p-3">
        <h2>Admin Dashboard</h2>
        <Form className="mb-3">
          <Form.Group controlId="formQuestion">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAnswer" className="mt-2">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" onClick={handleAdd} className="mt-3">
            {editIndex !== null ? "Update Flashcard" : "Add Flashcard"}
          </Button>
        </Form>

        <ListGroup>
          {data &&
            data.map((fc, index) => (
              <ListGroupItem
                key={index}
                className="d-flex justify-content-between"
              >
                <div>
                  <strong>{fc.question}</strong> - {fc.answer}
                </div>
                <div>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </div>
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
    </>
  );
}
