import { useState } from "react";
import "./App.css";
import Form from "./form";
import PDF from "./pdf";
import { SnackbarProvider } from "notistack";

function App() {
  const [invoiceData, setInvoiceData] = useState({ passengers: [] });
  const [mode, setMode] = useState("add");
  const onSubmitForm = (v) => {
    setInvoiceData(v);
    setMode("invioce");
  };
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        {mode === "invioce" ? (
          <PDF data={invoiceData} onEdit={() => setMode("edit")} />
        ) : (
          <Form initialData={invoiceData} onSubmit={onSubmitForm} />
        )}
      </div>
    </SnackbarProvider>
  );
}

export default App;
