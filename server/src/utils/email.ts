import nodemailer, { TransportOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendEmail = async (options: {
	email: string;
	subject: string;
	text: string;
}) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: parseInt(String(process.env.EMAIL_PORT)),
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: "Greenshop <ilhommaxsudov3@gmail.com>",
			to: options.email,
			subject: options.subject,
			text: options.text,
		};

		await transporter.sendMail(mailOptions);
	} catch (err) {
		console.log(err);
	}
};

export { sendEmail };
