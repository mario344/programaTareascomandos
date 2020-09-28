//const argv = require('yargs').argv;
//console.log(argv);

const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHcaer = require('./por-hacer/por-hacer');



let comando = argv._[0];

switch (comando) {
    case 'crear':

        let tarea = porHcaer.crear(argv.descripcion)
        console.log(tarea);
        break;


    case 'listar':

        let listado = porHcaer.getListado();

        for (let tarea of listado) {
            console.log('************'.green);
            console.log(`${tarea.descripcion}`);
            console.log('Estado :', `${tarea.completado}`);
            console.log('***********'.green);
        }

        break;
    case 'actualizar':

        let actualizado = porHcaer.actualizar(argv.descripcion, argv.completado);

        console.log(actualizado)
        break;
    case 'borrar':
        let borrado = porHcaer.borrar(argv.descripcion);
        console.log(borrado);
        break;


    default:
        console.log('Comando erroneo')
}