import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, FlatList, Text } from "react-native";
import HeaderBack from "../../../components/HeaderBack";
import Summary from "../../../components/Spending/sumarry";
import Chart from "../../../components/Spending/chart";
import Selector from "../../../components/Spending/selector";
import Service from "../../../components/Spending/service";
import SpendingItem from "../../../components/Spending/spendingList";
import TransactionService from "../../../service/transactionService";
import { TransactionItem } from "../../../types";

const Spending: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<"Spending" | "Income" | "Bills" | "Savings">("Spending");
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const filterTransactionsByMonth = (transactions: TransactionItem[], month: string) => {
    return transactions.filter((item) => item.transactionDate.includes(month));
  };

  const calculateTotalAmount = (transactions: TransactionItem[]) => {
    return transactions.reduce((total, item) => total + item.amount, 0);
  };

  const fetchTransactions = async (type: string) => {
    setLoading(true);
    try {
      const data = await TransactionService.getTransactionsByType(type);
      setTransactions(data);

      const filtered = filterTransactionsByMonth(data, selectedMonth);
      setFilteredTransactions(filtered);

      const total = calculateTotalAmount(filtered);
      setTotalAmount(total);
    } catch (error) {
      console.log("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(selectedService.toUpperCase());
  }, [selectedService]);

  useEffect(() => {
    if (transactions.length > 0) {
      const filtered = filterTransactionsByMonth(transactions, selectedMonth);
      setFilteredTransactions(filtered);

      const total = calculateTotalAmount(filtered);
      setTotalAmount(total);
    }
  }, [selectedMonth]);

  const handleServicePress = (serviceName: "Spending" | "Income" | "Bills" | "Savings") => {
    setSelectedService(serviceName);
  };

  const services = [
    { name: "Spending", color: "blue", icon: "wallet" },
    { name: "Income", color: "green", icon: "cash" },
    { name: "Bills", color: "red", icon: "document" },
    { name: "Savings", color: "orange", icon: "server" },
  ];

  return (
    <SafeAreaView className="flex-1 p-4">
      <ScrollView>
        <HeaderBack title={"Spending"} />
        <Selector selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />

        <View className="flex-row justify-between gap-4 mb-6">
          <Summary title="Total " value={`$${totalAmount.toFixed(2)}`} backgroundColor="#304FFE" textColor="white" />
          <Summary title="Available Balance" value="$20,000.00" backgroundColor="#ffd700" textColor="black" />
        </View>
        <Chart transactions={filteredTransactions} />

        <Service services={services} selectedService={selectedService} onPress={handleServicePress} />
        <Text className="text-lg font-bold mb-4">{selectedService} List</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : filteredTransactions.length === 0 ? (
          <Text className="text-center text-gray-500">Không có giao dịch nào!!!</Text>
        ) : (
          <FlatList
            data={filteredTransactions}
            renderItem={({ item }) => <SpendingItem {...item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Spending;