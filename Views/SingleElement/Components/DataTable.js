import React from "react";
import { View, Text } from "react-native";
import { DataTable } from "react-native-paper";
import { styles } from "./DataTableStyle";
const DataTableComponent = ({
  getPaginatedData,
  page,
  nutritionSnapshot,
  ITEMS_PER_PAGE,
  setPage,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dataText}>NutrientData:</Text>
      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
          <DataTable.Title numeric>Unit</DataTable.Title>
          <DataTable.Title numeric>daily %</DataTable.Title>
        </DataTable.Header>
        {getPaginatedData().map((doc, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{doc.name}</DataTable.Cell>
              <DataTable.Cell numeric>{doc.amount}</DataTable.Cell>
              <DataTable.Cell numeric>{doc.unit}</DataTable.Cell>
              <DataTable.Cell numeric>{doc.percentOfDailyNeeds}</DataTable.Cell>
            </DataTable.Row>
          );
        })}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(nutritionSnapshot / ITEMS_PER_PAGE)}
          onPageChange={(page) => setPage(page)}
          style={{ color: "white" }}
          showFastPagination
          label={`${page + 1} of ${Math.ceil(
            nutritionSnapshot.length / ITEMS_PER_PAGE
          )}`}
        />
      </DataTable>
    </View>
  );
};

export default DataTableComponent;
