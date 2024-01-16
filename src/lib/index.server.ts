import nodemailer from 'nodemailer';

export let password = '';
// export const password = "1234567890";

export function generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < 13; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
}


let mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'verify.petrichor@gmail.com',
      pass: process.env.emailpass
    }
  });

export function newP(){
    password = generateRandomString();
    console.log(password)
    let mailOptions = {
        from: 'verify.petrichor@gmail.com',
        to: ['petrichor@iitpkd.ac.in', '112201015@smail.iitpkd.ac.in'],
        subject: 'Finance Link',
        text: `https://finance.petrichor.events/${password}`
    };
        
    mail.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
