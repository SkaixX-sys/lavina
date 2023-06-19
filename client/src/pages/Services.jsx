import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { SERVICES_PAGE_ROUTER } from "../utils/consts";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { deleteService, getServices } from "../http/serviceAPI";
import CreateUpdateSerivceModal from "../components/modal/CreateUpdateServiceModal";
import MainSlider from "../components/MainSlider";

const Services = observer(() => {
  const { user } = useContext(Context) ?? {};
  const isAuth = user?.isAuth ?? false;
  const [showModal, setShowModal] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [typeId, setTypeId] = useState();
  const [serviceId, setServiceId] = useState();

  const editService = (id) => {
    setTypeId(id);
    setEdit(true);
    setShowModal(true);
  };

  const fetchServices = async () => {
    try {
      const allServices = await getServices(10, 1);
      setServiceData(allServices.Model);
    } catch (e) {
      throw(e)
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteServiceF = async (id) => {
    try {
      await deleteService(id);
      fetchServices();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="services">
      <MainSlider/>
      <h2 className="text-center m-4">Услуги</h2>
      <Container>
        <div className="d-flex flex-wrap justify-content-start align-items-start ">
          {serviceData.map((type) => (
            <Card
              key={type.id}
              className="p-1 m-3 border-none"
              style={{ width: "400px" }}
            >
              <Card.Img
                variant="top"
                src={import.meta.env.VITE_APP_API_URL + "/" + type.image}
                width={400}
                height={300}
                className="p-3"
              />
              <Card.Body className="p-1">
                <Card.Title className="ms-3">
                  {type.title} {isAuth && "(" + type.type + ")"}{" "}
                </Card.Title>
                <Card.Text className="ms-3 pt-4 pb-4">
                  {type.description}
                </Card.Text>
                <NavLink
                  to={SERVICES_PAGE_ROUTER + "/" + type.type}
                  onClick={() => setServiceId(type.id)}
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
                    className="ms-4 justify-content-center align-content-center"
                    onClick={() => editService(type.id)}
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
                    className="ms-3 justify-content-center align-content-center"
                    onClick={() => deleteServiceF(type.id)}
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
                  Добавить новую услугу
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>
      <CreateUpdateSerivceModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddOrPutService={fetchServices}
        edit={edit}
        id={typeId}
        serviceId={serviceId}
      />
    </div>
  );
});

export default Services;
