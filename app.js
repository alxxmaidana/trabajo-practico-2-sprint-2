import mongoose from "mongoose";
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);
import "dotenv/config";

// Definir esquema para los superheroes
const superheroSchema = new mongoose.Schema({
    nombreSuperheroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: "Desconocido" },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String,
});

// Crear el modelo para implementar el esquma
const Superhero = mongoose.model("Superhero", superheroSchema, "Grupo-30");

async function InitApp() {
    try {
        await connectToDb();
        await findSuperheroByPlaneta("Asgard");
        // await insertSuperhero();
        // await updateSuperhero("Batman", { $set: { edad: 1001 } });
        // await updateSuperhero("Thor", {
        //     $push: { aliados: "Capitán América" },
        // });
        // await deleteSuperhero("Thor");
    } catch (error) {
        console.error("Hubo un error", error);
        throw error;
    } finally {
        mongoose.connection.close();
        console.log("Conexión a la base de datos cerrada");
    }
}

async function connectToDb() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Conexión éxitos a la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos", error);
        throw error;
    }
}

async function insertSuperhero() {
    const hero = new Superhero({
        nombreSuperheroe: "Thor",
        nombreReal: "Thor Edinson",
        edad: 1000,
        planetaOrigen: "Asgard",
        debilidad: "Destruir su martillo",
        poderes: ["Controlar el trueno", "Fuerza sobrehumana", "Inmortal"],
        aliados: ["Loki"],
        enemigos: ["Hela"],
        creador: "Alexander Maidana",
    });

    try {
        await hero.save();
        console.log("Superhéroe Insertado:", hero.nombreSuperheroe);
    } catch (error) {
        console.error("Error al guardar el superhéroe", error);
        throw error;
    }
}

// Actualización de un sueperheore
async function updateSuperhero(nombreSuperheroe, operacion) {
    try {
        const superheroExistente = await Superhero.findOne({
            nombreSuperheroe,
        });
        if (!superheroExistente) {
            console.log("Superheroe no encontrado, no se puede actualizar");
            return;
        } else {
            await Superhero.updateOne({ nombreSuperheroe }, operacion);
            console.log("Se actualizó correctamente", nombreSuperheroe);
        }
    } catch (error) {
        console.error("Error al actualizar el superheroe", error);
        throw error;
    }
}

// Eliminar un superheroe por nombre
async function deleteSuperhero(nombreSuperheroe) {
    try {
        const superheroExistente = await Superhero.findOne({
            nombreSuperheroe,
        });
        if (!superheroExistente) {
            console.log("Superheroe no encontrado, nada que eliminar");
            return;
        } else {
            await Superhero.deleteOne({ nombreSuperheroe });
            console.log(
                "Superheroe",
                nombreSuperheroe,
                "fue eliminado de la colección",
            );
        }
    } catch (error) {
        console.error("Error al eliminar el superheroe", error);
        throw error;
    }
}

// Buscar superheros cuyo planeta de origen sea la tierra
async function findSuperheroByPlaneta(planeta) {
    try {
        const heroesEncontrados = await Superhero.find({
            planetaOrigen: planeta,
        });
        if (heroesEncontrados.length === 0) {
            console.log(
                "No se encontró ningún superheroe, cuyo planeta de origen es",
                planeta,
            );
        } else {
            console.log("Superheroes encontrados:", heroesEncontrados);
        }
    } catch (error) {
        console.error("Error al buscar los superheroes", error);
        throw error;
    }
}

InitApp();
