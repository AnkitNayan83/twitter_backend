import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import dotenv from "dotenv";
dotenv.config();

const ROOT_EMAIL = process.env.ROOT_EMAIL!;
const myRegion = process.env.AWS_DEFAULT_REGION!;

const ses = new SESClient({ region: myRegion });

function createEmailCommand(toAddress: string, fromAddress: string, message: string) {
    return new SendEmailCommand({
        Destination: {
            ToAddresses: [toAddress],
        },
        Source: fromAddress,
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: "Your one-time-password",
            },
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: message,
                },
            },
        },
    });
}

export async function sendEmail(email: string, token: string) {
    const message = `Your onr time password is ${token}`;
    const command = createEmailCommand(email, ROOT_EMAIL, message);
    try {
        return await ses.send(command);
    } catch (error) {
        console.log(error);
        return error;
    }
}

sendEmail("ankitchamp13@gmail.com", "12345678");
