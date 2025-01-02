import Material from "@expo/vector-icons/MaterialIcons";

import React, { useCallback, useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import Summary from "../../../components/Spending/sumarry";
import Chart from "../../../components/Spending/chart";

import Header from "../../../components/Spending/header";
import Selector from "../../../components/Spending/selector";
import { Dimensions, ScrollView } from "react-native";
import { View } from "react-native";

import Service from "../../../components/Spending/service";
import { FlatList ,Text} from "react-native";
import SpendingItem from "../../../components/Spending/spendingList";
import TransactionService from "../../../service/transactionService";

interface TransactionItem {
  id: string;
  username: string;
  transactionDate: string;
  amount: number;
  status: string;
  type: string;
  icon: string;
}
const Spending: React.FC = () => {
 
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedService, setSelectedService] = useState<"Spending" | "Income" | "Bills" | "Savings">("Spending");
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0); 

  const [loading, setLoading] = useState(true);

    // loc giao dich theo month
  const filterTransactionsByMonth = (transactions: TransactionItem[], month: string) => {
    return transactions.filter((item) => {
     
      return item.transactionDate.includes(month);
    });
  };
 
  // tinh tong tien cac giao dich
  const calculateTotalAmount = (transactions: TransactionItem[]) => {
    return transactions.reduce((total, item) => total + item.amount, 0);
  };
 
    const fetchTransactions = async (type: string) => {
      try {
        const data = await TransactionService.getTransactionsByType(type);
        setTransactions(data);
       
        // loc giao dich theo thang duoc chon
      const filtered = filterTransactionsByMonth(data, selectedMonth);
      setFilteredTransactions(filtered);

      // tong tien da loc
      const total = calculateTotalAmount(filtered);
      setTotalAmount(total);  


      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

 
    // goi lai API khi serivce thay doi
   useEffect(() => {
    fetchTransactions(selectedService.toUpperCase());
  }, [selectedService]);

    // loc lai giao dich khi selectedMonthj thay doi
  useEffect(() => {
    if (transactions.length > 0) {
      const filtered = filterTransactionsByMonth(transactions, selectedMonth);
      setFilteredTransactions(filtered);

      // tong amount da loc
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
      <Header title={"Spending"} />
      <Selector  selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />

      <View className="flex-row justify-between gap-4 mb-6">
        <Summary   title="Total "  value={`$${totalAmount.toFixed(2)}`} backgroundColor="#304FFE"     textColor="white" 
 />
        <Summary title="Available Balance" value="$20,000.00" backgroundColor="#ffd700"  textColor="black" />
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
  }

  export default Spending;

function setSelectedService(serviceName: string) {
  throw new Error("Function not implemented.");
}
