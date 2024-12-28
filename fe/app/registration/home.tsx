import { useRouter } from "expo-router";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";

const Registration = () => {
  const router = useRouter();
  return (
    <View className="display flex flex-col justify-between bg-white flex-1">
      <Image
        source={require("../../assets/images/registration_banner.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Matcha banking is a powerfull tool that allows you to easily send,
            receive, and track all your transactions.
          </Text>
        </View>
        <View className=" w-full items-center mt-10">
          <TouchableOpacity
            className="bg-blue-bg py-3 px-6 rounded-full w-4/5"
            onPress={() => router.push("/registration/create")}
          >
            <Text className="text-white text-lg font-bold text-center ">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <View className=" w-full items-center mt-4 ">
          <TouchableOpacity
            className="py-3 px-6 rounded-full w-4/5 bg-white border border-blue-bg"
            onPress={() => router.push("registration")}
          >
            <Text className="text-blue-bg text-lg font-bold text-center">
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textContainer} className="text-center mx-8 mb-8 ">
        <Text style={styles.subtitle}>By countinue you accept our</Text>
        <Text>
          <Text className="text-blue-bg underline">Terms of Service</Text>
          <Text style={styles.subtitle}> and </Text>
          <Text className="text-blue-bg underline">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "40%",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "gray",
    textAlign: "center",
    marginTop: 4,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Registration;
