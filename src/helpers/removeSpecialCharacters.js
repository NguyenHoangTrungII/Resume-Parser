function removeSpecialCharacters(str) {
     // Sử dụng match để tìm các ký tự không phải chữ cái, số, dấu cách, dấu phẩy và dấu chấm
     const matches = str.match(/[^\w\s,.-]/g);
    
     // Nếu không tìm thấy ký tự đặc biệt, trả về chuỗi gốc
     if (!matches) {
         return str;
     }
     
     // Loại bỏ các ký tự đặc biệt khỏi chuỗi
     const cleanedStr = str.replace(/[^\w\s,.-]/g, '');
 
     return cleanedStr;
}

export default removeSpecialCharacters;
