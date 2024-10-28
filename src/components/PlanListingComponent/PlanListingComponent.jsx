import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export default function PlanListingComponent({ planRegistrationData }) {
const columns = [
    { field: "referralCode", headerName: "Referral Code", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "varient", headerName: "Varient", flex: 1 },
    { field: "planType", headerName: "Plan Type", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "ttl", headerName: "TTL", flex: 1 },
];

  const rows = planRegistrationData
    ? planRegistrationData.map((plan, index) => {
        return {
          id: index + 1,
          referralCode: plan.referralCode,
          name: plan.name,
          varient: plan.varient,
          planType: plan.planType,
          price: plan.price,
          ttl: plan.ttl,
        };
      })
    : [];

  const paginationModel = {
    page: 0,
    pageSize: 5,
  };
return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <Paper sx={{ height: 900, width: "80%" }}>
            <DataGrid
                id="plan-registration-listing"
                rows={rows}
                columns={columns}
                pageSize={paginationModel.pageSize}
                rowsPerPageOptions={[5, 10, 20]}
                pagination
                page={paginationModel.page}
                rowCount={planRegistrationData?.length}
                onCellClick={() => {}}
            />
        </Paper>
    </div>
);
}
