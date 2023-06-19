import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { INFO_PAGE_ROUTER } from "../utils/consts";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { deleteInfo, getInfos } from "../http/infoAPI";
import CreateUpdateInfoModal from "../components/modal/CreateUpdateInfoModal";
import MainSlider from "../components/MainSlider";

const Infos = observer(() => {
  const { user } = useContext(Context) ?? {};
  const isAuth = user?.isAuth ?? false;
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [typeId, setTypeId] = useState();
  const [infoData, setInfoData] = useState([]);

  const editService = (id) => {
    setTypeId(id);
    setEdit(true);
    setShowModal(true);
  };

  const fetchServiceTypes = async () => {
    try {
      const allInfos = await getInfos();

      setInfoData(allInfos);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const deleteService = async (id) => {
    try {
      await deleteInfo(id);
      fetchServiceTypes();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="services">
      <MainSlider />
      <h2 className="text-center m-4">Информация</h2>
      <Container>
        <div className="d-flex flex-wrap justify-content-start align-items-start ">
          {infoData.map((info) => (
            <Card
              key={info.id}
              className="p-1m-3 border-none"
              style={{ width: "400px" }}
            >
              <Card.Img
                to={INFO_PAGE_ROUTER + "/" + info.type}
                variant="top"
                src={import.meta.env.VITE_APP_API_URL + "/" + info.image}
                width={400}
                height={300}
                className="p-3"
              />
              <Card.Body className="p-1">
                <Card.Title className="ms-3">{info.title}</Card.Title>
                <Card.Text className="ms-3 pt-4 pb-4">
                  {info.description}
                </Card.Text>
                <NavLink
                  to={INFO_PAGE_ROUTER + "/" + info.type}
                  className="ms-3 color-black"
                  style={{ fontWeight: "700" }}
                >
                  <img
                    className="me-3"
                    src="./src/assets/icons/arrowToButton.png"
                    alt="arrow"
                  />
                  Узнать подробнее
                </NavLink>
                {isAuth && (
                  <NavLink
                    className="ms-4 p-2 justify-content-center align-content-center"
                    onClick={() => editService(info.id)}
                  >
                    <Image
                      src="./src/assets/editIcon/edit.png"
                      alt="Edit"
                      width={30}
                      height={30}
                    />
                  </NavLink>
                )}
                {isAuth && (
                  <NavLink
                    className="ms-3 p-2 justify-content-center align-content-center"
                    onClick={() => deleteService(info.id)}
                  >
                    <Image
                      src="./src/assets/deleteIcon/delete.png"
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
                  src="./src/assets/icons8-plus-240.png"
                  style={{ width: "300px" }}
                />
                <Card.Title className="ms-3 pt-2">
                  Добавить новую информацию
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>

      <CreateUpdateInfoModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddServiceType={fetchServiceTypes}
        edit={edit}
        id={typeId}
      />
    </div>
  );
});

export default Infos;
