enum OrderStatus {
  pendingPick,    // Chờ nhặt hàng
  pendingDelivery,// Chờ giao
  shipping,
  completed,      // Hoàn thành
  cancelled,
}

enum PartStatus {
  pending,
  picked,
  error,
}

enum OrderPriority {
  standard,
  urgent,
}

enum CustomerType {
  b2b,
  b2c,
}
