export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type Feature = {
  iconName: "bedtime" | "person" | "account-balance" | "payments" | "settings" | "storage" | "logout";
  iconColor: string;
  title: string;
  action: JSX.Element;
  onClick?: () => void;
}

export interface ChatHistory {
  role: string;
  content: string;
}
