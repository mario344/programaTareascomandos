const fs = require('fs');

//todo se guaradarra en un arreglo

let listadoPorHacer = [];

//guarda en la BD
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    //lo guarda en la capeta DB
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Error inesperado', err);

    })
}

//Gaurda el archivo en el array
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}




const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB()

    return porHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    //devielve -1 si no encontro
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

    //tarera el elemento que es diferente en el array
    const listado = listadoPorHacer.filter(
        listadoPorHacer => listadoPorHacer.descripcion !== descripcion)

    if (listadoPorHacer.length === listado.length) {
        return false;
    } else {
        listadoPorHacer = listado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    borrar,
    actualizar
}