import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon, EyeIcon } from "react-native-heroicons/solid";

interface Props {}

function Login(props: Props) {
  const {} = props;

  return (
    <>
    <KeyboardAvoidingView
      
      className="flex-1 bg-white px-6 mt-2"
    >
       {/* Header */}
       <View className="flex-row items-start mt-8 ">
        <TouchableOpacity className="-ml-2">
          <ChevronLeftIcon size={20} color="black" />
        </TouchableOpacity>
        
      </View>
      <View className="mt-8">
      <Text  className="  text-2xl font-bold text-black">
          Log in to Coinpay
        </Text>
      </View>
       {/* Subtitle */}
       <Text className="text-sm text-gray-500 mt-4">
        Enter your registered mobile number to log in.
      </Text>
       {/* Phone Input */}
       <View className="mt-6 ">
        <Text className="text-gr
        
        y-800 font-medium mb-2">Phone</Text>
         <View className="flex-row items-center    py-2">
      {/* country */}
      <View className="flex-row items-center   rounded-md border border-gray-300 h-12 w-24 mr-4 ">
        <Text className="text-lg font-bold  text-green-600 mr-2">+880</Text>
      </View>
      {/* phone input */}
      <TextInput
        placeholder="Mobile number"
        keyboardType="phone-pad"
        className="flex-1 text-gray-800 border border-gray-300 h-12 rounded-md "
      />
    </View>
        
      </View>

           {/* Password Input */}
      <View className="mt-4">
        <Text className="text-gray-800 font-medium mb-2">Password</Text>
        <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2">
          <EyeIcon size={20} color="gray" />
          <TextInput
            placeholder="••••••••"
            secureTextEntry={true}
            className="flex-1 ml-3 text-gray-800"
          />
        </View>
        <TouchableOpacity className="mt-2">
          <Text className="text-sm text-blue-500">Forgot password?</Text>
        </TouchableOpacity>
      </View>
        

         {/* Login Button */}
      <TouchableOpacity className="mt-6 bg-gray-300 rounded-full py-3">
        <Text className="text-center text-white font-semibold">Log in</Text>
      </TouchableOpacity>
    
      </KeyboardAvoidingView>
    </>
  );
}

export default Login;