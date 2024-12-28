import React from "react";
import { View, Text } from "react-native";





interface SummaryCardProps {
  title: string;
  value: string;
  backgroundColor: string;
  textColor?: string;
  
}
const Summary: React.FC<SummaryCardProps> = ({ title, value, backgroundColor ,textColor = "black"}) => {
  return (

    <View  className="flex-1 p-4 rounded-lg  space-y-4 " style={{ backgroundColor }}>
    <Text className="text-sm  " style={{color:textColor}}>{title}</Text>
    <Text className="text-lg font-bold" style={{color:textColor}}>{value}</Text>
  </View>
  );
};

export default Summary;
