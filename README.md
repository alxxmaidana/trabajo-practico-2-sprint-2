# Trabajo práctico 2 - Sprint 2

En este proyecto aprendimos a conectarse a una base de datos MongoDB desde Node.js utilizando la librería Mongoose, crear una estructura para una colección de superhéroes y desarrollar métodos para interactuar con la base de datos. Este ejercicio abarca operaciones CRUD básicas: insertar, actualizar, eliminar y buscar.

---

## Enunciado del ejercicio:

1. **Conectarse a la base de datos con Node.js** usando Mongoose.

2. **Crear un esquema (Schema) y un modelo** para la olección de superhéroes.

3. Desarrollar métodos CRUD para:
    - Insertar(insert)
    - actualizar(update)
    - eliminar(delete)
    - buscar(find)

---

#### Mongoose:

**Mongoose** es una **biblioteca de modelado de datos (DOM)** para Node.js y MongoDB, que permite manejar base de datos no relacionales (NoSQL) de manera estructurada. La conexión inicial establece una ruta entre la aplicación y el clúster MondoDB, y Mongoose facilita las interacciones de manera más segura y organizada.

#### Esquema y Modelo en Moongose:

Un **esquema** en Mongoose define la estructura y reglas de los documentos dentro de la colección, lo cual permite realizar validaciones de datos antes de almacenarlos.
Un **modelo** es la implementación del esquema y permite realizar operaciones sobre los datos almacenados.
Esto aporta consistencia a la base de datos y permite mantener la integridad de los datos en aplicaciones complejas.
