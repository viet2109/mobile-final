import React from "react";
import { View, Text, TouchableOpacity ,StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface ServiceIconsProps {
  services: { name: string; color: string; icon: string }[];
  selectedService: "Receive" | "Transfer" | "Bill" | "Saving"; // Thêm prop selectedService
  onPress: (serviceName: "Receive" | "Transfer" | "Bill" | "Saving") => void;
}

const Service: React.FC<ServiceIconsProps> = ({ services, selectedService, onPress }) => {
  return (
    <View className="flex-row justify-between mb-6 bg-white rounded-lg p-4">
      {services.map((service, index) => (
        <TouchableOpacity
          key={index}
          className="items-center justify-center w-16 h-16"
          style={{ backgroundColor: `${service.color}20` }}
          onPress={() => onPress(service.name as "Receive" | "Transfer" | "Bill" | "Saving")}
        >
          <View style={styles.container}>
    
      <View style={[styles.background, { backgroundColor: service.color, opacity: 0.2 }]} />
     
      <View style={styles.iconContainer}>
        <Icon name={service.icon} size={24} color={service.color} />
      </View>
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
const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", 
    position: "relative", 
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute", 
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Service;