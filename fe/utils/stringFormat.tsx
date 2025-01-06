// Hàm xử lý hiển thị số tài khoản
export const maskAndFormatAccountNumber = (accountNumber: string) => {
  // Tách 3 ký tự cuối cùng
  const lastThree = accountNumber.slice(-3);

  // Lấy phần trước 3 ký tự cuối cùng
  const maskedPart = accountNumber
    .slice(0, -3) // Lấy phần đầu
    .replace(/\d/g, "*"); // Thay toàn bộ số bằng dấu *

  // Định dạng để thêm dấu cách cách hàng ngàn
  const formattedMaskedPart = maskedPart.replace(/\B(?=(\*{3})+(?!\*))/g, " ");

  // Ghép phần ẩn đã định dạng và 3 ký tự cuối
  const formattedNumber = formattedMaskedPart.concat(" ", lastThree);

  return formattedNumber.trim(); // Đảm bảo không có khoảng trống thừa
};

// Hàm định dạng lại số tiền
export const formatNumber = (value: number): string => {
  return value.toLocaleString("vi-VN", {
    minimumFractionDigits: 0, // Không bắt buộc phải có chữ số thập phân
    maximumFractionDigits: 2, // Tối đa 2 chữ số thập phân
  });
};


type ExchangeRate = {
  [currencyCode: string]: number;
};

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ExchangeRate = exchangeRates
): number | null => {
  if (!rates[fromCurrency] || !rates[toCurrency]) {
    console.error("Invalid currency code or missing exchange rate.");
    return null;
  }

  // Quy đổi về giá trị cơ sở (base currency)
  const baseAmount = amount / rates[fromCurrency];
  // Quy đổi từ giá trị cơ sở sang tiền tệ đích
  const convertedAmount = baseAmount * rates[toCurrency];
  return convertedAmount;
};

const exchangeRates: ExchangeRate = {
  USD: 1, // Tiền tệ cơ sở là USD
  EUR: 0.85, // 1 USD = 0.85 EUR
  JPY: 110.53, // 1 USD = 110.53 JPY
  VND: 23500, // 1 USD = 23,500 VND
};
