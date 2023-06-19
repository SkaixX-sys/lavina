import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { createFeedback } from "../../http/feedbackAPI";

function FeedBackModal({ show, onHide }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const addFeedback = async () => {
    const data = {
      name: name,
      phone: phone,
      type: "type",
    };

    try {
      const feedback = await createFeedback(data);
      if (feedback) {
        alert("Feedback успешно добавлен");
      }
    } catch (e) {
      alert(e.response.data.message);
    } 
    setName("");
    setPhone("");
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="color-black">
        <Modal.Title id="contained-modal-title-vcenter" className="color-black">
          Укажите данные
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-2"
            placeholder="Введите ФИО"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-2"
            placeholder="Введите номер"
            value={phone}
            type="number"
            maxLength={11}
            max={11}
            onChange={(e) => {
              let value = e.target.value;
              if (value.length > 12) value = value.slice(0, 12);
              setPhone(value);
            }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button
          variant="outline-success"
          onClick={addFeedback}
          style={{ cursor: "pointer" }}
        >
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FeedBackModal;
