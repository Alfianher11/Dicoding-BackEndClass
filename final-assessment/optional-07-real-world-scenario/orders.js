// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}

// ✅ Variabel penyimpanan orders
let orders = [];

// ✅ Fungsi untuk menambahkan order baru
function addOrder(customerName, items) {
  const id = generateUniqueId();
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  const order = {
    id,
    customerName,
    items,
    totalPrice,
    status: 'Menunggu'
  };

  orders.push(order);
}

// ✅ Fungsi untuk memperbarui status order berdasarkan ID
function updateOrderStatus(orderId, status) {
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
  }
}

// ✅ Fungsi untuk menghitung total revenue dari order yang "Selesai"
function calculateTotalRevenue() {
  return orders
    .filter((order) => order.status === 'Selesai')
    .reduce((total, order) => total + order.totalPrice, 0);
}

// ✅ Fungsi untuk menghapus order berdasarkan ID
function deleteOrder(id) {
  orders = orders.filter((order) => order.id !== id);
}

// Jangan hapus kode di bawah ini!
export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
