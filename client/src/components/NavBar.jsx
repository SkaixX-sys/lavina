import React, { useContext, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  ADMIN_ROUTER,
  INFOS_ROUTER,
  LOGIN_ROUTER,
  MAIN_ROUTER,
  REVIEWS_ROUTER,
  SERVICES_ROUTER,
} from "../utils/consts";
import { Link, NavLink } from "react-router-dom";
import { REGISTRATION_ROUTER } from "./../utils/consts";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import FeedBackModal from "./modal/FeedBackModal";
const NavBar = observer(() => {
  const { user } = useContext(Context) ?? {};
  const isAuth = user?.isAuth ?? false;
  const [feedBackModal, setFeedBackModal] = useState();

  const logout = () => {
    localStorage.removeItem("token");
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar className="pt-4 ">
      <Container>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex justify-content-between align-content-center"
        >
          <NavLink to={MAIN_ROUTER} className="color-black">
            ЛАВИНА
          </NavLink>
          <Nav className="me-auto">
            <Link to={SERVICES_ROUTER} className="color-black ms-4">
              Услуги
            </Link>
            <Link to={INFOS_ROUTER} className="color-black ms-4">
              Информация
            </Link>
            {/* <Link to={REVIEWS_ROUTER} className="color-black ms-4">
              Отзывы
            </Link> */}
          </Nav>
          <div
            className="color-black ms-4 p-2"
            onClick={() => {
              setFeedBackModal(true);
            }}
          >
            Оставить данные
          </div>
          {isAuth ? (
            <Nav>
              <Link to={ADMIN_ROUTER} className="color-black btn">
                Админ
              </Link>
              <Link
                to={LOGIN_ROUTER}
                className="color-black ms-4 p-2 custom-button-yellow"
                onClick={() => logout()}
              >
                Выйти
              </Link>
            </Nav>
          ) : (
            <Nav>
              <Link
                to={LOGIN_ROUTER}
                className="color-black ms-4 p-2 custom-button-yellow"
              >
                Войти
              </Link>
              <Link to={REGISTRATION_ROUTER} className="color-black ms-4 p-2">
                Регистрация
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
      <FeedBackModal
        show={feedBackModal}
        onHide={() => setFeedBackModal(false)}
      />
    </Navbar>
  );
});

export default NavBar;
