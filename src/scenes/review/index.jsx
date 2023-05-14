import { Box, useTheme, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";

const Review = () => {
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [spID, setSpID] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);

  const columns = [
    { field: "id", headerName: "id" },
    {
      field: "note",
      headerName: "note",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Products_name_en",
      headerName: "Products_name_en",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Products_name_ar",
      headerName: "Products_name_ar",
      flex: 1,
    },
    {
      field: "name",
      headerName: "name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "date",
      flex: 1,
    },
    {
      field: "img",
      headerName: "img",
      flex: 1,
      renderCell: ({ value }) => {
        return (
          <img
            src={`https://beyotna.s3.amazonaws.com/development/users/${value}`}
            alt="user avatar"
            style={{ cursor: "pointer", borderRadius: "50%" }}
            width="50px"
            height="50px"
          />
        );
      },
    },

    {
      field: "rate",
      headerName: "rate",
      flex: 1,
      renderCell: ({ value }) => {
        const stars = [];
        for (let i = 0; i < value; i++) {
          stars.push(<StarIcon key={i} />);
        }
        return <Box display="flex">{stars}</Box>;
      },
    },
  ];
  // useEffect(() => {
  //   fetch(`https://meitstech.io:6005/reviews/getReviewsBasedSpID/${spID}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setRows(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    fetch("https://meitstech.io:6005/serviceProvider")
      .then((response) => response.json())
      .then((data) => {
        setServiceProviders(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchReviews = () => {
    fetch(`https://meitstech.io:6005/reviews/getReviewsBasedSpID/${spID}`)
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box m="20px">
      <Header title="Review" subtitle="Review All Prodact From Beyotna" />

      <Autocomplete
        options={serviceProviders}
        getOptionLabel={(option) => option.formal_name_en}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a service provider"
            variant="outlined"
          />
        )}
        onChange={(event, value) => setSpID(value.service_provider_id)}
      />
      <Button variant="contained" color="success" onClick={fetchReviews}>
        Get Reviews
      </Button>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Review;
