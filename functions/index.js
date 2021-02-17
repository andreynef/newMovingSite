const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const config = functions.config();//достаем конфиг из функции
const cors = require("cors")({origin:true});//разрешает кроссресурс шеринг. Решает проблему Local3000 !== cloudfunctions.com. То-есть эту: Access to XMLHttpRequest at 'https://us-central1-material-react-arc.cloudfunctions.net/sendMail' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

//78B53B
admin.initializeApp();//теперь наша ф установлена и теперь есть доступ к firebase через наш node.js код.
//теперь можно вызывать ф через URL хоть когда
//след шаг это Nodemailer чтобы понять какую ф мы будем сетапить. Потом Деплой. И все готово, можно будет вызывать ф по URL.

//Nodemailer.com

//firebase functions:config:set user.email="...логин от почты без собаки итд..."//важно " а не '
//firebase functions:config:set user.password="..."//важно " а не '
//теперь логин и пароль сохранены в базе firebase для безопасности
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {user: config.user.email, pass: config.user.password},
});


let mailOptions = {};

exports.sendMailFromKMovers= functions.https.onRequest((request, response)=>{
  cors(request, response, ()=>{
    const{firstName, lastName, email, phone, message, to, from, moveSize, dateShort, dateLong, formattedTime, elevatorFrom, elevatorTo, stairsFrom, stairsTo, parkingFrom, parkingTo, items, notes, imageUrl1, imageUrl2, imageUrl3} = request.query
    let replacedImageUrl1 = imageUrl1.replace("images/", "images%2F");
    let replacedImageUrl2 = imageUrl2.replace("images/", "images%2F");
    let replacedImageUrl3 = imageUrl3.replace("images/", "images%2F");

    if(to){//если в реквесте/ответе есть значение to то значит это пачка с заказом а если нет то это просто сообщение
      mailOptions = {//то что получим себе от того почтов ящика
        from: 'Konstant Movers',
        // to:'andreynef@gmail.com',
        to:'nefkon90@gmail.com, andreynef@gmail.com',
        subject: 'Quote received',
        // attachments: [
        //   {
        //     filename: 'mailtrap.png',
        //     path: __dirname + '/mailtrap.png',
        //     cid: 'uniq-mailtrap.png'
        //   }
        // ],
        html:`
          <!DOCTYPE html>
          <html lang="ru">
            <head>
              <meta charset="utf-8">
              <title>Quote</title>
              <style>
                section {
                  font-family: "Calibri Light", Arial;
                  background-color: #000000;
                  padding: 2em;
                  min-width: 320px;
                  max-width: 760px;
                  margin: 0 auto;
                }
                h1 {
                  font-size: 25px;
                  text-align: center;
                  color: orange;
                }
                p {
                  font-size: 16px;
                  color: rgba(250,250,250,0.5)
                }
                span {
                  font-size: 20px;
                  color: rgba(250,250,250,0.95)
                }
                img {
                    width: 100%;
                }
                a {
                  color: orange;
                }

              </style>
            </head>
            <body>
              <section>
                <h1>Заказ</h1>
                <p> FirstName: <span>${firstName}</span> LastName: <span>${lastName}</span></p>
                <p> Email: <span>${email}</span></p>
                <p> Phone: <span>${phone}</span> </p>
                <p> From: <span>${from}</span> </p>
                <p> To: <span>${to}</span> </p>
                <p> Size: <span>${moveSize}</span> </p>
                <p> Date: <span>${dateLong} (${dateShort}).</span> Time: <span>${formattedTime}</span></p>
                <p> Elevator: from: <span>${elevatorFrom?elevatorFrom:'n/a'}</span> to: <span>${elevatorTo?elevatorTo:'n/a'}</span></p>
                <p> Stairs: from: <span>${stairsFrom?stairsFrom:'n/a'}</span> to: <span>${stairsTo?stairsTo:'n/a'}</span></p>
                <p> Parking: from: <span>${parkingFrom?parkingFrom:'n/a'}</span> to: <span>${parkingTo?parkingTo:'n/a'} </span></p>
                <p> Inventory: <span>${items} </span></p>
                <p> Notes: <span>${notes} </span></p>
                <img src=${replacedImageUrl1} alt="pic 1"/>
                <img src=${replacedImageUrl2} alt="pic 2"/>
                <img src=${replacedImageUrl3} alt="pic 3"/>
              </section>
            </body>
          </html>
        `
      };
    }else {//просто сообщение
      mailOptions = {//то что получим себе от того почт ящика
        from: 'Konstant Movers',
        to:'nefkon90@gmail.com, andreynef@gmail.com',
        // to:'andreynef@gmail.com',
        subject: 'Message received',
        html: `
              <p style='font-size:16px'> From: ${firstName} ${lastName}</p>
              <p style='font-size:16px'> Email: ${email} </p>
              <p style='font-size:16px'> Phone: ${phone} </p>
              <p style='font-size:16px'> Message: ${message} </p>
            `,
      };
    }

    transporter.sendMail(mailOptions, error=> {
      if(error){
        response.send(error);
      } else {
        response.send('Message sent successfully');
      }
    });

    mailOptions = {//то что отправим им обратно
      from: 'Konstant Movers',
      to:email,
      subject: 'We have received your message!',
      html: `
              <p style='font-size:16px'> Thanks for messaging us. We will contact you back shortly. </p>
            `,
    };
    transporter.sendMail(mailOptions)//просто отправить еще раз по новому адресу с новым шаблоном. Без проверок, ибо это лишнее тк уже проверено.

  });
});



// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



// service firebase.storage {
//   match /b/{bucket}/o {
//   match /{allPaths=**} {
//     allow read, write: if request.auth != null;
//   }
// }
// }