const fs = require("fs");

function isEmptyObject(obj) {
	return !Object.keys(obj).length;
}

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
		this.productos = [];
	}

	async getAll() {
		try {
			const objs = await fs.readFile(this.ruta, "utf-8");
			return JSON.parse(objs);
		} catch (error) {
			return [];
		}
	}
	async save(producto) {
		try {
			this.productos = await this.getAll();
			if (isEmptyObject(this.productos)) {
				producto.id = 1;
			} else {
				producto.id = this.productos[this.productos.length - 1].id + 1;
			}
			this.productos.push(producto);
			await fs.promises.writeFile(
				this.ruta,
				JSON.stringify(this.productos, null, 2)
			);
			console.log("producto guardado");
			return producto.id;
		} catch (error) {
			console.log("error", error);
			return null;
		}
	}
	async getById(id) {
		try {
			const productos = await this.getAll();

			return (
				productos.find((producto) => producto.id.toString() === id) || null
			);
		} catch (error) {
			return null;
		}
	}
	async deleteById(id) {
		try {
			const productos = await this.getAll();
			const newArray = productos.filter(
				(producto) => producto.id.toString() !== id
			);

			await fs.promises.writeFile(this.ruta, JSON.stringify(newArray, null, 2));
			return id;
		} catch (error) {
			return null;
		}
	}
	async deleteAll() {
		await fs.promises.writeFile(this.ruta, "[]");
	}
}

module.exports = Contenedor;
