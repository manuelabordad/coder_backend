class Usuario {
	constructor(name, lastName, books, pets) {
		this.name = name;
		this.lastName = lastName;
		this.books = books;
		this.pets = pets;
	}
	getFullname() {
		return `My fullname is : ${this.name} ${this.lastName}`;
	}
	addPet(newPet) {
		return this.pets.push(newPet);
	}

	countPets() {
		return `${this.pets.length}`;
	}
	addBook(book) {
		return `${this.books.push(book)}`;
	}
	getBookNames() {
		return `${this.books.map((book) => book.Name)}`;
	}
}
const newUsuario = new Usuario(
	"manuela",
	"Borda",
	[{ Name: "inteligencia emocional ", Author: "Daniel goleman " }],
	["tiger", "elvis"]
);
newUsuario.addPet("sushi");
newUsuario.addBook({
	Name: "homo Deus",
	Author: "Yuval Noah Harari",
});

console.log(newUsuario.getFullname());
console.log(newUsuario.countPets());
console.log(newUsuario.getBookNames());
