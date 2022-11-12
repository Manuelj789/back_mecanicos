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
 edad: String,
});
 
const usuarioModelo = mongoose.model("usuarios", userSchema);
 
app.get("/", (request, response) => {
 response.send("uy me hiciste una petición");
});
 
app.get("/UsuarioPorId", (request, response) => {
 usuarioModelo.find(
 { documento: request.body.documento | request.param("documento") },
 function (error, documentos) {
 response.send(documentos);
 }
 );
});
 
app.get("/Usuarios", (reqest, response) => {
 usuarioModelo.find(function (error, documentos) {
 response.send(documentos);
 });
});
 
app.post("/AgregarUsuario", function (request, response) {
 console.log(request.body);
 
 let usuarioNuevo = new usuarioModelo({
 documento: request.body.documento,
 nombre: request.body.nombre,
 edad: request.body.edad,
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
 
app.delete("/EliminarUsuario", function (request, response) {
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
 
app.put("/EditarUsuario", function (request, response) {
 const filter = { documento: request.body.documento };
 const update = { edad: Number(request.body.edad) };
 
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