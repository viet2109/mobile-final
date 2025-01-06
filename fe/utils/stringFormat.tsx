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
