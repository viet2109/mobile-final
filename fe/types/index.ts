export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type Feature = {
  iconName:
    | "bedtime"
    | "person"
    | "account-balance"
    | "payments"
    | "settings"
    | "storage"
    | "logout";
  iconColor: string;
  title: string;
  action: JSX.Element;
  onClick?: () => void;
};

export interface ChatHistory {
  role: string;
  content: string;
}

export interface User {
  avatar: string | null;
  email: string;
  id: number;
  username: string | null;
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
  recipient: string;
}
export interface TransferRequestDto {
  sender: string;
  recipient: string;
  amount: string;
  type?: string;
  description: string;
}

export interface TransferRequesponseDto {
  sender: Account;
  recipient: Account;
  amount: string;
  type?: string;
  description: string;
}

export interface Transaction {
 account:Account;
 id: string;
 username: string;
 transactionDate: string;
 amount: number;
 status: string;
 type: string;
 icon: string;
}

export interface Account {
  id?: number; // `id` có thể là undefined nếu chưa được tạo
  user: User; // Tham chiếu đến đối tượng `UserEntity`
  accountNumber?: string; // Số tài khoản
  balance?: string; // Dấu thời gian (có thể là dạng chuỗi ISO)
  currency?: string; // Loại tiền tệ
}