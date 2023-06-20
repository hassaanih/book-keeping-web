var enums = {};

enums.QUOTATION_STATUS = [
  { name: "Pending", value: "1" },
  { name: "Assign To Sales", value: "2" },
  { name: "Assign To Kitchen", value: "3" },
  { name: "Send For Payment", value: "4" },
  { name: "Completed", value: "5" },
  { name: "Cancelled", value: "6" },
];

enums.USER_TYPE = [
  { value: "1", name: "sales" },
  { value: "2", name: "super_admin" },
  { value: "3", name: "customer" },
  { value: "4", name: "kitchen" },
];

enums.DELIVERY_METHOD = [
  { name: "Pick-up", value: "1" },
  { name: "Delivery", value: "2" },
];

enums.EVENTS = [
  { name: "Wedding", value: "1" },
  { name: "Corporate", value: "2" },
  { name: "Ramdan", value: "3" },
  { name: "Celeberation", value: "4" },
];

enums.ORDER_STATUS = [
  { name: "Pending", value: "1" },
  { name: "In-Progress", value: "2" },
  { name: "Delivered", value: "3" },
  { name: "Cancelled", value: "4" },
];

enums.ORDER_PAYMENT = [
  { name: "Pending", value: "1" },
  { name: "Partially Paid", value: "2" },
  { name: "Fully Paid", value: "3" },
];

enums.PAYMENT_TYPE = [
  { name: "Full Payment", value: "1" },
  { name: "Advance Payment (90%)", value: "2" },
];

enums.PAYMENT_METHOD = [
  { name: "Alfa Pay", value: "1" },
  { name: "Bank Transfer", value: "2" },
  { name: "Cash", value: "3" },
];

enums.COUPON_TYPE = [
  { name: "Percent", value: 1 },
  { name: "Fixed", value: 2 },
];

enums.SPICE_LEVEL = [
  { id: 1, name: "Low" },
  { id: 2, name: "Medium" },
  { id: 3, name: "High" },
];
