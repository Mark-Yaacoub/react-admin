
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import SupportIcon from '@mui/icons-material/Support';
import PersonIcon from '@mui/icons-material/Person';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';

const Users = () => {
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "user_id", headerName: "user_id" },
    {
      field: "user_name",
      headerName: "User Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "first_name",
      headerName: "First Name",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "user_type",
      headerName: "User Type",
      flex: 1,
      renderCell: ({ row: { user_type } }) => {
        let userTypeLabel = '';
        switch (user_type) {
          case 4:
            userTypeLabel = 'Organization';
            break;
          case 315:
            userTypeLabel = 'Support User';
            break;
          case 60:
            userTypeLabel = 'Organization User';
            break;
          case 282:
            userTypeLabel = 'Mobile User';
            break;
          case 61:
            userTypeLabel = 'Super admin';
            break;
          case 97:
            userTypeLabel = 'Request Owner';
            break;
          case 217:
            userTypeLabel = 'Service Provider';
            break;
          default:
            userTypeLabel = user_type;
        }
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              user_type === "60"
                ? colors.greenAccent[600]
                : user_type === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {user_type === 4 && <CorporateFareIcon />}
            {user_type === 315 && <SupportIcon />}
            {user_type === 60 && <PersonIcon />}
            {user_type === 282 && <InterpreterModeIcon />}
            {user_type === 61 && <InterpreterModeIcon />}
            {user_type === 97 && <InterpreterModeIcon />}
            {user_type === 217 && <SecurityOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {userTypeLabel}
            </Typography>
          </Box>
        );
      },
    },

  ];
  useEffect(() => {
    fetch("https://meitstech.io:6005/user/getAllActiveUsers")
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box m="20px">
      <Header title="Users" subtitle="Users From Beyotna" />
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
          getRowId={(row) => row.user_id}
          components={{ Toolbar: GridToolbar }}
        />

      </Box>
    </Box>
  );
};

export default Users;