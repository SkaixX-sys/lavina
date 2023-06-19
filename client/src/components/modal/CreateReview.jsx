import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { createReview } from "../../http/reviewAPI";

function ReviewFormModal() {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [patronymic, setPatronymic] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await createReview({
        text: text,
        name: name,
        surname: surname,
        patronymic: patronymic,
        status: status,
        rating: rating,
      });
      alert("Отзыв отправлен на обработку");
    } catch (e) {
      alert(e)
    }

    setName("");
    setRating("");
    setSurname("");
    setPatronymic("");
    setText("");
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Добавить отзыв
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Форма для отзыва</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRating" className="mt-3">
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                required
                placeholder="Ваша оценка"
              />
            </Form.Group>

            <Form.Group controlId="formReview" className="mt-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={text}
                onChange={(event) => setText(event.target.value)}
                required
                placeholder="Ваш отзыв"
              />
            </Form.Group>

            <Form.Group controlId="formFirstName" className="mt-3">
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Ваше имя"
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Control
                type="text"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
                required
                placeholder="Ваша фамилия"
              />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Control
                type="text"
                value={patronymic}
                onChange={(event) => setPatronymic(event.target.value)}
                required
                placeholder="Ваше отчество"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Отправить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReviewFormModal;
