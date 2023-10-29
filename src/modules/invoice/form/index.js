import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiField, { MuiDateField, MuiSelectField } from "./MuiField";
import * as Yup from "yup";
import { getTodayDateFormat } from "../pdf/utils";
import Passangers from "./Passengers";
import EastIcon from "@mui/icons-material/East";
import { useSnackbar } from "notistack";
import AppHeader from "../../components/AppHeader";

const FormSchema = Yup.object().shape({
  type: Yup.string().required("Required"),
  invoice_no: Yup.string()
    .required("Required")
    .test(
      "Is positive?",
      "it should be number and must be greater than 0!",
      (value) => value > 0
    ),
  invoice_date: Yup.string().required("Required"),
  po_no: Yup.string(),
  state: Yup.string().required("Required"),
  mode: Yup.string().required("Required"),
  customer_name: Yup.string().required("Required"),
  customer_adress: Yup.string().required("Required"),
  customer_gstin: Yup.string(),
  customer_state: Yup.string().required("Required"),
  passangers: Yup.array(
    Yup.object().shape({
      id: Yup.string(),
      name: Yup.string().required("required"),
      travel_date: Yup.string(),
      no_of_passengers: Yup.string(),
      destination: Yup.string().required("required"),
      tour_cost: Yup.string().required("required"),
      commision: Yup.string().required("required"),
      tax_rate: Yup.string(),
    })
  ),
});

const FormApp = ({ onSubmit, initialData }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <div>
      <AppHeader />
      <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Container maxWidth="xl">
          <Formik
            validationSchema={FormSchema}
            initialValues={initialData}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              // alert(JSON.stringify(values, null, 2));
              const pass = values.passengers
                ? values.passengers.filter((i) => i.touched === true)
                : [];
              if (pass.length === 0) {
                enqueueSnackbar(
                  "Please add atleast one passengers or fill all the information in the passengers row or save the row by clicking the save icon!",
                  {
                    variant: "error",
                    anchorOrigin: { vertical: "top", horizontal: "center" },
                  }
                );
              } else {
                console.log(values);
                onSubmit(values);
              }
            }}
          >
            {({ values, setFieldValue, errors, touched, submitCount }) => (
              <Form>
                <Box>
                  <Stack direction={"row"} spacing={9} sx={{ mt: 3 }}>
                    <Box flexGrow={1}>
                      <Paper variant="outlined">
                        <Typography sx={{ px: 3, py: 2 }}>
                          Invoice Details
                        </Typography>
                        <Divider />
                        <Box sx={{ p: 2, px: 5 }}>
                          <MuiSelectField
                            label={"Invoice Type"}
                            submitCount={submitCount}
                            errors={errors}
                            capitalize
                            name="type"
                            values={values}
                            options={[
                              {
                                label: "International Ticket (SI/MYS/IT)",
                                value: "SI/MYS/IT",
                              },
                              {
                                label: "International Tour (SI/MYS/IN)",
                                value: "SI/MYS/IN",
                              },
                              {
                                label: "Domestic Tour (SI/MYS/DOM)",
                                value: "SI/MYS/DOM",
                              },
                              {
                                label: "Domestic Ticket (SI/MYS/DT)",
                                value: "SI/MYS/DT",
                              },
                              { label: "Other Services", value: "SI/MYS/OS" },
                            ]}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                          <MuiField
                            label={"Invoice No"}
                            submitCount={submitCount}
                            errors={errors}
                            name="invoice_no"
                            values={values}
                            touched={touched}
                            type={"number"}
                            setFieldValue={setFieldValue}
                          />
                          <MuiDateField
                            label={"Invoice Date"}
                            submitCount={submitCount}
                            errors={errors}
                            name="invoice_date"
                            values={values}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                          {/* <MuiField
                          label={"Invoice Date"}
                          submitCount={submitCount}
                          errors={errors}
                          name="invoice_date"
                          values={values}
                          touched={touched}
                          setFieldValue={setFieldValue}
                        /> */}
                          <MuiField
                            label={"P.O No"}
                            submitCount={submitCount}
                            errors={errors}
                            name="po_no"
                            values={values}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                          <MuiField
                            label={"State"}
                            submitCount={submitCount}
                            errors={errors}
                            name="state"
                            values={values}
                            capitalize
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                          <MuiSelectField
                            label={"Transportation Mode"}
                            submitCount={submitCount}
                            errors={errors}
                            name="mode"
                            values={values}
                            touched={touched}
                            setFieldValue={setFieldValue}
                            options={[
                              {
                                label: "Road",
                                value: "Road",
                              },
                              {
                                label: "Flight",
                                value: "Flight",
                              },
                              {
                                label: "Cruise",
                                value: "Cruise",
                              },
                            ]}
                          />
                        </Box>
                      </Paper>
                    </Box>
                    <Box flexGrow={1}>
                      <Paper variant="outlined">
                        <Typography sx={{ px: 3, py: 2 }}>
                          Billing Customer
                        </Typography>
                        <Divider />
                        <Box sx={{ p: 2, px: 5 }}>
                          <MuiField
                            label={"Name"}
                            submitCount={submitCount}
                            errors={errors}
                            name="customer_name"
                            values={values}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                          <MuiField
                            label={"Address"}
                            submitCount={submitCount}
                            multiline
                            rows={5}
                            errors={errors}
                            name="customer_adress"
                            values={values}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                          <MuiField
                            label={"GSTIN"}
                            submitCount={submitCount}
                            errors={errors}
                            name="customer_gstin"
                            values={values}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                          <MuiField
                            label={"Customer State"}
                            submitCount={submitCount}
                            errors={errors}
                            name="customer_state"
                            values={values}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </Box>
                      </Paper>
                    </Box>
                  </Stack>
                  <Paper variant="outlined" sx={{ mt: 3 }}>
                    <Typography sx={{ px: 3, py: 2 }}>
                      Passangers List
                    </Typography>
                    <Divider />
                    <Box sx={{ p: 2, px: 5 }}>
                      {/* <FieldArray name="passangers">
                      {({ insert, remove, push }) => (
                        <div>
                          {values.passangers.length > 0 &&
                            values.passangers.map((friend, index) => (
                              <div className="row" key={index}>
                                hello
                              </div>
                            ))}
                        </div>
                      )}
                    </FieldArray> */}
                      <Passangers
                        initialRows={values.passengers}
                        setPassengersData={(v) => {
                          setFieldValue("passengers", v);
                        }}
                      />
                    </Box>
                  </Paper>
                </Box>
                <Box sx={{ mt: 2, p: 3 }} variant="outlined">
                  <Stack alignItems={"center"}>
                    <Button
                      size="large"
                      variant="contained"
                      type="submit"
                      endIcon={<EastIcon />}
                    >
                      Create Invoice
                    </Button>
                  </Stack>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
        {/* <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          // alert(JSON.stringify(values, null, 2));
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <MuiField name="name" setFieldValue={setFieldValue} />
            <FieldArray name="friends">
              {({ insert, remove, push }) => (
                <div>
                  {values.friends.length > 0 &&
                    values.friends.map((friend, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`friends.${index}.name`}>Name</label>
                          <Field
                            name={`friends.${index}.name`}
                            component={TextField}
                            placeholder="Jane Doe"
                            onChange={(e) =>
                              setFieldValue(
                                `friends.${index}.name`,
                                e.target.value
                              )
                            }
                            type="text"
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`friends.${index}.email`}>
                            Email
                          </label>
                          <TextField
                            name={`friends.${index}.email`}
                            //   component={TextField}
                            placeholder="jane@acme.com"
                            onChange={(e) =>
                              setFieldValue(
                                `friends.${index}.email`,
                                e.target.value
                              )
                            }
                            type="email"
                          />
                          <ErrorMessage
                            name={`friends.${index}.name`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ name: "", email: "" })}
                  >
                    Add Friend
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit">Invite</button>
          </Form>
        )}
      </Formik> */}
      </Box>
    </div>
  );
};
export default FormApp;
