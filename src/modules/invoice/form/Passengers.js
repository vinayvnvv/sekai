import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridEditInputCell,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const validateCell = (params) => {
  const error = params.props.value
    ? params.props.value.toString().length === 0
    : true;
  return { ...params.props, error: error ? "required" : false };
};

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

function NameEditInputCell(props) {
  const { error } = props;

  return (
    <StyledTooltip open={!!error} title={error}>
      <GridEditInputCell {...props} />
    </StyledTooltip>
  );
}

function renderEditCell(params) {
  return <NameEditInputCell {...params} />;
}

const StyledTableBox = styled(Box)(({ theme }) => ({
  height: 400,
  width: "100%",
  "& .MuiDataGrid-cell--editable": {
    // backgroundColor:
    //   theme.palette.mode === "dark" ? "#376331" : "rgb(217 243 190)",
    "& .MuiInputBase-root": {
      height: "100%",
    },
  },
  "& .Mui-error": {
    backgroundColor: `rgb(126,10,15, ${
      theme.palette.mode === "dark" ? 0 : 0.1
    })`,
    color: theme.palette.mode === "dark" ? "#ff4343" : "#750f0f",
  },
}));

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = new Date().toISOString();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: "",
        destination: "",
        touched: false,
        tour_cost: "",
        commision: "",
        hsn_Code: "",
        no_of_passengers: 1,
        tax_rate: 18,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        size="small"
        variant={"text"}
        sx={{ m: 1 }}
        disableElevation
        color="info"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        <Typography variant="subtitle2" textTransform={"none"}>
          Add Passanger
        </Typography>
      </Button>
    </GridToolbarContainer>
  );
}

const Passangers = ({ setPassengersData, initialRows }) => {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    let touched = false;
    touched =
      newRow.destination && newRow.name && newRow.tour_cost ? true : false;
    const updatedRow = { ...newRow, isNew: false, touched };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 20,
      editable: true,
      renderEditCell: renderEditCell,
      preProcessEditCellProps: validateCell,
    },
    {
      field: "no_of_passengers",
      headerName: "No Of Passengers",
      flex: 15,
      sort: false,
      editable: true,
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 25,
      editable: true,
      renderEditCell: renderEditCell,
      preProcessEditCellProps: validateCell,
      // type: "singleSelect",
      // getOptionValue: (v) => v.value,
      // getOptionLabel: (v) => v.label,
      // valueOptions: [{ label: "vinay", value: "123" }],
    },
    {
      field: "travel_date",
      headerName: "Travel Date",
      flex: 15,
      type: "date",
      editable: true,
      // renderEditCell: renderEditCell,
      preProcessEditCellProps: validateCell,
    },
    {
      field: "tour_cost",
      headerName: "Tour Cost",
      type: "number",
      flex: 15,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: renderEditCell,
      preProcessEditCellProps: validateCell,
    },
    {
      field: "commision",
      headerName: "Commission",
      type: "number",
      flex: 10,
      align: "left",
      headerAlign: "left",
      editable: true,
      // renderEditCell: renderEditCell,
      // preProcessEditCellProps: validateCell,
    },
    {
      field: "tax_rate",
      headerName: "Tax Rate",
      //   type: "number",
      flex: 15,
      align: "left",
      headerAlign: "left",
      editable: true,
      type: "singleSelect",
      getOptionLabel: (v) => v + "%",
      valueOptions: ["18", "5"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      //   flex: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // console.log("rows", rows);

  React.useEffect(() => {
    setPassengersData(rows);
  }, [rows]);

  return (
    <StyledTableBox
      sx={{
        height: 400,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        rowSelection={false}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: {
            setRows,
            setRowModesModel,
          },
        }}
      />
    </StyledTableBox>
  );
};
export default Passangers;
