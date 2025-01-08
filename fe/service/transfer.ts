import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction, TransferRequesponseDto, TransferRequestDto } from "../types";
import { baseAxios } from "./configAxios";

export const sendTransferRequest = async (tranfer: TransferRequestDto) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    const response = await baseAxios.post("/transactions/send", tranfer, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Xử lý kết quả nếu API trả về thành công
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw error;
  }
};
export interface TransferFilter {
  accountId?: number;
  isDistinctReceiveAccount?: boolean;
  sort?: string[];
}

export const getTransfer = async (
  filter: TransferFilter
): Promise<TransferRequesponseDto[]> => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    const response = await baseAxios.get("/transactions", {
      params: { ...filter },
      paramsSerializer: {
        indexes: null,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Xử lý kết quả nếu API trả về thành công

    return response.data;
  } catch (error) {
    // Xử lý lỗi
    console.error("Transfer failed:", error);
    return [];
  }
};
