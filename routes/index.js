var express = require('express');
var router = express.Router();
const Data = require('../models/Question_Model');
const Swal = require('sweetalert2');
/* GET home page. */
// Ruta principal - Muestra todas las preguntas
// router.get('/', async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.render('index', { questions });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error en el servidor');
//   }
// });

// // Ruta para enviar una pregunta
// router.post('/', async (req, res) => {
//   const { pregunta, usuario, valores } = req.body;
//   console.log(valores)
//   const question = new Question({ pregunta, usuario, valores });

//   try {
//     const result = await question.save();
//     console.log(result)
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error en el servidor');
//   }
// });

// Ruta principal - Muestra el formulario de registro
router.get('/', async (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    // Manejar errores en caso de que ocurran durante la operación de carga
    console.log(error)
    res.status(500).send('Ocurrió un error durante la carga');
  }
});


router.post('/submit', async (req, res) => {
  try {
    const { name, email } = req.body;
    const answers = [];

    // Recorrer las respuestas del formulario y almacenarlas en el formato deseado
    for (let i = 1; i <= 15; i++) {
      const question = `Question ${i}`;
      const answer = parseInt(req.body[`answer${i}`]);
      answers.push({ question, answer });
    }

    // Crear un nuevo usuario con los datos recibidos
    const user = new Data({ name, email, answers });
  
    // Guardar el usuario en la base de datos
    await user.save();
    res.redirect('/')
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).send('Server error');
  }
});


// // Ruta para procesar el formulario de registro
// router.post('/', async (req, res) => {
//   const { nombre, fechaNacimiento, respuestas } = req.body;
//   const user = new User({ nombre, fechaNacimiento, respuestas });

//   try {
//     await user.save();
//     res.redirect('/success');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error en el servidor');
//   }
// });

// // Ruta de éxito - Muestra el signo zodiacal del usuario registrado
router.get('/success/1220100446', async (req, res) => {
  try {
    const users = await Data.find();

    res.render('success', { users: users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// function determinarSignoZodiacal(fechaNacimiento) {
//   const fecha = new Date(fechaNacimiento);
//   const mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0, por eso se suma 1

//   let signoZodiacal = '';

//   switch (mes) {
//     case 1: // Enero
//       if (fecha.getDate() >= 20) {
//         signoZodiacal = 'Acuario';
//       } else {
//         signoZodiacal = 'Capricornio';
//       }
//       break;
//     case 2: // Febrero
//       if (fecha.getDate() >= 19) {
//         signoZodiacal = 'Piscis';
//       } else {
//         signoZodiacal = 'Acuario';
//       }
//       break;
//     case 3: // Marzo
//       if (fecha.getDate() >= 21) {
//         signoZodiacal = 'Aries';
//       } else {
//         signoZodiacal = 'Piscis';
//       }
//       break;
//     case 4: // Abril
//       if (fecha.getDate() >= 20) {
//         signoZodiacal = 'Tauro';
//       } else {
//         signoZodiacal = 'Aries';
//       }
//       break;
//     case 5: // Mayo
//       if (fecha.getDate() >= 21) {
//         signoZodiacal = 'Géminis';
//       } else {
//         signoZodiacal = 'Tauro';
//       }
//       break;
//     case 6: // Junio
//       if (fecha.getDate() >= 21) {
//         signoZodiacal = 'Cáncer';
//       } else {
//         signoZodiacal = 'Géminis';
//       }
//       break;
//     case 7: // Julio
//       if (fecha.getDate() >= 23) {
//         signoZodiacal = 'Leo';
//       } else {
//         signoZodiacal = 'Cáncer';
//       }
//       break;
//     case 8: // Agosto
//       if (fecha.getDate() >= 23) {
//         signoZodiacal = 'Virgo';
//       } else {
//         signoZodiacal = 'Leo';
//       }
//       break;
//     case 9: // Septiembre
//       if (fecha.getDate() >= 23) {
//         signoZodiacal = 'Libra';
//       } else {
//         signoZodiacal = 'Virgo';
//       }
//       break;
//     case 10: // Octubre
//       if (fecha.getDate() >= 23) {
//         signoZodiacal = 'Escorpio';
//       } else {
//         signoZodiacal = 'Libra';
//       }
//       break;
//     case 11: // Noviembre
//       if (fecha.getDate() >= 22) {
//         signoZodiacal = 'Sagitario';
//       } else {
//         signoZodiacal = 'Escorpio';
//       }
//       break;
//     case 12: // Diciembre
//       if (fecha.getDate() >= 22) {
//         signoZodiacal = 'Capricornio';
//       } else {
//         signoZodiacal = 'Sagitario';
//       }
//       break;
//     default:
//       signoZodiacal = 'No válido';
//       break;
//   }

//   return signoZodiacal;
// }

const ExcelJS = require('exceljs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Ruta para descargar el archivo Excel
router.get('/download/excel', async (req, res) => {
  try {
    const users = await Data.find(); // Obtener todos los usuarios de la base de datos

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Escribir los encabezados en el archivo Excel
    worksheet.addRow(['Name', 'Email','Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo']);

    // Escribir los datos en el archivo Excel
    users.forEach(user => {
      const userData = [user.name, user.email];

      const groupedAnswers = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      };

      user.answers.forEach(answer => {
        const answerValue = answer.answer;
        if (groupedAnswers.hasOwnProperty(answerValue)) {
          groupedAnswers[answerValue]++;
        }
      });

      // Agregar las respuestas agrupadas a los datos del usuario
      userData.push(groupedAnswers[1], groupedAnswers[2], groupedAnswers[3], groupedAnswers[4], groupedAnswers[5], groupedAnswers[6]);


      worksheet.addRow(userData);
    });

    // Configurar el encabezado de respuesta para descargar el archivo Excel
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="' + encodeURIComponent('exel-respuestas.xlsx') + '"'
    );

    // Guardar el archivo Excel en la respuesta
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating Excel file:', error);
    res.status(500).send('Server error');
  }
});

// Ruta para descargar el archivo CSV
// router.get('/download/csv', async (req, res) => {
//   try {
//     const users = await Data.find(); // Obtener todos los usuarios de la base de datos
//     // Obtener la fecha actual para incluirla en el nombre del archivo CSV

//     // Configurar el encabezado de respuesta para descargar el archivo CSV
//     res.setHeader('Content-Type', 'text/csv');
//     res.setHeader(
//       'Content-Disposition',
//       'attachment; filename="' + encodeURIComponent('users.csv') + '"'
//     );
//     // Crear el escritor CSV y escribir los datos en el archivo CSV
//     const csvWriter = createCsvWriter({
//       path: 'users.csv',
//       header: [
//         { id: 'name', title: 'Nombre' },
//         { id: 'date', title: 'FechaNac' },
//         { id: 'answer1', title: 'Answer 1' },
//         { id: 'answer2', title: 'Answer 2' },
//         { id: 'answer3', title: 'Answer 3' },
//         { id: 'answer4', title: 'Answer 4' },
//         { id: 'answer5', title: 'Answer 5' },
//         { id: 'answer6', title: 'Answer 6' },
//         { id: 'answer7', title: 'Answer 7' },
//         { id: 'answer8', title: 'Answer 8' },
//         { id: 'answer9', title: 'Answer 9' },
//         { id: 'answer10', title: 'Answer 10' },
//         { id: 'answer11', title: 'Answer 11' },
//         { id: 'answer12', title: 'Answer 12' },
//         { id: 'answer13', title: 'Answer 13' },
//         { id: 'answer14', title: 'Answer 14' },
//         { id: 'answer15', title: 'Answer 15' },
//         // Agrega aquí las preguntas restantes
//       ],
//     });

//     // Escribir los datos en el archivo CSV
//     const csvRecords = [];
//     users.forEach(user => {
//       const csvRecord = {
//         name: user.name
//       };

//       csvRecord.date = user.date;

//       user.answers.forEach((answer, index) => {
//         csvRecord[`answer${index + 1}`] = answer.answer;
//       });

//       csvRecords.push(csvRecord);
//     });

//     await csvWriter.writeRecords(csvRecords);
//     res.download('users.csv');
//   } catch (error) {
//     console.error('Error generating CSV file:', error);
//     res.status(500).send('Server error');
//   }
// });

// Ruta para descargar el archivo CSV
router.get('/download/csv', async (req, res) => {
  try {
    const users = await Data.find(); // Obtener todos los usuarios de la base de datos

    // Crear el contenido del archivo CSV
    const csvData = [];

    // Agregar encabezados
    csvData.push(['Name', 'Email','Aries', 'Tauro', 'Geminis', 'Cancer', 'Leo', 'Virgo']);

    // Agregar los datos de los usuarios
    users.forEach(user => {
      const userData = [user.name,user.email];

              // Crear un objeto para agrupar las respuestas por valor (1, 2, 3, 4, 5 o 6)
              const groupedAnswers = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
              };      

      user.answers.forEach(answer => {
        const answerValue = answer.answer;
        if (groupedAnswers.hasOwnProperty(answerValue)) {
          groupedAnswers[answerValue]++;
        }
      });
      userData.push(groupedAnswers[1], groupedAnswers[2], groupedAnswers[3], groupedAnswers[4], groupedAnswers[5], groupedAnswers[6]);
      csvData.push(userData);
    });

    // Configurar el encabezado de respuesta para descargar el archivo CSV
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="' + encodeURIComponent('users.csv') + '"'
    );

    // Convertir los datos del CSV a una cadena
    const csvString = csvData.map(row => row.join(',')).join('\n');

    // Enviar la cadena CSV al cliente
    res.send(csvString);
  } catch (error) {
    console.error('Error generating CSV file:', error);
    res.status(500).send('Server error');
  }
});


module.exports = router;
