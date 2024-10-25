import HomeScreen from "../screens/HomeScreen";
import SecondScreen from "../screens/DetailsScreen";
import { ScreenStackConfigs } from "../types";
import DetailsScreen from "../screens/DetailsScreen";

export const screenNames = {
  home: "Home",
  details: "Details",
};

const screensConfig: ScreenStackConfigs[] = [
  {
    name: screenNames.home,
    component: HomeScreen,
  },

  {
    name: screenNames.details,
    component: DetailsScreen,
  },
];

export default screensConfig;
