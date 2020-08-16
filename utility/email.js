const nodemailer = require("nodemailer");

module.exports = async function (options) {
    try {
        //I have signed up on the mailtrap website, -> demo inbox -> integrations--Node.js(nodemailer)
        //package is nodemailer-> nodemailer se mail jaati hai
        //for testing we are using mailtrap
        //Note that the email would  not be sent to the actual user but to mailtrap

        //also refer nodemailer.com/about

        // 1 create settings for mailtrap testing
        //this transport I have copied from the demoindex by following the above comments.
        //***From mailtrap***
            /*
                var transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "ccc0803ad49b9b",
                        pass: "9fed7caf514820"
                    }
                });
            */
        //*** Uptil here*** 

        // 1 create settings for gmail
        //gmail-> manage your google account -> security ->signing in to google -> app passwords-> decide a name and generate, copy the pass which will be entered below in plac eof pass
        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            auth: {
                user: "ashus5887@gmail.com",
                pass: "sdcbolzpbmaxclbi"
            }
        });

        // 2 create email options
        const emailOptions = {
            from: '"Origami" <admin@origami.com>',
            to: options.to,
            subject: options.subject,
            html: options.html
        }

        // 3 send your mail
        await transport.sendMail(emailOptions);
    }
    catch (err) {
        console.log(err, "in emailer catch")
    }
}