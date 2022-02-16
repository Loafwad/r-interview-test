import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import theme from "../../constants/theme";

import Article from "./Article";

export default () => {
  let [articleData, setArticelData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editID, setEditID] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      const response = await fetch("https://storage.googleapis.com/aller-structure-task/test_data.json");
      const json = await response.json();
      setArticelData(json);
      setIsLoading(false);
    };
    fetchArticles();
  }, [setArticelData]);

  const handleActive = (url) => {
    setEditID(url);
  };

  return (
    <Container>
      {isLoading ? (
        <div style={{ color: "black" }}>
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        </div>
      ) : (
        <MapArticles articles={articleData[0]} editState={editID} handleActive={handleActive} />
      )}
    </Container>
  );
};

const MapArticles = ({ articles, editState, handleActive }) => {
  return articles.map((row, i) => (
    <Column key={i}>
      {row.columns.map((article, i) => (
        <Article {...article} editState={editState} handleActive={handleActive} key={i} />
      ))}
    </Column>
  ));
};

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  text-align: left;
`;

const Column = styled.div`
  display: flex;
  > * {
    margin: ${theme.padding.medium};
  }
`;
