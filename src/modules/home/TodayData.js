import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const TodayData = ({ data }) => {
  return Array.isArray(data) && data.length > 0 ? (
    <Box>
      <Typography
        variant="subtitle2"
        fontWeight={500}
        fontSize={15}
        color="text.secondary"
      >
        Today Invoices
      </Typography>
      <Stack
        sx={{ mt: 2, mb: 4 }}
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"flex-start"}
      >
        {Array.isArray(data) &&
          data.map(
            ({ customer_name, invoice_no, type, mode, customer_state, id }) => (
              <Box sx={{ boxSizing: "border-box", mr: 2 }}>
                <Card
                  variant="outlined"
                  sx={{ maxWidth: 250, minWidth: 250, mb: 2 }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {invoice_no} {type}
                    </Typography>
                    <Tooltip title={customer_name}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {customer_name}
                      </Typography>
                    </Tooltip>

                    <Typography sx={{ mb: 1 }} color="text.secondary">
                      {mode}
                    </Typography>
                    <Typography variant="body2">{customer_state}</Typography>
                  </CardContent>
                  <CardActions sx={{ marginTop: "-13px" }}>
                    <Button
                      component={Link}
                      to={`/invoice?id=${id}&view=doc`}
                      size="small"
                    >
                      View Invoice
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            )
          )}
      </Stack>
    </Box>
  ) : (
    <div />
  );
};
export default TodayData;
