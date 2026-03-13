import mongoose from "mongoose";

async function connectToDatabase() {
    try {
        await mongoose.connect(
            "mongodb://grupo-30:grupo-30@cluster0-shard-00-00.blryo.mongodb.net:27017,cluster0-shard-00-01.blryo.mongodb.net:27017,cluster0-shard-00-02.blryo.mongodb.net:27017/NodeMod3Cohorte5?ssl=true&replicaSet=atlas-10fu4i-shard-0&authSource=admin&retryWrites=true&w=majority",
        );
        console.log("Conexión a la base de datos establecida");

        //await insertarSuperheroe();
        await actualizarSuperheroe("Ironman");
        //await eliminarSuperheroe("Ironman");
        //await buscarSuperheroes("Tierra");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

connectToDatabase();

// Defnir un esquema para superheroes
const superheroeSchema = new mongoose.Schema(
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

// Crear un modelo a partir del esquema
const Superheroe = mongoose.model("Superhero", superheroeSchema);

async function insertarSuperheroe() {
    const heroe = new Superheroe({
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

async function actualizarSuperheroe(nombreSuperheroe) {
    const resultado = await Superheroe.updateOne(
        { nombreSuperheroe: nombreSuperheroe },
        { $set: { edad: 46 } },
    );
    console.log("Resultado de la actualización:", resultado);
    // Aseguramos cerrar la conexión para que el cambio se refleje en la base de datos
    await mongoose.connection.close();
}

async function eliminarSuperheroe(nombreSuperheroe) {
    const resultado = await Superheroe.deleteOne({
        nombreSuperheroe: nombreSuperheroe,
    });
    console.log("Resultado de la eliminación:", resultado);

    await mongoose.connection.close();
}

async function buscarSuperheroes(planetaOrigen) {
    const heroes = await Superheroe.find({ planetaOrigen: planetaOrigen });
    console.log("Superhéroes encontrados:", heroes);
}
