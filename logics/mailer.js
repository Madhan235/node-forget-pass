import nodemailer from "nodemailer";
export function mail(userEmail,code){

 let transporter =
  nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"msouljar@gmail.com",
        pass:"yhqilsstocvicqoc"
    },
});

let mailDetails ={
    from: 'msouljar@gmail.com',
    to: `${userEmail}`,
    subject: 'Verfication code',
    text : `To Reset your password, enter the following code: 
         ${code}` 
       }

        transporter.sendMail(mailDetails, function(err){
            if(err){
             console.log(err)
                 }
             else{
              console.log("email sent successfully", messageId)
                        }
        }) 
 
    }
