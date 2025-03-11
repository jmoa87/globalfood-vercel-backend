const fetch = require('node-fetch'); // Asegúrate de instalarlo: npm install node-fetch@2

let orders = [];

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (authHeader !== "kQ6vefGxDHlDGJDplJ") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const order = req.body;

  // Almacena localmente (opcional)
  if (!orders.some((o) => o.id === order.id)) {
    orders.push(order);
  }

  // Reenvía el pedido a GloriaFood
  try {
    const response = await fetch('https://pos.globalfoodsoft.com/pos/order/create', {
      method: 'POST',
      headers: {
        'Authorization': 'kQ6vefGxDHlDGJDplJ', // Clave API proporcionada por GloriaFood
        'Content-Type': 'application/json',
        'Glf-Api-Version': '2' // Según la documentación, usa versión 2
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new Error(`GloriaFood API error: ${response.statusText}`);
    }

    res.status(200).json({ message: "Order received and sent to GloriaFood" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send order to GloriaFood" });
  }
};
