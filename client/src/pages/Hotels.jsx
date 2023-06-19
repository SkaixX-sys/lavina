import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { ROOMS_ROUTER } from "../utils/consts";
import { Context } from "../main";
import AddPutHotelModal from "../components/modal/AddPutHotelModal";
import { deleteHotel, getHotels } from "../http/hotelsAPI";
import { observer } from "mobx-react-lite";

const Hotels = observer(() => {
  const { user } = useContext(Context) ?? {};
  const isAuth = user?.isAuth ?? false;
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [hotelId, setHotelId] = useState();
  const [serviceId, setServiceId] = useState();
  const [allHotels, setAllHotels] = useState([]);

  const handlEditHotel = (id) => {
    setHotelId(id);
    setEdit(true);
    setShowModal(true);
  };
  const handlAddHotel = () => {
    setEdit(false);
    setShowModal(true);
  };

  const fetchHotels = async () => {
    try {
      const hotels = await getHotels();
      setAllHotels(hotels);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handelDeleteHotel = async (id) => {
    try {
      await deleteHotel(id);
      fetchHotels();
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="services">
      <h2 className="text-center m-4">Отели</h2>
      <Container>
        <div className="d-flex flex-wrap justify-content-start align-items-start ">
          {allHotels.map((hotel) => (
            <Card
              key={hotel.id}
              className="p-1 pb-4 m-3 border-none"
              style={{ width: "400px" }}
            >
              <Card.Img
                variant="top"
                src={import.meta.env.VITE_APP_API_URL + "/" + hotel.image}
                width={400}
                height={300}
                className="p-3"
              />
              <Card.Body className="p-1">
                <Card.Title className="ms-3 pt-2">{hotel.title} </Card.Title>
                <Card.Text className="ms-3 pt-2 pb-2">
                  {hotel.description}
                </Card.Text>
                <NavLink
                  to={ROOMS_ROUTER + "/" + hotel.type}
                  className="ms-3 color-black"
                  style={{ fontWeight: "700" }}
                >
                  <img
                    className="me-3"
                    src="../src/assets/icons/arrowToButton.png"
                    alt="arrow"
                  />
                  Узнать подробнее
                </NavLink>
                {isAuth && (
                  <NavLink
                    className="ms-4 p-2 justify-content-center align-content-center"
                    onClick={() => handlEditHotel(hotel.id)}
                  >
                    <Image
                      src="../src/assets/editIcon/edit.png"
                      alt="Edit"
                      width={30}
                      height={30}
                    />
                  </NavLink>
                )}
                {isAuth && (
                  <NavLink
                    className="ms-3 p-2 justify-content-center align-content-center"
                    onClick={() => handelDeleteHotel(hotel.id)}
                  >
                    <Image
                      src="../src/assets/deleteIcon/delete.png"
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
                onClick={() => handlAddHotel()}
              >
                <Card.Img
                  src="../src/assets/icons8-plus-240.png"
                  style={{ width: "300px" }}
                />
                <Card.Title className="ms-3 pt-2">
                  Добавить новый отель
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>
      <AddPutHotelModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddOrPutHotel={fetchHotels}
        edit={edit}
        id={hotelId}
        serviceId={serviceId}
      />
    </div>
  );
});

export default Hotels;
