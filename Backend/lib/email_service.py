from fastapi import FastAPI, HTTPException, File, UploadFile
import shutil
from pathlib import Path
import zipfile
from pydantic import BaseModel
from weasyprint import HTML
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os
import base64
import re


# Define the request body
class EmailRequest(BaseModel):
    html_content: str
    image_base64:str
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



def extract_text_following_keyword(text, keyword="base64,"):
    # Define the regex pattern to match any text following the keyword
    pattern = re.compile(f"{keyword}(.*)")
    
    # Search for the pattern in the given text
    match = pattern.search(text)
    
    if match:
        # Return the text following the keyword
        return match.group(1).strip()  # Use .strip() to remove leading/trailing whitespaces
    else:
        return None


# Function to send an email with an attachment
def send_email_with_attachment(subject: str, to_email: str, body: str, attachment_path: str,img_base64:str):
    try:
        # Create the email
        msg = MIMEMultipart()
        msg["From"] = FROM_EMAIL
        msg["To"] = to_email
        msg["Subject"] = subject
       
        img_base64 = extract_text_following_keyword(img_base64)
        image_data = base64.b64decode(img_base64)

        image_filename ="TraceReport.pdf"
        with open(image_filename, "wb") as img_file:
            img_file.write(image_data)
            
        zip = zipfile.ZipFile('report.zip','w',zipfile.ZIP_DEFLATED)
        zip.write(image_filename)
        zip.close()
            
        with open('report.zip', "rb") as attachment:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment.read())
            encoders.encode_base64(part)
            part.add_header(
                "Content-Disposition",
                f"attachment; filename={os.path.basename('report.zip')}",
            )
            msg.attach(part)
            
        
        # with open(image_filename, "rb") as img_file:
        #     mime = MIMEBase("image", "png", filename=image_filename)
        #     mime.set_payload(img_file.read())
        #     encoders.encode_base64(mime)
        #     mime.add_header("Content-Disposition", f"attachment; filename={image_filename}")
        #     msg.attach(mime)

        # Send the email via Gmail's SMTP server
        with smtplib.SMTP_SSL(GMAIL_SMTP_SERVER,GMAIL_SMTP_PORT) as server:
            server.login(FROM_EMAIL, FROM_PASSWORD)
            server.sendmail(FROM_EMAIL, to_email, msg.as_string())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending email: {e}")






def send_verification_link(link:str,to_email:str):
    # Create the email message
    html = f"""\
    <!DOCTYPE html>
    <html>
    <body>
        <p>Hi {to_email},</p>
        <p>Thanks for signing up! Please verify your email by clicking the button below:</p>
        <p>
        <a href="{link}" style="
            background-color: #01abff;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        ">Verify Email</a>
        </p>
        <p>This link will expire in 15 minutes. If it does, you can request a new one from our website.</p>
        <p>If you did not create this account, you can safely ignore this email.</p>
        <p> <strong> – The Trace Team </strong> </p>
    </body>
    </html>
    """

    msg = MIMEMultipart()
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email
    msg["Subject"] = 'Email Verification'
    msg.attach(MIMEText(html, "html"))

    try:
        # Set up the server and send the email
        server = smtplib.SMTP_SSL(GMAIL_SMTP_SERVER, GMAIL_SMTP_PORT)
        server.login(FROM_EMAIL, FROM_PASSWORD)
        server.sendmail(FROM_EMAIL, to_email, msg.as_string())
        server.quit()  # Close the connection
        print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")
 





def send_password_reset_email(reset_link: str, otp_code: str, to_email: str):
    html = f"""\
    <!DOCTYPE html>
    <html>
    <body>
        <p>Hi {to_email},</p>
        <p>We received a request to reset your password. You can do so using either of the methods below:</p>

        <h3>🔗 Method 1: Reset via Link</h3>
        <p>
            <a href="{reset_link}" style="
                background-color: #28a745;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
            ">Reset Password</a>
        </p>

        <h3>🔐 Method 2: Use OTP Code</h3>
        <p>Use the following One-Time Password (OTP) to reset your password:</p>
        <h2 style="color:#333;">{otp_code}</h2>

        <p><strong>Note:</strong> This link and OTP will expire in 15 minutes for your security.</p>
        <p>If you did not request a password reset, you can safely ignore this email.</p>
        <p><strong>– The Trace Team</strong></p>
    </body>
    </html>
    """

    msg = MIMEMultipart()
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email
    msg["Subject"] = 'Password Reset Request'
    msg.attach(MIMEText(html, "html"))

    try:
        server = smtplib.SMTP_SSL(GMAIL_SMTP_SERVER, GMAIL_SMTP_PORT)
        server.login(FROM_EMAIL, FROM_PASSWORD)
        server.sendmail(FROM_EMAIL, to_email, msg.as_string())
        server.quit()
        print("Password reset email sent successfully!")
    except Exception as e:
        print(f"Error sending password reset email: {e}")