import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Image, Row, Table } from "react-bootstrap";
import { Context } from "../main";
import { useParams } from "react-router-dom";
import { deletePrice, getPrices } from "../http/servicePriceAPI";
import { getService, getServices } from "../http/serviceAPI";
import CreateUpdatePrice from "../components/modal/CreateUpdatePriceModal";
import MainSlider from "../components/MainSlider";

const ServicePage = observer(() => {
  const { user } = useContext(Context);
  const [rootService, setRootService] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [priceId, setPriceId] = useState();
  const [dataPrices, setDataPrices] = useState([]);
  const [dataService, setDataService] = useState([]);
  const { type } = useParams();

  const fetchPrices = async () => {
    const allPricesByType = await getPrices(type);
    setDataPrices(allPricesByType);
    const oneServiceByType = await getService(type);
    setRootService(oneServiceByType);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const editServiceTraffic = (id) => {
    setPriceId(id);
    setEdit(true);
    setShowModal(true);
  };
  const deleteServicePrice = async (id) => {
    try {
      await deletePrice(id);
      fetchPrices();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const image = rootService && rootService.image;
  return (
    <Container>
      <Row>
        <Col
          xs={6}
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Image
            src={import.meta.env.VITE_APP_API_URL + "/" + image}
            width={610}
            className="p-3"
          />
        </Col>

        <Col xs={6} md={6}>
          <h2>{rootService.title}</h2>
          <div className="mt-4">
            <h6 className="text-color ">ВЕСЕННЯЯ АКЦИЯ!</h6>C 18 марта дневной
            безлимит по цене абонемента на 3 часа.- Действует в выходные и
            будние дни;- Распространяется на детские тарифы;- Дневной безлимит
            действует ВЕСЬ день до 17:00 (согласно режиму работы);- Скидка 22%
            или 400 рублей.
          </div>
          <div className="mt-3">
            Для прохода через турникет необходимо приобрести карту электронного
            доступа (Ski-pass) стоимостью 200 руб. Возврату не подлежит!;
            <br></br>Ski-pass – это электронный кошелек, с помощью которого
            можно оплатить все услуги комплекса. Денежные средства не сгорают в
            конце сезона;
            <br></br>Детям от 7 до 12 лет включительно предоставляется скидка
            50% при покупке в кассе абонемента или разовых подъёмов;
            <br></br>Дети до 6 лет включительно – бесплатно (при покупке
            равнозначного абонемента родителем);
            <br></br>Оплата услуг означает согласие с правилами нахождения на
            территории комплекса, правилами пользования канатными дорогами и
            оборудованием, правилами поведения на склоне;
            <br></br>Использование Ski-pass несколькими гостями запрещено! В
            случае выявления данного факта администрация вправе заблокировать
            Ski-pass.
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Период действия</th>
              <th>Будний день</th>
              <th>Выходной или праздник</th>
              {user.isAuth && <th>Редактировать</th>}
              {user.isAuth && <th>Удалить</th>}
            </tr>
          </thead>
          <tbody>
            {dataPrices.map((tariff, index) => (
              <tr key={index}>
                <td>{tariff.period}</td>
                <td>{tariff.weekdayNewPrice}р</td>
                <td>{tariff.weekendNewPrice}р</td>
                {user.isAuth && (
                  <td
                    className=""
                    style={{ cursor: "pointer" }}
                    onClick={() => editServiceTraffic(tariff.id)}
                  >
                    <Image
                      src="../src/assets/editIcon/edit.png"
                      alt="Edit"
                      width={30}
                      height={30}
                    />
                  </td>
                )}
                {user.isAuth && (
                  <td
                    className=""
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteServicePrice(tariff.id)}
                  >
                    <Image
                      src="../src/assets/deleteIcon/delete.png"
                      alt="Delete"
                      width={40}
                      height={40}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        {user.isAuth && (
          <div
            className="btn btn-outline-secondary "
            onClick={() => {
              setShowModal(true);
              setEdit(false);
            }}
          >
            Добавить цену
          </div>
        )}
      </Row>
      <CreateUpdatePrice
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddServiceType={fetchPrices}
        edit={edit}
        idTraffic={priceId}
      />
    </Container>
  );
});

export default ServicePage;
