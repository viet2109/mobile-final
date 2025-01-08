import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import HeaderBack from "../../../components/HeaderBack";
import Summary from "../../../components/Spending/sumarry";
import Chart from "../../../components/Spending/chart";
import Selector from "../../../components/Spending/selector";
import Service from "../../../components/Spending/service";
import SpendingItem from "../../../components/Spending/spendingList";
import TransactionService from "../../../service/transactionService";
import { TransactionItem } from "../../../types";
import { formatNumber } from "../../../utils/stringFormat";
import { useGlobalSearchParams } from "expo-router";

const Spending: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<
    "Receive" | "Transfer" | "Bill" | "Saving"
  >("Receive");
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionItem[]
  >([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { tab } = useGlobalSearchParams();

  const filterTransactionsByMonth = (
    transactions: TransactionItem[],
    month: string
  ) => {
    return transactions.filter((item) => item.transactionDate.includes(month));
  };

  useEffect(() => {
    if (tab) {
      const serviceMap: { [key: string]: "Receive" | "Transfer" | "Bill" | "Saving" } = {
        Spending: "Receive",
        Income: "Transfer",
        Bills: "Bill",
        Savings: "Saving",
      };
      if (typeof tab === 'string') {
        setSelectedService(serviceMap[tab]);
      }
    }
  }, [tab]);

  const calculateTotalAmount = (transactions: TransactionItem[]) => {
    console.log(tab)
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

  const handleServicePress = (
    serviceName: "Receive" | "Transfer" | "Bill" | "Saving"
  ) => {
    setSelectedService(serviceName);
  };

  const services = [
    { name: "Receive", color: "blue", icon: "wallet" },
    { name: "Transfer", color: "green", icon: "cash" },
    { name: "Bill", color: "red", icon: "document" },
    { name: "Saving", color: "orange", icon: "server" },
  ];

  return (
    <SafeAreaView className="flex-1 p-4">
      <ScrollView>
        <HeaderBack title={"Spending"} />
        <Selector
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />

        <View className="flex-row justify-between gap-4 mb-6">
          <Summary
            title="Total "
            value={formatNumber(totalAmount)}
            backgroundColor="#304FFE"
            textColor="white"
          />
          <Summary
            title="Available Balance"
            value={formatNumber(2000000)}
            backgroundColor="#ffd700"
            textColor="black"
          />
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="#1E90FF" className="mb-4"/>
        ) : (
          <Chart transactions={filteredTransactions} />
        )}

        <Service
          services={services}
          selectedService={selectedService}
          onPress={handleServicePress}
        />
        <Text className="text-lg font-bold mb-4">{selectedService} List</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#1E90FF" />
        ) : filteredTransactions.length === 0 ? (
          <Text className="text-center text-gray-500">
            Không có giao dịch nào!!!
          </Text>
        ) : (
          <FlatList
            data={filteredTransactions}
            renderItem={({ item }) => <SpendingItem {...item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
        <View className="mb-24"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Spending;
