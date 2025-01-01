import React from "react";
import Material from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, Text, View} from "react-native";
import { useRouter } from "expo-router";

import { Picker } from "@react-native-picker/picker";


interface MonthPickerProps {
  selectedMonth : string ;
  onMonthChange: (month: string) => void;

}




const Selector: React.FC<MonthPickerProps> = ({ selectedMonth, onMonthChange }) => {

  
    return (
      
      <View className="mb-6 w-1/2 h-10 bg-blue-200 rounded-lg">
       
       <Picker
          selectedValue={selectedMonth}
          style={{ padding:0,marginTop:-10 }}
          onValueChange={(itemValue) => {
            console.log("Selected Month:", itemValue); // In ra console để kiểm tra
            onMonthChange(itemValue);
          }}
        >
          <Picker.Item label="January" value="Jan" />
          <Picker.Item label="February" value="Feb"  />
          <Picker.Item label="March" value="Mar" />
          <Picker.Item label="April" value="Ap" />
          <Picker.Item label="May" value="May" />
          <Picker.Item label="June" value="Jun" />
          <Picker.Item label="July" value="Jul" />
          <Picker.Item label="August" value="Aug" />
          <Picker.Item label="September" value="Sep" />
          <Picker.Item label="October" value="Oct" />
          <Picker.Item label="November " value="Nov" />

          <Picker.Item label="December " value="Dec " />
          </Picker>


      </View>
    );
  };
  
  export default Selector;