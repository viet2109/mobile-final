import { LineChart } from "react-native-chart-kit";
import { Dimensions, Text } from "react-native";

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

  //  transactions rong~
  if (!transactions || transactions.length === 0) {
    //
    const emptyChartData = {
      labels: [""], 
      datasets: [{ data: [0] }], 
    };

    return (
      <LineChart
        data={emptyChartData}
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
  }

  // tao label va data tu transaction
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

export default Chart;
