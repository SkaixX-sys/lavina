import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { NEWS_ROUTER } from "../utils/consts";
import { deleteNews, getNews } from "../http/newsAPI";
import AddPutNewsModal from "../components/modal/AddPutNewsModal";
import { Context } from "../main";

function MainNews() {
  const { user } = useContext(Context);
  const isAuth = user?.isAuth ?? false;
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newsId, setNewsId] = useState(false);
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);

  const handleEditNews = async (id) => {
    setNewsId(id);
    setEdit(true);
    setShowModal(true);
  };
  const handleDeleteNews = async (id) => {
    try {
      await deleteNews(id);
      fetchNews();
    } catch (e) {
      throw e;
    }
  };

  const fetchNews = async () => {
    try {
      const data = await getNews(10, 1);
      if (!news) {
        alert("Новости не найдены");
      }
      setNews(data.news);
      setCount(data.count);
      setPages(data.pages);
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Container>
      <h2 className="text-center m-4">Новости</h2>
      <div className="d-flex flex-wrap justify-content-start align-items-start ">
        {news.map((newsItem) => (
          <Card
            key={newsItem.id}
            className="p-1 pb-4 m-3 border-none"
            style={{ width: "400px" }}
          >
            <Card.Img
              variant="top"
              src={import.meta.env.VITE_APP_API_URL + "/" + newsItem.image}
              width={400}
              height={300}
              className="p-3"
            />
            <Card.Body className="p-1">
              <Card.Title className="ms-3 pt-2">{newsItem.title}</Card.Title>
              <Card.Text className="ms-3 pt-2 pb-2">
                {newsItem.createdAt}
              </Card.Text>
              <NavLink
                to={NEWS_ROUTER + "/" + newsItem.id}
                className="ms-3 color-black"
                style={{ fontWeight: "700" }}
              >
                <img
                  className="me-3"
                  src="./../src/assets/icons/arrowToButton.png"
                  alt="arrow"
                />
                Узнать подробнее
              </NavLink>
              {isAuth && (
                <NavLink
                  className="ms-4 p-2 justify-content-center align-content-center"
                  onClick={() => handleEditNews(newsItem.id)}
                >
                  <Image
                    src="./../src/assets/editIcon/edit.png"
                    alt="Edit"
                    width={30}
                    height={30}
                  />
                </NavLink>
              )}
              {isAuth && (
                <NavLink
                  className="ms-3 p-2 justify-content-center align-content-center"
                  onClick={() => handleDeleteNews(newsItem.id)}
                >
                  <Image
                    src="./../src/assets/deleteIcon/delete.png"
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
            style={{
              width: "400px",

              cursor: "pointer",
            }}
          >
            <Card.Body
              className="p-1 text-center"
              onClick={() => {
                setEdit(false);
                setShowModal(true);
              }}
            >
              <Card.Img
                src="./../src/assets/icons8-plus-240.png"
                style={{ width: "300px" }}
              />
              <Card.Title className="ms-3 pt-2">Добавить новость</Card.Title>
            </Card.Body>
          </Card>
        )}
      </div>
      <AddPutNewsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onAddOrPutNews={fetchNews}
        edit={edit}
        newsId={newsId}
      />
    </Container>
  );
}

export default MainNews;
