import React from "react";
import { View, Text, Image } from "react-native";

interface SpendingItemProps {



  id?: string; 
  username: string; 
  transactionDate: string; 
  amount: number;
  status: string; 
  type: string; 
  icon : string

}

const SpendingItem: React.FC<SpendingItemProps> = ({ id, username, transactionDate, amount, icon }) => (
  <View className="flex-row items-center p-4 bg-white rounded-xl shadow mb-4">
    <Image source={{ uri: icon }} className="w-10 h-10 rounded-full mr-4" />
    <View className="flex-1">
      <Text className="text-base font-semibold">{username}</Text>
      <Text className="text-sm text-gray-500">{transactionDate}</Text>
    </View>
    <Text className="text-base font-bold text-red-500">${amount.toFixed(2)}</Text>
  </View>
);

export default SpendingItem;
