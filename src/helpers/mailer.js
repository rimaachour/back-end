const nodemailer = require('nodemailer');

async function mail(email, subject , tempcode){
    try{
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user:'islam.ahmed1610@gmail.com',
                pass:'xwhnpgybjsvyybfq' ,
            },
        });
       // console.log(transporter,tempCode,email)

        let info = await transporter.sendMail({
            from: 'islam.ahmed1610@gmail.com' ,
            to: email,
            subject: subject,
            html: '' + tempcode,
        },(err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log('Email sent: ' + res);

            }
        })

    }catch{
        console.log(err)

    }
}
exports.mail=mail
