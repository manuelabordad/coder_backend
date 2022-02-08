const http = require("http");
const Contenedor = require("./contenedor");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const instancia = new Contenedor("./productos.json");

async function saveProduct() {
	await instancia.save({
		title: "cupcakes",
		price: 9000,
		thumbnail: "...",
	});
}
saveProduct();
app.get("/productos", async (req, res) => {
	const all = await instancia.getAll();
	res.send(all);
});
app.get("/productoRandom", async (req, res) => {
	console.log("entro");
	const all = await instancia.getAll();
	const randomProduct = all[Math.floor(Math.random() * (all.length - 0) + 0)];
	res.send(randomProduct);
});

app.listen(PORT, () =>
	console.log(`server is running on http://localhost:${PORT}`)
);
