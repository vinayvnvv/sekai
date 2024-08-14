import React, { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import { getAllInvoice } from "../../firebase";
import EventIcon from "@mui/icons-material/Event";
import {
  formatINR,
  getTopVisitedPlaces,
  groupDataByYearAndMonth,
  sortAndEnhanceMonths,
} from "../invoice/pdf/utils";
import {
  alpha,
  Box,
  Card,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";

const Stats = ({ stat, small }) => {
  const { commision, tour_cost, no_of_passengers, destination } = stat;
  const topPlaces = getTopVisitedPlaces(destination, 2);
  const variant = small ? "caption" : "subtitle1";
  return (
    <Stack mt={2}>
      <Typography variant={variant}>
        {!small && `Total `}
        <Typography fontWeight={600} variant={variant} display={"inline"}>
          {formatINR(tour_cost)}
        </Typography>{" "}
        tour cost's
      </Typography>
      <Typography variant={variant}>
        {!small && `Total `}
        <Typography variant={variant} fontWeight={600} display={"inline"}>
          {formatINR(commision)}
        </Typography>{" "}
        commission's
      </Typography>
      <Typography variant={variant}>
        {!small && `Total `}
        <Typography variant={variant} fontWeight={600} display={"inline"}>
          {no_of_passengers}
        </Typography>{" "}
        people's travelled
      </Typography>
      <Stack
        mt={1}
        component={small ? Card : "div"}
        variant="outlined"
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        p={small ? 1 : 0}
      >
        <Typography variant={variant}>Most Visited</Typography>
        <Stack direction={"row"} alignItems={"center"} flexWrap={"wrap"}>
          {topPlaces.map((place) => (
            <Chip
              size="small"
              label={place}
              sx={{ marginBottom: "3px", marginRight: "3px" }}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

function Dashoboard() {
  const [data, setData] = useState({});
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const getAllData = async () => {
    try {
      const docs = await getAllInvoice();
      const actualData = docs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const { result, stats } = groupDataByYearAndMonth(actualData);
      setData(result);
      setStats(stats);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);
  const yearKeys = Object.keys(data).reverse();
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <AppHeader />
      <Box sx={{ mt: 3 }}>
        <Container maxWidth="xl">
          {Array.isArray(yearKeys) &&
            yearKeys.length > 0 &&
            yearKeys.map((year) => {
              const monthKeys = Object.keys(data[year]);
              const months = sortAndEnhanceMonths(monthKeys);
              const stat = stats[year];

              return (
                <Card
                  sx={{ backgroundColor: "#fff", mb: 3, p: 3 }}
                  variant="outlined"
                >
                  <Stack spacing={1} direction={"row"}>
                    <Typography
                      component={"span"}
                      display={"inline"}
                      sx={{
                        borderBottom: (theme) =>
                          `3px solid ${theme.palette.primary.main}`,
                      }}
                      variant="h6"
                    >
                      {year}
                    </Typography>
                  </Stack>
                  <Stats stat={stat} />
                  <Stack
                    mt={4}
                    direction={"row"}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                  >
                    {Array.isArray(months) &&
                      months.map((month) => {
                        const monthData = data[year][month.short];
                        const total = monthData.length;
                        const stat = stats[year][month.short];
                        const {
                          commision,
                          tour_cost,
                          no_of_passengers,
                          destination,
                        } = stat;
                        const topPlaces = getTopVisitedPlaces(destination, 2);
                        return (
                          <Card
                            variant="outlined"
                            sx={{
                              p: 2,
                              mb: 2,
                              mr: 2,
                              minWidth: 300,
                              width: 300,
                              maxWidth: 300,
                              minHeight: 130,
                              backgroundColor: () => alpha("#000", 0.01),
                            }}
                          >
                            <Stack
                              direction={"row"}
                              alignItems={"center"}
                              spacing={1}
                            >
                              <EventIcon sx={{ color: "GrayText" }} />
                              <Typography
                                variant="subtitle1"
                                color={"GrayText"}
                              >
                                {month.full}
                              </Typography>
                            </Stack>

                            <Typography fontWeight={400} mt={1}>
                              <Typography
                                display={"inline"}
                                fontWeight={600}
                                sx={{
                                  color: (theme) => theme.palette.primary.main,
                                }}
                              >
                                {total}
                              </Typography>{" "}
                              Invoices's
                            </Typography>
                            <Stats stat={stat} small />
                          </Card>
                        );
                      })}
                  </Stack>
                </Card>
              );
            })}
        </Container>
      </Box>
    </div>
  );
}

export default Dashoboard;
