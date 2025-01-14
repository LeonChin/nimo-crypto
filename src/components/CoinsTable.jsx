import { useState, useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";

import {
  Container,
  createTheme,
  LinearProgress,
  TableContainer,
  TableHead,
  TextField,
  ThemeProvider,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { currency, symbol } = CryptoState();

  const navigateTo = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log("coins", data);
    setCoins(data);
    setLoading(false);
  };

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  useEffect(() => {
    fetchData();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="search"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress
              style={{ backgroundColor: "orange" }}
            ></LinearProgress>
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "orange" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? " " : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map((row) => {
                    const isProfit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigateTo(`/coin/${row.id}`)}
                        key={row.name}
                        style={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                          fontFamily: "Montserrat",
                          "&:hover": {
                            backgroundColor: "#131111",
                          },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            gap: 15,
                            display: "flex",
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: isProfit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {isProfit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
