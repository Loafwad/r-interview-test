import React, { useState } from "react";
import styled from "styled-components/macro";
import theme from "../../constants/theme";

export default ({ title, imageUrl, url, width, editState, handleActive }) => {
  const [articleTitle, setArticleTitle] = useState(title);
  const handleChange = (inputText) => {
    setArticleTitle(inputText);
  };

  const handleClick = (url) => {
    handleActive(url);
  };

  return (
    <Card width={width}>
      <EditButton onClick={editState === url ? () => handleClick(null) : () => handleClick(url)}>
        {editState === url ? "save" : "edit"}
      </EditButton>
      <Image src={imageUrl} alt={title} />
      <ArticleTitle title={articleTitle} url={url} editState={editState} updateTitle={handleChange} />
    </Card>
  );
};

const ArticleTitle = ({ title, editState, updateTitle, url }) => {
  if (editState !== url)
    return (
      <Link href={url}>
        <Title>{title}</Title>
      </Link>
    );
  else return <InputField type="text" placeholder={title} onChange={(e) => updateTitle(e.target.value)} />;
};

const Card = styled.div`
  background-color: ${theme.colors.primary};
  width: calc(${(props) => props.width}% * 100 / 12);
  color: black;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Link = styled.a`
  color: ${theme.colors.text};
  text-decoration: none;
  ${Card}:hover & {
    text-decoration: underline;
  }
`;

const Title = styled.h3`
  padding: ${theme.padding.medium};
  margin: 0;
  font-size: 1.5vw;
  word-wrap: break-word;
`;

const InputField = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: ${theme.padding.medium};
`;

const EditButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  ${Card}:hover & {
    display: inherit;
  }
`;
