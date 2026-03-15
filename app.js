import mongoose from "mongoose";
import { config } from "dotenv";
config();

// Conectar a la base de datos
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Conexión a la base de datos exitosa");
        //await insertSuperhero();
        //await updateSuperhero("Ironman");
        //await deleteSuperhero("Ironman");
        await findSuperheros("Tierra");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

connectToDatabase();

// Definimos un esquema para estructurar la colección de superhéroes
const superheroSchema = new mongoose.Schema(
    {
        nombreSuperheroe: { type: String, required: true },
        nombreReal: { type: String, required: true },
        edad: { type: Number, min: 0 },
        planetaOrigen: { type: String, default: "Desconocido" },
        debilidad: { type: String },
        poderes: [String],
        aliados: [String],
        enemigos: [String],
        createAt: { type: Date, default: Date.now },
        creador: { type: String },
    },
    {
        collection: "Grupo-30",
    },
);

// Creamos un modelo a partir del esquema para poder interactuar con la colección de superhéroes
const Superhero = mongoose.model("Superhero", superheroSchema);

// Desarrollamos los métodos CRUD para insertar, actualizar, eliminar y consultar superhéroes en la base de datos

// método para insertar un nuevo superhéroe en la base de datos
async function insertSuperhero() {
    const heroe = new Superhero({
        nombreSuperheroe: "Ironman",
        nombreReal: "Tony Stark",
        edad: 45,
        planetaOrigen: "Tierra",
        debilidad: "Dependencia de su armadura",
        poderes: [
            "Inteligencia excepcional",
            "Habilidades de ingeniería",
            "Armadura avanzada",
        ],
        aliados: ["Spiderman", "Capitán América"],
        enemigos: ["Thanos", "Mandarín"],
        creador: "Alexander Maidana",
    });
    await heroe.save();
    console.log("Superhéroe insertado:", heroe);
}

// método para actualizar la edad de un superhéroe específico
async function updateSuperhero(nombreSuperheroe) {
    const resultado = await Superhero.updateOne(
        { nombreSuperheroe: nombreSuperheroe },
        { $set: { edad: 46 } },
    );
    console.log("Resultado de la actualización:", resultado);
    // Aseguramos cerrar la conexión para que el cambio se refleje en la base de datos
    await mongoose.connection.close();
}

// método para eliminar un superhéroe específico de la base de datos
async function deleteSuperhero(nombreSuperheroe) {
    const resultado = await Superhero.deleteOne({
        nombreSuperheroe: nombreSuperheroe,
    });
    console.log("Resultado de la eliminación:", resultado);

    await mongoose.connection.close();
}

// método para encontrar superhéroes por su planeta de origen
async function findSuperheros(planetaOrigen) {
    const heroes = await Superhero.find({ planetaOrigen: planetaOrigen });
    console.log("Superhéroes encontrados:", heroes);
}
