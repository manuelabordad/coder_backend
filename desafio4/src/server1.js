const express = require("express");
const router = express.Router();
const Contenedor = require("./contenedor");
const app = express();
const port = 8082;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", router);
app.listen(port, () => {
	console.log("server activo en http://localhost:" + port);
});

const contenedor = new Contenedor("./productos.json");

router.get("/", async (req, res) => {
	const todos = await contenedor.getAll();

	res.send(todos);
});
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const byId = await contenedor.getById(id);
	console.log("id", id);
	console.log("byId", byId);
	res.send(byId);
});

router.post("/", async (req, res) => {
	const { body } = req;

	await contenedor.save(body);

	res.redirect("/");
});
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const borrado = await contenedor.deleteById(id);

		if (borrado) {
			res.status(200).json({ productoBorrado: borrado });
		} else {
			res.send("El producto que se intenta borrar no existe.");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.put("/:id", async (req, res) => {
	const {
		body,
		params: { id },
	} = req;

	const anterior = await contenedor.getById(id);

	const nuevo = await contenedor.updateById(id, body);

	if (anterior) {
		res.send({ anterior, nuevo });
	} else {
		res.send("El producto que se intenta actualizar no existe.");
	}
});
