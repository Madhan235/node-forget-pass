import nodemailer from "nodemailer";
export async function mail(userEmail,resetToken){

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
    subject: 'Password Reset',
         html: `<P>To Reset your password, click the following link : <a href="">${resetToken}</a></P>` }

        transporter.sendMail(mailDetails, function(err){
            if(err){
             console.log(err)
                 }
             else{
              console.log("email sent successfully", messageId)
                        }
        }) 
 
    }
