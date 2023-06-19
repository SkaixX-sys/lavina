import React from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { INFOS_ROUTER, INFO_PAGE_ROUTER, MAIN_ROUTER, REVIEWS_ROUTER, SERVICES_PAGE_ROUTER } from './../utils/consts';

function Footer() {
  return (
    <Row style={{backgroundColor:"#EAEAEA"}} className="p-sm-5 mt-sm-5 ">
      <Row>
        <Col xs={4} className="d-flex justify-content-center ps-5 font-medium letter15 opacity-75">
          <img
            className="me-3"
            src="../../../src/assets/icons/logo.png"
            alt="arrow"
            height="25px"
            width="67px"
          />
          ЛАВИНА
        </Col>
        <Col xs={8}>
          <Row>
            <Col xs={2}>
              <ul className="opacity-75">
                <li className="font-medium size14 letter3">О нас</li>
                <li>
                  <NavLink to={INFO_PAGE_ROUTER + 'infos'} className="size12 letter3 font-regular">Новости</NavLink>
                </li>
                <li>
                  <NavLink to={INFO_PAGE_ROUTER + 'rules'} className="size12 letter3 font-regular">Правила</NavLink>
                </li>
                <li>
                  <NavLink to={INFOS_ROUTER} className="size12 letter3 font-regular">Схемы</NavLink>
                </li>
                <li>
                  <NavLink to={INFO_PAGE_ROUTER + 'workingMode'} className="size12 letter3 font-regular">
                    Режим работы
                  </NavLink>
                </li>
                <li>
                  <NavLink to={INFO_PAGE_ROUTER + 'albums'} className="size12 letter3 font-regular">Галлерея</NavLink>
                </li>
              </ul>
            </Col>
            <Col xs={2}>
              <ul className="opacity-75">
                <li className="font-medium size14 letter3">Услуги</li>
                <li>
                  <NavLink to={SERVICES_PAGE_ROUTER + 'lift'} className="size12 letter3 font-regular">Подъемники</NavLink>
                </li>
                <li>
                  <NavLink to={SERVICES_PAGE_ROUTER + 'equipment'} className="size12 letter3 font-regular">Прокат</NavLink>
                </li>
                <li>
                  <NavLink to={SERVICES_PAGE_ROUTER + 'tour'} className="size12 letter3 font-regular">Туры</NavLink>
                </li>
                <li>
                  <NavLink to={SERVICES_PAGE_ROUTER + 'guide'} className="size12 letter3 font-regular">Гиды</NavLink>
                </li>
                <li>
                  <NavLink to={SERVICES_PAGE_ROUTER + 'instructor'} className="size12 letter3 font-regular">Инструкторы</NavLink>
                </li>
                <li>
                  <NavLink to={SERVICES_PAGE_ROUTER + 'seasonpass'} className="size12 letter3 font-regular">Абонименты</NavLink>
                </li>
                <li>
                  <NavLink to={SERVICES_PAGE_ROUTER + 'hotel'} className="size12 letter3 font-regular">Гостиницы</NavLink>
                </li>
              </ul>
            </Col>
            <Col xs={2}>
              <ul className="opacity-75">
                <li className="font-medium size14 letter3">Репутация</li>
                <li>
                  {/* <NavLink to={REVIEWS_ROUTER} className="size12 letter3 font-regular">Отзывы</NavLink> */}
                </li>
              </ul>
            </Col>
            <Col xs={2}>
              <ul className="opacity-75">
                <li className="font-medium size14 letter3">Соцсети</li>
                <li>
                  <NavLink to={MAIN_ROUTER} className="size12 letter3 font-regular">Вконтакте</NavLink>
                </li>
                <li>
                  <NavLink to={MAIN_ROUTER} className="size12 letter3 font-regular">Ютуб</NavLink>
                </li>
                <li>
                  <NavLink to={MAIN_ROUTER} className="size12 letter3 font-regular">Инстаграмм</NavLink>
                </li>
                <li>
                  <NavLink to={MAIN_ROUTER} className="size12 letter3 font-regular">Телеграм</NavLink>
                </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col xs={6} className="letter3 size16 font-regular opacity-50">
              © Copyright Lavina. Все права соблюдены.
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Footer;
