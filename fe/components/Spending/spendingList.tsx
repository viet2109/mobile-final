import React from "react";
import { View, Text, Image } from "react-native";
import { formatNumber } from "../../utils/stringFormat";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface SpendingItemProps {



  id?: string; 
  username: string; 
  transactionDate: string; 
  amount: number;
  status: string; 
  type: string; 
  icon : string;
  recipient: string;

}

const SpendingItem: React.FC<SpendingItemProps> = ({ id, username, transactionDate, amount, icon , type, recipient}) => {
  const userName = type === "RECEIVE" ? username : recipient;
  return (
  
    <View className="flex-row items-center p-4 bg-white rounded-xl shadow mb-4">
      <FontAwesome6 name="money-bill-transfer" size={24} color="#1E90FF" />
      <View className="flex-1 ml-2">
        <Text className="text-base font-semibold">{userName.split("@")[0]}</Text>
        <Text className="text-sm text-gray-500">{transactionDate}</Text>
      </View>
      <Text className={`text-base font-bold ${type === "TRANSFER" ? "text-red-500":"text-green-500"}`}>{formatNumber(amount)}</Text>
    </View>
  );
}

export default SpendingItem;
