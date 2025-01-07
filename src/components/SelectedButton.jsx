import styled from "styled-components";
import { ListItem } from "@mui/material";

const SelectedButton = ({ children, selected, onClick }) => {
  const ButtonGroup = styled(ListItem)(() => ({
    border: "1px solid orange",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "orange" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "orange",
      color: "black",
    },
    width: "22%",
  }));
  return <ButtonGroup onClick={onClick}>{children}</ButtonGroup>;
};

export default SelectedButton;
