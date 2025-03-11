module.exports = (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Devuelve la lista de pedidos
  res.status(200).json(orders);
};
