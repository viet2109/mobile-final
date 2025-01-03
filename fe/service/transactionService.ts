import axios from 'axios';

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  icon: string;
}

class TransactionService {
  // Hàm lấy danh sách giao dịch theo type
  static async getTransactionsByType(type: string): Promise<Transaction[]> {
    try {
      const response = await axios.get(`http://192.168.0.107:8082/transactions/type/${type.toUpperCase()}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching transactions:', error.response?.data); // Log thông báo lỗi từ server
      } else {
        console.error('Unexpected error:', error);
      }
      throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
  }
}

export default TransactionService;