import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

const datatableData = [
  ["محمد مطواعی", "27 سال", "تهران", "محصل"],
  ["عرفان جمشیدی", "19 سال", "قم", "طلبه"],
  ["سعید ترابی", "13 سال", "تهران", "دانشجو"],
  ["سینا عزیزی", "22 سال", "تهران", "دانشجو"],
  ["محمد مطواعی", "27 سال", "تهران", "محصل"],
  ["عرفان جمشیدی", "19 سال", "قم", "طلبه"],
  ["سعید ترابی", "13 سال", "تهران", "دانشجو"],
  ["سینا عزیزی", "22 سال", "تهران", "دانشجو"],
  ["محمد مطواعی", "27 سال", "تهران", "محصل"],
  ["عرفان جمشیدی", "19 سال", "قم", "طلبه"],
  ["سعید ترابی", "13 سال", "تهران", "دانشجو"],
  ["سینا عزیزی", "22 سال", "تهران", "دانشجو"],
  ["محمد مطواعی", "27 سال", "تهران", "محصل"],
  ["عرفان جمشیدی", "19 سال", "قم", "طلبه"],
  ["سعید ترابی", "13 سال", "تهران", "دانشجو"],
  ["سینا عزیزی", "22 سال", "تهران", "دانشجو"],
];

export default function Tables() {
  return (
    <>
      <PageTitle title="لیست کاربران" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="لیست مدرسین"
            data={datatableData}
            columns={["نام", "سن", "شهر", "شغل"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding>
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
