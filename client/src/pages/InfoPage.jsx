import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { deleteInfoPages, getInfoPages } from "../http/infoPageAPI";
import InfoPageModal from "../components/modal/InfoPageModal";

const InfoPage = observer(() => {
  const {type} = useParams()
  const { user } = useContext(Context) ?? {};
  const isAuth = user?.isAuth ?? false;
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [infoItemId, setInfoItemId] = useState();
  const [infoId, setInfoId] = useState();
  const [details, setDetails] = useState([]);

  const InfoId = async() => {
    
  }

  const handleEditDetail = (id) => {
    setInfoItemId(id);
    setEdit(true);
    setShowModal(true);
  };
  const handleAddDetail = () => {
    setEdit(false);
    setShowModal(true);
  };

  const fetchDetails = async () => {
    try {
      const data = await getInfoPages(type);
      setDetails(data);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleDeleteDetail = async (id) => {
    try {
      await deleteInfoPages(id);
      fetchDetails();
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="services">
      <h2 className="text-center m-4">Информация</h2>
      <Container>
        <div className="">
          {details.map((deteil) => (
            <Card
              key={deteil.id}
              className="p-1 pb-4 m-3 border-none"
              style={{ width: "400px" }}
            >
              <Card.Img
                variant="top"
                src={import.meta.env.VITE_APP_API_URL + "/" + deteil.image}
                width={400}
                height={300}
                className="p-3"
              />
              <Card.Body className="p-1">
                <Card.Title className="ms-3 pt-2">{deteil.title} </Card.Title>
                <Card.Text className="ms-3 pt-2 pb-2">
                  {deteil.description}
                </Card.Text>
                <NavLink
                  to={ROOMS_ROUTER + "/" + deteil.type}
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
                    onClick={() => handleEditDetail(deteil.id)}
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
                    onClick={() => handleDeleteDetail(deteil.id)}
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
                onClick={() => handleAddDetail()}
              >
                
                <Card.Title className="ms-3 pt-2">
                  Добавить описание
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>
      <InfoPageModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddOrPutHotel={fetchDetails}
        edit={edit}
        id={infoItemId}
        infoId={infoId}
      />
    </div>
  );
});

export default InfoPage;
