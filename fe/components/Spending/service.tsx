import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface ServiceIconsProps {
  services: { name: string; color: string; icon: string }[];
  selectedService: "Spending" | "Income" | "Bills" | "Savings"; // Thêm prop selectedService
  onPress: (serviceName: "Spending" | "Income" | "Bills" | "Savings") => void;
}

const Service: React.FC<ServiceIconsProps> = ({ services, selectedService, onPress }) => {
  return (
    <View className="flex-row justify-between mb-6 bg-white rounded-lg p-4">
      {services.map((service, index) => (
        <TouchableOpacity
          key={index}
          className="items-center justify-center w-16 h-16"
          style={{ backgroundColor: `${service.color}20` }}
          onPress={() => onPress(service.name as "Spending" | "Income" | "Bills" | "Savings")}
        >
          <View
            className="w-10 h-10 rounded-full justify-center items-center"
            style={{ backgroundColor: `${service.color}20` }}
          >
            <Icon name={service.icon} size={24} color={service.color} />
          </View>
          <Text className="text-sm mt-2">{service.name}</Text>
          {/* Hiển thị chấm nhỏ nếu service đang được chọn */}
          {selectedService === service.name && (
            <View
              style={{
                position: "relative",
                top: 0,
                right: 0,
                width: 5,
                height: 5,
                borderRadius: 4,
                backgroundColor: service.color,
              }}
            />
          )}
          
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Service;