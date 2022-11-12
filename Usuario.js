const { Router } = require("express");
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
 
mongoose.connect(
 "mongodb+srv://AdmonEquipo4:Admin123@clusterg43e4.ydtplsp.mongodb.net/?retryWrites=true&w=majority"
);
 
const userSchema = new mongoose.Schema({
 documento: Number,
 nombre: String,
 apellido: String,
 fechaNacimiento: String,
 telefono: String,
 direccion: String,
 ciudadResidencia: String,
 contrasena:String,
 edad: String,
});
 
const usuarioModelo = mongoose.model("usuarios", userSchema);
 
app.get("/", (request, response) => {
 response.send("uy me hiciste una petición");
});
 
app.get("/ClientePorId", (request, response) => {
 usuarioModelo.find(
 { documento: request.body.documento | request.param("documento") },
 function (error, documentos) {
 response.send(documentos);
 }
 );
});
 
app.get("/Clientes", (reqest, response) => {
 usuarioModelo.find(function (error, documentos) {
 response.send(documentos);
 });
});
 
app.post("/AgregarCliente", function (request, response) {
 console.log(request.body);
 
 let usuarioNuevo = new usuarioModelo({
 documento: request.body.documento,
 nombre: request.body.nombre,
 apellido: request.body.apellido,
 fechaNacimiento: request.body.fechaNacimiento,
 telefono: request.body.telefono,
 direccion: request.body.direccion,
 ciudadResidencia: request.body.ciudadResidencia,
 contrasena:request.body.contrasena,


 });
 
 usuarioNuevo.save(function (error, documento) {
 if (error) {
 response.send("Error en agregar usuario");
 } else {
 response.send("El usuario ha sido agregado");
 }
 });
 
 // response.send("prueba");
});
 
app.delete("/EliminarCliente", function (request, response) {
 usuarioModelo.deleteOne(
 { documento: request.body.documento | request.param("documento") },
 function (error, documento) {
 if (error) {
 response.send("Error en eliminar usuario");
 } else {
 response.send("El usuario ha sido eliminado");
 }
 }
 );
});
 
app.put("/EditarCliente", function (request, response) {
 const filter = { documento: request.body.documento };
 const update = { nombre: String(request.body.nombre),
                  apellido: String(request.body.apellido),
                  fechaNacimiento: String(request.body.fechaNacimiento),
                  telefono:  String(request.body.telefono),
                  direccion:  String(request.body.direccion),
                  ciudadResidencia: String(request.body.ciudadResidencia),
                  contrasena:  String(request.body.contrasena)                
                };

  
 
 
 console.log("filter: " + filter);
 console.log("update: " + update);
 
 usuarioModelo.findOneAndUpdate(filter, update, function (error, documento) {
 if (error) {
 console.log(error);
 response.send("Error en editar usuario");
 } else {
 response.send("El usuario ha sido editado");
 }
 });
});
 
app.listen(3000, () => {
 console.log("escuchando...");
});