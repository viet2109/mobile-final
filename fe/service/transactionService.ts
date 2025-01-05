import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseAxios } from "./configAxios";
import { TransactionItem } from "../types";

class TransactionService {
  // Hàm lấy danh sách giao dịch theo type
  static async getTransactionsByType(type: string): Promise<TransactionItem[]> {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await baseAxios.get(`/transactions/type/${type.toUpperCase()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}

export default TransactionService;
