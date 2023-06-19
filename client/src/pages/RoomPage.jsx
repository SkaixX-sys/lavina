import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image, Badge, Button } from "react-bootstrap";
import { getRoom } from "../http/roomsAPI";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import AddPutRoomModal from "../components/modal/AddPutRoomModal";
import FeedBackModal from "../components/modal/FeedBackModal";

const RoomPage = observer(() => {
  const { user } = useContext(Context);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [feedBackModal, setFeedBackModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [info, setInfo] = useState("");

  const fetchInfoRoom = async () => {
    try {
      const room = await getRoom(id);
      setInfo(room);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchInfoRoom();
  }, []);
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Image
            src={import.meta.env.VITE_APP_API_URL + "/" + info.image}
            fluid
          />
        </Col>
        <Col>
          <h2>{info.title}</h2>
          <p>{info.description}</p>
          <p>
            Размер: {info.size} м<sup>2</sup>
          </p>
          <p>Количество мест: {info.seats}</p>
          <p>Тип отеля: {info.typeOfHotel}</p>
          <hr />
          <h4>Цены:</h4>
          <p>Будний день: {info.weekdayOldPrice} руб. в день</p>
          <p>Выходной день: {info.weekendOldPrice} руб. в день</p>
          {user.isAuth && (
            <div
              onClick={() => {
                setShowModal(true);
                setEdit(false);
              }}
            >
              <img
              className="mt-3 mb-3 me-3"
              src="../../../src/assets/icons/arrowToButton.png"
              alt="arrow"
            />
              Редактировать данные
            </div>
          )}
          <div
            onClick={() => {
              setFeedBackModal(true);
            }}
          >
            <img
              className="mt-3 mb-3 me-3"
              src="../../../src/assets/icons/arrowToButton.png"
              alt="arrow"
            />
            Оставить данные
          </div>
        </Col>
      </Row>
      <FeedBackModal
        show={feedBackModal}
        onHide={() => setFeedBackModal(false)}
      />
      <AddPutRoomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddOrPutRoom={fetchInfoRoom}
        edit={edit}
        roomId={info.id}
        typeHotel={info.typeOfHotel}
      />
    </Container>
  );
});

export default RoomPage;
