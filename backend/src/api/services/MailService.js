import dotenv from 'dotenv';
import { mailjet } from 'node-mailjet';

const mailjetInst = mailjet.connect(
    '050528858e6e03f30123023d6611c0f5',
    'fd0584982d5492c7b4305f413af18c53'
  )

  const sendEmail = async (req, res) => {
    try {
        const { to, subject, text } = req.body;
        
        const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
            From: {
                Email: 'danielpenedo2@gmail.com',
                Name: 'Dan',
            },
            To: [
                {
                Email: to,
                },
            ],
            Subject: subject,
            TextPart: text,
            HTMLPart:
                '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
            },
        ],
        })
        request
        .then(result => {
            console.log(result.body)
        })
        .catch(err => {
            console.log(err.statusCode)
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to send email');
    }
}

export default sendEmail;