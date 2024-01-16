import { SMTPClient } from 'emailjs';

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


// let mail = nodemailer.createTransport({
//     service: 'gmail',
//     port: 465,
//     secure: false,
//     auth: {
//       user: 'verify.petrichor@gmail.com',
//       pass: process.env.emailpass
//     }
//   });

const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp.your-email.com',
	ssl: true,
});


export function newP(){
    console.log("k", process.env.emailpass)
    password = generateRandomString();
    console.log(`http://finance.petrichor.events/${password}`)
    let mailOptions = {
        from: 'verify.petrichor@gmail.com',
        to: 'petrichor@iitpkd.ac.in, 112201015@smail.iitpkd.ac.in',
        subject: 'Finance Link',
        text: `https://finance.petrichor.events/${password}`
    };
        
    client.send(
        mailOptions,
        (err, message) => {
            console.log(err || message);
        }
    );
}
