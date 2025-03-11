// Almacenamiento temporal en memoria (usa una DB en producción)
let orders = [];

module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verifica la clave de autorización
  const authHeader = req.headers.authorization;
  if (authHeader !== "kQ6vefGxDHlDGJDplJ") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const order = req.body;

  // Evita duplicados revisando el ID
  if (!orders.some((o) => o.id === order.id)) {
    orders.push(order);
  }

  // Responde en menos de 15 segundos
  res.status(200).json({ message: "Order received" });
};
