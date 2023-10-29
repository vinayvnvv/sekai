import { Box, Button, Container, IconButton, Stack } from "@mui/material";
import { addData, deleteInvoice, getAllInvoice } from "../../firebase";
import AppHeader from "../components/AppHeader";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { formatDate } from "../invoice/pdf/utils";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columns = [
  { field: "customer_name", flex: 20, headerName: "Customer Name" },
  {
    field: "invoice_no",
    flex: 20,
    headerName: "Invoice No",
    renderCell: (params) => (
      <div>
        {params.row.type} {params.row.invoice_no}
      </div>
    ),
  },
  { field: "customer_state", flex: 20, headerName: "Customer State" },
  {
    field: "invoice_date",
    flex: 20,
    headerName: "Date of invoice",
    renderCell: (params) => (
      <div>{formatDate(params.row.value, "DD-MMM-YYYY")}</div>
    ),
  },
  { field: "mode", flex: 20, headerName: "Mode of Transport" },
  {
    field: "actions",
    flex: 20,
    headerName: "Actions",
    renderCell: (params) => (
      <IconButton
        component={Link}
        to={`/invoice?id=${params.row.id}&view=doc`}
        aria-label="delete"
      >
        <VisibilityIcon />
      </IconButton>
    ),
  },
];

export const Home = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const add = () => {
    deleteInvoice("KDCJT3FxbpUqfJgUV6tP");
  };
  useEffect(() => {
    const getAllData = async () => {
      try {
        const docs = await getAllInvoice();
        console.log(docs.docs);
        setInvoiceData(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    getAllData();
  }, []);
  console.log(invoiceData);
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <AppHeader />
      <Box sx={{ mt: 3 }}>
        <Container maxWidth="xl">
          <Stack direction={"row"} justifyContent={"end"} sx={{ mb: 2 }}>
            <Button
              component={Link}
              to={"/invoice"}
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
            >
              Create Invoice
            </Button>
          </Stack>
          <DataGrid
            sx={{ backgroundColor: "#fff" }}
            rows={invoiceData}
            columns={columns}
            loading={loading}
            slots={{ toolbar: GridToolbar }}
          />
        </Container>
      </Box>
    </div>
  );
};

export default Home;
