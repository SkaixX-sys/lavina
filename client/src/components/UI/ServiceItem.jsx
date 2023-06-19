import React from "react";
import { SERVICES_PAGE_ROUTER } from "../../utils/consts";
import { Card, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function ServiceItem({
  type,
  title,
  description,
  image,
  id,
  isAuth,
  currentId,
}) {
  return (
    <Card key={id} className="border-none m-4" style={{ width: "400px" }}>
      <div className="d-flex overflow-visible">
        <Card.Img
          variant="top"
          src={import.meta.env.VITE_APP_API_URL + "/" + image}
          width={400}
          height={300}
        />
        <div className="vertical-text">
          0{id} — {title}
        </div>
      </div>
      <Card.Body className="">
        <Card.Title className="mt-3 ps-4">
          {title} {isAuth && "(" + type + ")"}
        </Card.Title>
        <Card.Text className="mt-5 ps-4">{description}</Card.Text>
        <NavLink
          to={SERVICES_PAGE_ROUTER + "/" + type}
          className="d-flex align-content-center color-black mt-5"
        >
          <img
            className="me-3"
            src="./src/assets/icons/arrowToButton.png"
            alt="arrow"
          />
          Унать подробнее
        </NavLink>
        {isAuth && (
          <NavLink
            className="ms-4 p-2 text-color custom-border justify-content-center align-content-center"
            style={{ backgroundColor: "yellow" }}
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
            className="ms-3 p-2 text-color justify-content-center align-content-center"
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
  );
}

export default ServiceItem;
