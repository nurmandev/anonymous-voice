import { ADMIN_EMAIL } from "../config";
const nodemailer = require('nodemailer');

interface IEmailData {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}
const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth :{
        user: ADMIN_EMAIL,
        pass: 'eehe pxex temr lyjq'
    }
}

const sendEmail = (data:IEmailData)=>{
    const transporter = nodemailer.createTransport(config);
    console.log("GOT THE MAIL TRIGGER")
    transporter.sendMail(data, (err, info)=>{ if (err){
        console.log(err);
 }else {
    return info.response;
 }})

}

export { sendEmail };

