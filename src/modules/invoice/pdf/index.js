import { useEffect } from "react";
import {
  amtInWords,
  calcTax,
  formatInvioceTableData,
  putGlobalStylesForPrint,
} from "./utils";
import "./style.css";
import { Button, Paper } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const PDF = ({ data, onEdit }) => {
  const {
    invoice_no,
    invoice_date,
    po_no,
    state,
    mode,
    customer_name,
    customer_adress,
    customer_gstin,
    customer_state,
    type,
    remark,
    show_igst,
  } = data || {};
  const invoiceData = formatInvioceTableData(data);
  const {
    passengers,
    total_amount,
    total_taxable_value,
    total_tour_cost,
    total_igst_amount,
    total_cgst_amount,
    total_sgst_amount,
    invoice_type_title,
    tax_rate_perc,
    igst_cgst_rate,
    invoice_tour_ticket,
    total_tax_value,
  } = invoiceData;
  console.log("invoiceData", invoiceData);
  const amtWord = amtInWords(total_amount);
  useEffect(() => {
    putGlobalStylesForPrint();
  }, []);
  const print = () => {
    window.print();
  };
  return (
    <div className="pdf-root">
      <div className="book">
        <div className="page">
          <div className="subpage">
            <div className="header">
              <img
                src="https://sekaiholidays.in/wp-content/uploads/2022/12/home-page-top-logo-with-circle.png"
                width={110}
              />
              <div className="i name">Sekai Innovations LLP</div>
              <div className="i name">
                #A-2, Ground Floor, Chirag plaza, New Kantharaj Urs Road
              </div>
              <div className="i name">Kuvempunagar, Mysuru-570023</div>
              <div className="i" style={{ marginTop: 4 }}>
                Ph No: 9845330123
              </div>
              <div className="i">GSTIN: 29AETFS2937P1ZU</div>
            </div>
            <div className="in-con">
              <div className="ttl text-center">
                TAX INVOICE ({invoice_type_title})
              </div>
              <div className="d-s">
                <div className="left">
                  <table className="ivc-table">
                    <tbody>
                      <tr>
                        <td width={"19%"}>Invoice No: </td>
                        <td>
                          {type} - {invoice_no}
                        </td>
                      </tr>
                      <tr>
                        <td>Invoice Date: </td>
                        <td>
                          {invoice_date
                            ? invoice_date.format("DD/MM/YYYY")
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>P.O No:</td>
                        <td>{po_no}</td>
                      </tr>
                      <tr>
                        <td>State:</td>
                        <td style={{ textTransform: "uppercase" }}>{state}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    className="b-b b-t text-center"
                    style={{ padding: "2px 0px" }}
                  >
                    Bill to Customer
                  </div>
                  <table className="cus-tbl">
                    <tbody>
                      <tr>
                        <td width={"12%"}>Name: </td>
                        <td className="dtls">{customer_name}</td>
                      </tr>
                      <tr>
                        <td>Address: </td>
                        <td className="dtls">{customer_adress}</td>
                      </tr>
                      <tr>
                        <td>GSTIN:</td>
                        <td className="dtls">{customer_gstin}</td>
                      </tr>
                      <tr>
                        <td
                          className="b-t-2imp"
                          style={{ paddingTop: 4, paddingBottom: 4 }}
                        >
                          State:
                        </td>
                        <td className="dtls b-t-2imp">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span style={{ textTransform: "uppercase" }}>
                              {customer_state}
                            </span>
                            <div>Code : 29</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="right">
                  <div className="t-mode">Transportation Mode: {mode}</div>
                  <div className="empt t-reference">{remark}</div>
                  <div className="inc-status b-t-2">Invoice Status :</div>
                </div>
              </div>
              <div className="main-tbl-con">
                <table className="main-tbl">
                  <thead>
                    <tr>
                      <th rowSpan="2">S.No</th>
                      <th rowSpan="2">Passenger’s Name </th>
                      <th rowSpan="2">Destination</th>
                      <th rowSpan="2">{invoice_tour_ticket || "Tour"} Cost</th>
                      <th rowSpan="2">Commission</th>
                      <th rowSpan="2">HSN Code</th>
                      <th rowSpan="2">Rate</th>
                      <th rowSpan="2">Taxable Value</th>
                      <th colSpan="2">SGST</th>
                      <th colSpan="2">CGST</th>
                      {show_igst && <th colSpan="2">IGST</th>}
                      <th rowSpan="2">Total</th>
                    </tr>
                    <tr>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      {show_igst && (
                        <>
                          <th>Rate</th>
                          <th>Amount</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(passengers) &&
                      passengers.map(
                        (
                          {
                            id,
                            name,
                            destination,
                            tour_cost,
                            commision,
                            tax_rate,
                            igst_amount,
                            sgst_amount,
                            cgst_amount,
                            sgst_rate,
                            cgst_rate,
                            total,
                            no_of_passengers,
                            travel_date,
                          },
                          idx
                        ) => (
                          <tr key={id}>
                            <td>{idx + 1}</td>
                            <td>
                              {name}{" "}
                              {no_of_passengers > 1
                                ? `* ${no_of_passengers}`
                                : ""}
                            </td>
                            <td>
                              {destination} {travel_date}
                            </td>
                            <td>{tour_cost}</td>
                            <td>{commision}</td>
                            <td>{tax_rate == 18 ? "998555" : "998552"}</td>
                            <td>{tax_rate}%</td>
                            <td>{commision}</td>
                            <td>{sgst_rate}%</td>
                            <td>{sgst_amount}</td>
                            <td>{cgst_rate}%</td>
                            <td>{cgst_amount}</td>
                            {show_igst && (
                              <>
                                {" "}
                                <td>{tax_rate}%</td>
                                <td>{igst_amount}</td>
                              </>
                            )}

                            <td>{total}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3">Total</td>
                      <td colSpan="1">{total_tour_cost}</td>
                      <td colSpan="1"></td>
                      <td colSpan="1"></td>
                      <td colSpan="1"></td>
                      {/* <td colSpan="1"></td> */}
                      <td colSpan="1">{total_taxable_value}</td>
                      <td colSpan="1"></td>
                      <td colSpan="1">{total_sgst_amount}</td>
                      <td colSpan="1"></td>
                      <td colSpan="1">{total_cgst_amount}</td>
                      {show_igst && (
                        <>
                          <td colSpan="1"></td>
                          <td colSpan="1">{total_igst_amount}</td>
                        </>
                      )}

                      <td colSpan="1">{total_amount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="amt-s">
                <div className="left">
                  Total Invoice in words: <span>(Rupees {amtWord})</span>
                </div>
                <div className="right">
                  <div className="itm">
                    <div>Total Amount before Tax</div>
                    <div>{total_taxable_value}</div>
                  </div>
                  <div className="itm">
                    <div>Add: SGST@{igst_cgst_rate}%</div>
                    <div>{total_sgst_amount}</div>
                  </div>
                  <div className="itm">
                    <div>Add: CGST@{igst_cgst_rate}%</div>
                    <div>{total_cgst_amount}</div>
                  </div>
                  {show_igst && (
                    <div className="itm">
                      <div>Add: IGST@{tax_rate_perc}%</div>
                      <div>{total_igst_amount}</div>
                    </div>
                  )}

                  <div className="itm">
                    <div>Total Tax Amount</div>
                    <div>{total_tax_value}</div>
                  </div>
                  <div className="itm">
                    <div>Total Amount after Tax:</div>
                    <div>{total_amount}</div>
                  </div>
                </div>
              </div>
              <div className="sign-s">
                <div className="left">
                  <div className="ttl">Terms & Conditions:</div>
                  <div>1. Goods once sold cannot be return.</div>
                  <div>
                    2. Interest @24% is chargeable if Payment not made within 8
                    Days.
                  </div>
                </div>
                <div className="right">
                  <div className="tg text-center">
                    (Certified that the particulars given above are true and
                    correct)
                  </div>
                  <div className="com text-center">
                    for,Sekai Innovations LLP
                  </div>
                  <div className="sig text-center">Authorised Signatory</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Paper className="actions">
        <Button
          onClick={print}
          disableElevation
          startIcon={<LocalPrintshopIcon />}
        >
          Print
        </Button>
        <Button
          color="info"
          startIcon={<EditIcon />}
          onClick={onEdit}
          disableElevation
          sx={{ mt: 1 }}
        >
          Edit
        </Button>
        <Button
          component={Link}
          to={"/invoice"}
          color="success"
          startIcon={<AddIcon />}
          onClick={onEdit}
          variant="text"
          sx={{ mt: 1 }}
        >
          New
        </Button>
        <Button
          component={Link}
          to={"/"}
          color="inherit"
          startIcon={<HomeIcon />}
          onClick={onEdit}
          variant="text"
          sx={{ mt: 1 }}
        >
          Home
        </Button>
      </Paper>
    </div>
  );
};
export default PDF;
