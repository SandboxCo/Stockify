import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { styled } from '@mui/system';

const columns = [
  { id: 'ticker', label: 'Ticker', minWidth: 50 },
  { id: 'name', label: 'Company', minWidth: 50 },
  {
    id: 'portfolio',
    label: 'Portfolio',
    minWidth: 50,
    align: 'right',
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'Change',
    label: 'Change',
    minWidth: 60,
    align: 'right',
    format: (value) => `$${value.toFixed(2)}`,
  },
  {
    id: 'percentchange',
    label: 'Change %',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 80,
    align: 'center',
  },
];

const TickerTable = ({ currentlyWatched, setCurrentlyWatched, stocks, watchlist, setWatchlist }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const handleAddToWatchlist = (ticker) => {
    if (!watchlist.includes(ticker)) {
      setWatchlist([...watchlist, ticker]);
    }
  };

  const handleRowClick = (ticker, name, price) => {
    setCurrentlyWatched({ ticker, name, price });
  };

  const handleSearch = (prefix) => {
    setSearchTerm(prefix);
  };

  const filteredRows = stocks.filter((row) =>
    row.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const renderTableRows = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredRows.slice(startIndex, endIndex).map((row) => (
      <TableRow
        key={row.ticker}
        style={{
          backgroundColor: currentlyWatched.ticker === row.ticker ? 'lightblue' : 'white',
          cursor: 'pointer',
        }}
        onClick={() => handleRowClick(row.ticker, row.name, row.price)}
      >
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell
              key={column.id}
              align={column.align}
              sx={{
                fontFamily: 'Montserrat',
                fontSize: '0.75rem',
                padding: '8px',
                color: column.id === 'Change' ? (value >= 0 ? 'green' : 'red') : 'inherit',
                fontWeight: column.id === "ticker" ? 600 : 300
              }}
            >
              {column.id === 'actions' ? (
                <button
                  style={{
                    fontWeight: 300, 
                    color:"white", 
                    border: "none", 
                    backgroundColor:"#007BFF", 
                    fontSize: 11, 
                    width: 70, 
                    padding:4, 
                    fontFamily:"Montserrat",
                    cursor: "pointer"
                  }}
                  size="small"
                  onClick={() => handleAddToWatchlist(row.ticker)}
                >
                  Add to <br/>Watchlist
                </button>
              ) : column.format && typeof value === 'number' ? (
                column.format(value)
              ) : (
                value
              )}
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ width: '100%', height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", width: "100%", height: "10%" }}>
        <input
          type="text"
          placeholder="Search Companies..."
          value={searchTerm}
          style={{ padding: "8px", width: "100%", border: "1px solid #ccc", borderRadius: 4, marginRight: 4, fontFamily: "Montserrat", outline: "none" }}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button style={{ padding: "8px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          <span role="img" aria-label="Search">
            <FaMagnifyingGlass />
          </span>
        </button>
      </div>
      <TableContainer sx={{ backgroundColor: 'white', borderRadius: 3, overflowX: 'none', height: "90%" }}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    fontFamily: 'Montserrat',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    padding: '8px',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'white',
          }}
        />
      </TableContainer>
    </div>
  );
};

export default TickerTable;
