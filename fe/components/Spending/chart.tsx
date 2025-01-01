import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, Text, View, StyleSheet } from "react-native";

interface TransactionItem {
  id: string;
  amount: number;
  transactionDate: string;
}

interface ChartProps {
  transactions: TransactionItem[];
}

const Chart: React.FC<ChartProps> = ({ transactions }) => {
  const screenWidth = Dimensions.get("window").width;

  // Kiểm tra nếu transactions rỗng
  if (!transactions || transactions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Không có dữ liệu giao dịch!!!</Text>
      </View>
    );
  }

  // Tạo label và data từ transactions
  const labels = transactions.map((transaction) => {
    const [day, month, year] = transaction.transactionDate.split(" ");
    return `${day}-${year}`;
  });

  const data = transactions.map((transaction) => transaction.amount);

  const chartData = {
    labels,
    datasets: [{ data }],
  };

  return (
    <LineChart
      data={chartData}
      width={screenWidth - 30}
      height={200}
      chartConfig={{
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      style={{
        borderRadius: 10,
        marginBottom: 20,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
});

export default Chart;