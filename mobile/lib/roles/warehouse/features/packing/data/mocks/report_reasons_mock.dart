class ReportReasonsMock {
  static const List<Map<String, dynamic>> data = [
    {
      "id": "DAMAGED_GOODS",
      "titleKey": "Hư hỏng hàng hóa",
      "subtitleKey": "Sản phẩm bị rách, vỡ hoặc móp méo",
      "iconName": "cube_box"
    },
    {
      "id": "BARCODE_ERROR",
      "titleKey": "Lỗi mã vạch",
      "subtitleKey": "Không thể quét mã vạch trên sản phẩm",
      "iconName": "barcode"
    },
    {
      "id": "OUT_OF_STOCK",
      "titleKey": "Thiếu hàng trong kho",
      "subtitleKey": "Hệ thống báo còn nhưng kho thực tế đã hết",
      "iconName": "question_circle"
    }
  ];
}
