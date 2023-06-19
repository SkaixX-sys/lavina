import React, { useEffect, useState } from "react";
import { NEWS_PAGE_ROUTER } from "../utils/consts";
import { Card, Container } from "react-bootstrap";
import { getNews } from "../http/newsAPI";
import { NavLink } from "react-router-dom";

function LastThreeNews() {
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNews, setIsNews] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNews(3, currentPage);
        if(data) {
          setIsNews(true)
          setNews(data.news);
          setCount(data.count);
          setPages(data.pages);
        }else{
          setIsNews(false)
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <Container className="services">
      <h3 className="display-5" style={{ fontWeight: "700" }}>
        Что <br></br> нового?
      </h3>
      <div>
        <div className="d-flex justify-content-start align-items-start ">
          {news.map((news) => (
            <Card
              key={news.id}
              className="border-none m-4"
              style={{ width: "400px" }}
            >
              <Card.Img
                variant="top"
                src={import.meta.env.VITE_APP_API_URL + "/" + news.image}
                width={400}
                height={300}
              />
              <Card.Body className="">
                <Card.Title className="mt-3 ps-4">{news.title} </Card.Title>
                <Card.Text className="mt-5 ps-4">
                  {news.description}
                </Card.Text>
                <NavLink to={NEWS_PAGE_ROUTER + '/' + news.id} className="d-flex align-content-center color-black mt-5">
                  <img
                    className="me-3"
                    src="./src/assets/icons/arrowToButton.png"
                    alt="arrow"
                  />
                  Узнать подробнее
                </NavLink>
              </Card.Body>
            </Card>
          ))}
        </div>
        {isNews && <h2>Новостей не найдено</h2>}
      </div>
    </Container>
  );
}

export default LastThreeNews;
