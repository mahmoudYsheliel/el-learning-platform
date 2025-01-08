from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from weasyprint import HTML
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

# Define the request body
class EmailRequest(BaseModel):
    html_content: str
    recipient: str
    subject: str = "Webpage PDF"
    body: str = "Please find the attached PDF of the webpage."
    
# Function to generate PDF from HTML
def generate_pdf_from_html(html_content: str, pdf_path: str):
    HTML(string=html_content).write_pdf(pdf_path)


GMAIL_SMTP_SERVER = "smtp.gmail.com"
GMAIL_SMTP_PORT = 465  # SSL port for Gmail
FROM_EMAIL = "mahmoudsheleil@gmail.com"  # Replace with your Gmail email address
FROM_PASSWORD = "cnkzbejkwtdnires"  # Replace with your Gmail app password or use OAuth2

def send_email(subject: str, body: str, to_email: str):
    """Function to send email using Gmail SMTP server."""
    # Create the email message
    msg = MIMEMultipart()
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        # Set up the server and send the email
        server = smtplib.SMTP_SSL(GMAIL_SMTP_SERVER, GMAIL_SMTP_PORT)
        server.login(FROM_EMAIL, FROM_PASSWORD)
        server.sendmail(FROM_EMAIL, to_email, msg.as_string())
        server.quit()  # Close the connection
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")






# Function to send an email with an attachment
def send_email_with_attachment(subject: str, to_email: str, body: str, attachment_path: str):
    try:
        # Create the email
        msg = MIMEMultipart()
        msg["From"] = FROM_EMAIL
        msg["To"] = to_email
        msg["Subject"] = subject

        # Add the email body
        msg.attach(MIMEText(body, "html"))

        # Attach the PDF file
        with open(attachment_path, "rb") as attachment:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())
            encoders.encode_base64(part)
            part.add_header(
                "Content-Disposition",
                f"attachment; filename={os.path.basename(attachment_path)}",
            )
            msg.attach(part)

        # Send the email via Gmail's SMTP server
        with smtplib.SMTP_SSL(GMAIL_SMTP_SERVER,GMAIL_SMTP_PORT) as server:
            server.login(FROM_EMAIL, FROM_PASSWORD)
            server.sendmail(FROM_EMAIL, to_email, msg.as_string())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending email: {e}")

