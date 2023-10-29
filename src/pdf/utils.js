import dayjs from "dayjs";

export const PDF_PRINT_GLOBAL_STYLES = `    body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #FAFAFA;
    font: 12pt "Tahoma";
}
* {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
}
.page {
    width: 210mm;
    min-height: 297mm;
    // padding: 20mm;
    margin: 0 auto;
    border: 1px #D3D3D3 solid;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.subpage {
    /* padding: 1cm; */
    // border: 1px red solid;
    height: 297mm;
    // outline: 1cm #FFEAEA solid;
}

@page {
    size: A4;
    margin: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact; 
        color-adjust: exact;  
}
@media print {
    html, body {
        width: 210mm;
        height: 297mm;  
        color-adjust: exact;  
        print-color-adjust: exact;     
    }
    .main-tbl tfoot tr td {
        background-color: #b8cce4 !important;
        print-color-adjust: exact; 
        color-adjust: exact;  
    }
    .actions {
        display: none !important;
    }
    .page {
        margin: 0;
        border: initial;
        border-radius: initial;
        width: initial;
        min-height: initial;
        box-shadow: initial;
        background: initial;
        page-break-after: always;
    }
}`;

export const putGlobalStylesForPrint = () => {
  const el = document.createElement("style");
  el.innerHTML = PDF_PRINT_GLOBAL_STYLES;
  el.id = "global-print-styles";
  document.body.appendChild(el);
};

export const getTodayDateFormat = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "-" + mm + "-" + yyyy;
  return formattedToday;
};

var a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
var b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
var in_types = [
  {
    label: "International Ticket",
    value: "SI/MYS/IT",
    type: "Ticket",
  },
  {
    label: "International Tour",
    value: "SI/MYS/IN",
    type: "Tour",
  },
  {
    label: "Domestic Tour",
    value: "SI/MYS/DOM",
    type: "Tour",
  },
  {
    label: "Domestic Ticket",
    value: "SI/MYS/DT",
    type: "Ticket",
  },
  { label: "Other Services", value: "SI/MYS/OS", type: "Tour" },
];

export const amtInWords = (num) => {
  if ((num = num.toString()).length > 9) return "overflow";
  var n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
};

export const calcTax = (amt, perc) => {
  try {
    const amount = parseInt(amt);
    return Math.ceil((amount * perc) / 100);
  } catch (err) {
    return "";
  }
};

export const formatInvioceTableData = (data) => {
  const passengers = [];
  let total_tour_cost = 0;
  let total_taxable_value = 0;
  let total_amount = 0;
  let total_igst_amount = 0;
  let total_sgst_amount = 0;
  let total_cgst_amount = 0;
  let tax_rate_perc = 18;
  const invoice_t = in_types.filter((t) => t.value === data.type)[0];
  let invoice_type_title = invoice_t.label;
  let invoice_tour_ticket = invoice_t.type;
  if (data && data.passengers && data.passengers.length > 0) {
    data.passengers.forEach((pass) => {
      const { tour_cost, commision, tax_rate, travel_date } = pass;
      if (tour_cost && tax_rate) {
        const obj = { ...pass };
        obj["travel_date"] = dayjs(travel_date).format("MMM-D-YYYY");
        obj["igst_amount"] =
          tax_rate == 18
            ? calcTax(commision, tax_rate)
            : calcTax(tour_cost, tax_rate);
        obj["cgst_amount"] =
          tax_rate == 18
            ? calcTax(commision, tax_rate / 2)
            : calcTax(tour_cost, tax_rate / 2);
        obj["sgst_amount"] =
          tax_rate == 18
            ? calcTax(commision, tax_rate / 2)
            : calcTax(tour_cost, tax_rate / 2);
        obj["sgst_rate"] = tax_rate / 2;
        obj["cgst_rate"] = tax_rate / 2;
        obj["total"] =
          tax_rate == 18 ? obj["igst_amount"] + commision : obj["igst_amount"];
        tax_rate_perc = tax_rate;
        total_tour_cost += tour_cost;
        total_taxable_value += tax_rate == 18 ? commision : tour_cost;
        total_igst_amount += obj["igst_amount"];
        total_sgst_amount += obj["sgst_amount"];
        total_cgst_amount += obj["cgst_amount"];
        total_amount =
          total_amount +
          total_tour_cost +
          obj["igst_amount"] +
          (tax_rate == 18 ? commision : 0);
        passengers.push(obj);
      }
    });
  }
  const finalData = {
    passengers,
    total_tour_cost,
    total_taxable_value,
    total_amount,
    total_igst_amount,
    total_sgst_amount,
    total_cgst_amount,
    tax_rate_perc,
    igst_cgst_rate: tax_rate_perc / 2,
    invoice_type_title,
    invoice_tour_ticket,
  };
  return finalData;
};

// export const removeGlobalStylesForPrint = () => {
//   const el = document.createElement("style");
//   el.innerHTML = PDF_PRINT_GLOBAL_STYLES;
//   el.id = "global-print-styles";
//   document.body.appendChild(el);
// };

export const statesList = [
  {
    label: "Andaman and Nicobar Islands",
    value: "Andaman and Nicobar Islands",
    code: "AN",
  },
  { label: "Andhra Pradesh", value: "Andhra Pradesh", code: "AP" },
  { label: "Arunachal Pradesh", value: "Arunachal Pradesh", code: "AR" },
  { label: "Assam", value: "Assam", code: "AS" },
  { label: "Bihar", value: "Bihar", code: "BR" },
  { label: "Chandigarh", value: "Chandigarh", code: "CG" },
  { label: "Chhattisgarh", value: "Chhattisgarh", code: "CH" },
  {
    label: "Dadra and Nagar Haveli",
    value: "Dadra and Nagar Haveli",
    code: "DN",
  },
  { label: "Daman and Diu", value: "Daman and Diu", code: "DD" },
  { label: "Delhi", value: "Delhi", code: "DL" },
  { label: "Goa", value: "Goa", code: "GA" },
  { label: "Gujarat", value: "Gujarat", code: "GJ" },
  { label: "Haryana", value: "Haryana", code: "HR" },
  { label: "Himachal Pradesh", value: "Himachal Pradesh", code: "HP" },
  { label: "Jammu and Kashmir", value: "Jammu and Kashmir", code: "JK" },
  { label: "Jharkhand", value: "Jharkhand", code: "JH" },
  { label: "Karnataka", value: "Karnataka", code: "KA" },
  { label: "Kerala", value: "Kerala", code: "KL" },
  { label: "Ladakh", value: "Ladakh", code: "LA" },
  { label: "Lakshadweep", value: "Lakshadweep", code: "LD" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh", code: "MP" },
  { label: "Maharashtra", value: "Maharashtra", code: "MH" },
  { label: "Manipur", value: "Manipur", code: "MN" },
  { label: "Meghalaya", value: "Meghalaya", code: "ML" },
  { label: "Mizoram", value: "Mizoram", code: "MZ" },
  { label: "Nagaland", value: "Nagaland", code: "NL" },
  { label: "Odisha", value: "Odisha", code: "OR" },
  { label: "Puducherry", value: "Puducherry", code: "PY" },
  { label: "Punjab", value: "Punjab", code: "PB" },
  { label: "Rajasthan", value: "Rajasthan", code: "RJ" },
  { label: "Sikkim", value: "Sikkim", code: "SK" },
  { label: "Tamil Nadu", value: "Tamil Nadu", code: "TN" },
  { label: "Telangana", value: "Telangana", code: "TS" },
  { label: "Tripura", value: "Tripura", code: "TR" },
  { label: "Uttar Pradesh", value: "Uttar Pradesh", code: "UP" },
  { label: "Uttarakhand", value: "Uttarakhand", code: "UK" },
  { label: "West Bengal", value: "West Bengal", code: "WB" },
];
