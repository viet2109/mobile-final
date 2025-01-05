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

export interface User {
  avatar: string | null;
  email: string;
  id: number;
  name: string | null;
  phone: string | null;
}

export interface TransactionItem {
  id: string;
  username: string;
  transactionDate: string;
  amount: number;
  status: string;
  type: string;
  icon: string;
}
