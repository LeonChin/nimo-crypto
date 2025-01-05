import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import styled, { ThemeProvider } from "styled-components";
import { Box, createTheme, Typography } from "@mui/material";
//import { numberWithCommas } from "../components/CoinsTable";
// import parse from "html-react-parser";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    console.log("coin", data);
  };

  const Wrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const SideBarWrapper = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  }));

  const MarketDataWrapper = styled(Box)(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  useEffect(() => {
    fetchCoin();
  }, []);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <SideBarWrapper>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Montserrat",
            }}
          >
            {coin?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              width: "100%",
              fontFamily: "Montserrat",
              padding: 25,
              paddingBottom: 15,
              paddingTop: 0,
              textAlign: "justify",
            }}
          >
            {coin?.description?.en?.split(". ")[0]}.
          </Typography>
          <MarketDataWrapper>
            <span style={{ display: "flex" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}
              >
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {coin?.market_cap_rank}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}
              >
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {/* {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )} */}
                {coin?.market_data.current_price[currency.toLowerCase()]}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}
              >
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {/* {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )} */}
                {coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)}
                M
              </Typography>
            </span>
          </MarketDataWrapper>
        </SideBarWrapper>
        <CoinInfo coin={coin} />
      </Wrapper>
    </ThemeProvider>
  );
};

export default CoinPage;
