import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { ROOM_ROUTER } from "../utils/consts";
import { deleteRoom, getRooms } from "../http/roomsAPI";
import AddPutRoomModal from "../components/modal/AddPutRoomModal";
import MainSlider from "../components/MainSlider";
import { getHotel } from "../http/hotelsAPI";

const Rooms = observer(() => {
  const { user } = useContext(Context) ?? {};
  const isAuth = user?.isAuth ?? false;
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [roomId, setRoomId] = useState();
  const [hotelRooms, setHotelRooms] = useState([]);
  const [hotelDetails, setHotelDetails] = useState([]);

  const { type } = useParams();
  const editRoom = (id) => {
    setRoomId(id);
    setEdit(true);
    setShowModal(true);
  };
  const fetchHotelInfo = async () => {
    try {
      const hotelInfo = await getHotel(type);
      setHotelDetails(hotelInfo);
    } catch (e) {
      throw e;
    }
  };

  const fetchRooms = async () => {
    try {
      const fetchHotelRooms = await getRooms(type);
      setHotelRooms(fetchHotelRooms);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchHotelInfo();
  }, []);

  const deleteRoomF = async (id) => {
    try {
      await deleteRoom(id);
      fetchRooms();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="services">
      <h2 className="text-center m-4">{hotelDetails.title}</h2>
      <Container>
        <Row>
          <Col>
            <Image src={ import.meta.env.VITE_APP_API_URL + "/" + hotelDetails.image} alt={hotelDetails.title} className="w-100"/>
            <p className="p-4 w-50">{hotelDetails.description}</p>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="d-flex flex-wrap justify-content-start align-items-start ">
          {hotelRooms.map((room) => (
            <Card
              key={room.id}
              className="p-1 pb-4 m-3"
              style={{ width: "400px" }}
            >
              <Card.Img
                variant="top"
                src={import.meta.env.VITE_APP_API_URL + "/" + room.image}
                width={400}
                height={300}
                className="p-3"
              />
              <Card.Body className="p-1">
                <Card.Title className="ms-3 pt-2">{room.title} </Card.Title>
                <Card.Text className="ms-3 pt-2 pb-2">
                  {room.description}
                </Card.Text>
                <NavLink
                  to={ROOM_ROUTER + "/" + room.id}
                  className="ms-3 color-black"
                  style={{ fontWeight: "700" }}
                >
                  <img
                    className="me-3"
                    src="../../../src/assets/icons/arrowToButton.png"
                    alt="arrow"
                  />
                  Узнать подробнее
                </NavLink>
                {isAuth && (
                  <NavLink
                    className="ms-4 p-2 justify-content-center align-content-center"
                    onClick={() => editRoom(room.id)}
                  >
                    <Image
                      src="./../../../src/assets/editIcon/edit.png"
                      alt="Edit"
                      width={30}
                      height={30}
                    />
                  </NavLink>
                )}
                {isAuth && (
                  <NavLink
                    className="ms-3 p-2 justify-content-center align-content-center"
                    onClick={() => deleteRoomF(room.id)}
                  >
                    <Image
                      src="./../../../src/assets/deleteIcon/delete.png"
                      alt="Delete"
                      width={40}
                      height={40}
                    />
                  </NavLink>
                )}
              </Card.Body>
            </Card>
          ))}
          {isAuth && (
            <Card
              key="add"
              className="p-1 pb-4 m-3 border-none"
              style={{ width: "400px", cursor: "pointer" }}
            >
              <Card.Body
                className="p-1 text-center"
                onClick={() => {
                  setEdit(false);
                  setShowModal(true);
                }}
              >
                <Card.Img
                  src="./../../../src/assets/icons8-plus-240.png"
                  style={{ width: "300px" }}
                />
                <Card.Title className="ms-3 pt-2">
                  Добавить новую комнату
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>
      <AddPutRoomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddOrPutRoom={fetchRooms}
        edit={edit}
        roomId={roomId}
        typeHotel={type}
      />
    </div>
  );
});

export default Rooms;
