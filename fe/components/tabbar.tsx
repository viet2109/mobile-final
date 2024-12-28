import Ant from "@expo/vector-icons/AntDesign";
import Material from "@expo/vector-icons/MaterialIcons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";

type TabIconProps = {
  color?: string;
  size?: number;
  className?: string;
};

function Tabbar(props: BottomTabBarProps) {
  const { state, descriptors, navigation } = props;
  const tabIcon: Record<string, (props: TabIconProps) => JSX.Element> = {
    home: (props) => <Ant name="home" size={28} {...props} />,
    spending: (props) => <Material name="paid" size={28} {...props} />, // Biểu tượng spending
    
    scanner: (props) => (
      <Material name="qr-code-scanner" size={28} {...props} />
    ),
    profile: (props) => <Ant name="user" size={28} {...props} />,
  };

  return (
    <View className="bg-white py-3 flex-row mx-5 rounded-3xl dark:bg-[#2A2A2A] absolute bottom-5">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.title !== undefined
            ? options.title
            : options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center"
          >
            {tabIcon[route.name]({
              className: ` ${
                isFocused
                  ? "!text-blue-500 dark:!text-blue-500"
                  : "dark:!text-white"
              }`,
            })}
            <Text
              className={`text-center dark:text-white text-sm ${
                isFocused ? "!text-blue-500" : ""
              }`}
            >
              {label.toString()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default Tabbar;
