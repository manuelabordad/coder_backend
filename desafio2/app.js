const Contenedor = require("./contenedor.js");

const instancia = new Contenedor("./products.json");

async function saveProduct() {
	await instancia.save({
		title: "red velvet cookies ",
		price: 10000,
		thumbnail: "...",
	});
}
saveProduct();
console.log(instancia.getAll());
