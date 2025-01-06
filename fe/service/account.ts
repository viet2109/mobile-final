import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseAxios } from "./configAxios";
import { Account } from "../types";
import { fileMapCacheDirectory } from "../metro.config";

interface AccountFilter {
  userId?: number;
  accountNumber?: string;
  userName?: string;
}
export const getAccountsByQueries = async (
  filter: AccountFilter
): Promise<Account[]> => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      console.error("Auth token not found");
      return []; // Trả về mảng rỗng nếu không có token
    }

    const response = await baseAxios.get("/accounts", {
      params: {
        userId: filter.userId,
        accountNumber: filter.accountNumber,
        userName: filter.userName,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Xử lý thành công
    console.log("Accounts fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    // Xử lý lỗi và ném lại nếu cần
    console.error("Failed to fetch accounts:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};
