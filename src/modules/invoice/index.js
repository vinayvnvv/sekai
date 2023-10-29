import { useState, useEffect } from "react";
import Form from "./form";
import PDF from "./pdf";
import { addInvoice, getInvoice, updateInvoice } from "../../firebase";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  formatInvoiceGETDataFromFirebase,
  formatInvoicePOSTDataForFirebase,
} from "./pdf/utils";
import { Box, CircularProgress } from "@mui/material";

function InvoiceApp() {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [invoiceData, setInvoiceData] = useState({ passengers: [] });
  const [mode, setMode] = useState("add");
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);

  const onSubmitForm = async (v) => {
    let doc;
    if (!id) {
      doc = await addInvoice(formatInvoicePOSTDataForFirebase(v));
      setId(doc.id);
      navigate(`${location.pathname}?id=${doc.id}`, { replace: true });
    } else {
      doc = await updateInvoice(id, formatInvoicePOSTDataForFirebase(v));
    }
    setInvoiceData({ ...invoiceData, ...v });
    setMode("invioce");
  };
  useEffect(() => {
    const _id = searchParams.get("id");
    const view = searchParams.get("view");
    const getInvoiceData = async () => {
      if (_id) {
        try {
          const invoice = await getInvoice(_id);
          const data = invoice.data();
          setInvoiceData(formatInvoiceGETDataFromFirebase(data));
          setId(_id);
          if (view) setMode("invioce");
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      }
    };
    if (_id) {
      getInvoiceData();
    } else {
      setLoading(false);
    }
  }, []);
  console.log("invoiceData", invoiceData);
  return (
    <div className="App">
      {loading ? (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          sx={{ minHeight: "100vh" }}
        >
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <div>
          {" "}
          {mode === "invioce" ? (
            <PDF data={invoiceData} onEdit={() => setMode("edit")} />
          ) : (
            <Form initialData={invoiceData} onSubmit={onSubmitForm} />
          )}
        </div>
      )}
    </div>
  );
}

export default InvoiceApp;
