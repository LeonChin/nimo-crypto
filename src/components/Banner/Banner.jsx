import { Container, Typography } from "@mui/material";
import { css } from "@emotion/css";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <div
      className={css`
        background-image: url(./hero_img.jpg);
        width: 100%;
      `}
    >
      <Container
        className={css`
          height: 400px;
          display: flex;
          flex-direction: column;
          padding-top: 25;
          justify-content: space-around;
        `}
      >
        <div
          className={css`
            display: flex;
            height: 40%;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          `}
        >
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            <a>Nimo </a>Crypto
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Everything about Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
