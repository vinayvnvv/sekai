import {
  Box,
  Button,
  Container,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { addData, deleteInvoice, getAllInvoice } from "../../firebase";
import AppHeader from "../components/AppHeader";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { filterInvoiceData, formatDate } from "../invoice/pdf/utils";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TodayData from "./TodayData";
import DeleteIcon from "@mui/icons-material/Delete";

let columns = [];

export const Home = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invoiceFilterData, setInvoiceFilterData] = useState({ today: [] });
  // const add = () => {
  //   deleteInvoice("KDCJT3FxbpUqfJgUV6tP");
  // };
  const getAllData = async () => {
    try {
      const docs = await getAllInvoice();
      console.log(docs.docs);
      const actualData = docs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setInvoiceData(actualData);
      setInvoiceFilterData(filterInvoiceData(actualData));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const onDeleteInvoice = async (id) => {
    const v = window.confirm("Are you sure you want to delete");
    if (v) {
      await deleteInvoice(id);
      getAllData();
    }
  };
  useEffect(() => {
    columns = [
      {
        field: "customer_name",
        flex: 20,
        minWidth: 160,
        headerName: "Customer Name",
        renderCell: (params) => (
          <Link
            style={{ textOverflow: "ellipsis", overflow: "hidden" }}
            to={`/invoice?id=${params.row.id}&view=doc`}
          >
            <Typography
              style={{ textOverflow: "ellipsis", overflow: "hidden" }}
              color={"primary"}
              variant="body2"
            >
              {params.row.customer_name}
            </Typography>
          </Link>
        ),
      },
      {
        field: "invoice_no",
        flex: 20,
        minWidth: 190,
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
        minWidth: 190,
        headerName: "Date of invoice",
        renderCell: (params) => (
          <div>{formatDate(params.value, "DD-MMM-YYYY")}</div>
        ),
      },
      {
        field: "mode",
        flex: 20,
        minWidth: 100,
        headerName: "Mode of Transport",
      },
      {
        field: "actions",
        flex: 20,
        minWidth: 100,
        headerName: "Actions",
        renderCell: (params) => (
          <>
            <Tooltip title="View Invoice" placement="right">
              <IconButton
                component={Link}
                to={`/invoice?id=${params.row.id}&view=doc`}
                aria-label="view"
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Invoice" placement="right">
              <IconButton
                onClick={() => onDeleteInvoice(params.row.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ];

    getAllData();
  }, []);
  console.log(invoiceFilterData);
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <AppHeader />
      <Box sx={{ mt: 3 }}>
        <Container maxWidth="xl">
          {loading ? (
            <Box>
              <Box sx={{ width: 250 }}>
                <Skeleton variant="rectangular" height={118} />
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              </Box>
              <Box sx={{ mt: 5 }}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Box>
            </Box>
          ) : (
            <>
              <TodayData data={invoiceFilterData.today} />
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{ mb: 2 }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight={500}
                  fontSize={15}
                  color="text.secondary"
                >
                  All Invoices
                </Typography>
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
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                  },
                }}
                pageSizeOptions={[5, 10, 25]}
                loading={loading}
                slots={{ toolbar: GridToolbar }}
              />
            </>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Home;
