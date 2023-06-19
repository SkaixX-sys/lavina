import React, { useState, useEffect } from "react";
import { getReviews } from "./../http/reviewAPI";
import ReviewFormModal from "./../components/modal/CreateReview";
import { Card, Container } from "react-bootstrap";

function Reviews() {
  const [reviewList, setReviewList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await getReviews();
      setReviewList(data);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Container>
      <h2 className="text-center p-4">Отзывы</h2>

      {reviewList.map((review) => (
        <Card key={review.id} className="mb-3">
          <Card.Body>
            <Card.Text>Текст: {review.text}</Card.Text>
            <Card.Text>Имя: {review.name}</Card.Text>
            <Card.Text>Фамилия: {review.surname}</Card.Text>
            <Card.Text>Отчество: {review.patronymic}</Card.Text>
            <Card.Text>Статус: {review.status}</Card.Text>
            <Card.Text>Рейтинг: {review.rating}</Card.Text>
          </Card.Body>
        </Card>
      ))}

      <ReviewFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddReview={fetchReviews}
      />
    </Container>
  );
}

export default Reviews;