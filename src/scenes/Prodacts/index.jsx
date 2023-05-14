import { Box, useTheme, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import { useState, useEffect } from "react";

const Prodacts = () => {
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [spID, setSpID] = useState("");
  const [serviceProviders, setServiceProviders] = useState([]);

  const columns = [
    // { field: "service_provider_products_id", headerName: "service_provider_products_id" },
    {
      field: "Products_name_ar",
      headerName: "Products_name_ar",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Products_name_en",
      headerName: "Products_name_en",
      flex: 1,
    },
    {
      field: "Products_desc_ar",
      headerName: "Products_desc_ar",
      flex: 1,
    },
    {
      field: "Products_desc_en",
      headerName: "Products_desc_en",
      flex: 1,
    },
    {
      field: "service_type_ar",
      headerName: "service_type_ar",
      flex: 1,
    },
    {
      field: "service_type_en",
      headerName: "service_type_en",
      flex: 1,
    },
    {
      field: "product_type_ar",
      headerName: "product_type_ar",
      flex: 1,
    },
    {
      field: "product_type_en",
      headerName: "product_type_en",
      flex: 1,
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
    fetch(`https://meitstech.io:6005/serviceProviderProduct/getAllSPProductsBasedSPId/${spID}`)
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
      <Header title="Prodacts" subtitle="Prodact From Beyotna" />

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
        Get Prodacts
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
          getRowId={(row) => row.service_provider_products_id}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Prodacts;
