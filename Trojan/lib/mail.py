from email import message_from_bytes
from imaplib import IMAP4_SSL
import smtplib
from os.path import basename
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import COMMASPACE, formatdate

class Email:
    def __init__(self, email_address, email_password, imap_address = 'smtp.gmail.com'):
        self.email_address = email_address
        self.email_password = email_password
        self.imap_address = imap_address

        self.imap_server = None

    def login(self):
        # IMAP server
        self.imap_server = IMAP4_SSL(self.imap_address)
        self.imap_server.login(self.email_address, self.email_password)

        print('Logged')

    def logout(self):
        self.imap_server.close()
        self.imap_server.logout()

    def get_emails(self):
        self.imap_server.select('INBOX')
        ids = self.imap_server.search(None, 'ALL')[1][0].split()

        emails = []
        
        for id in ids:
            email_data = self.imap_server.fetch(id, '(RFC822)')[1]
            raw_email = email_data[0][1]

            email_message = message_from_bytes(raw_email)

            # Subject
            subject = email_message['Subject']

            # Body
            body = email_message.get_payload(0).get_payload(None, True) if email_message.is_multipart() else email_message.get_payload()
            if not isinstance(body, str): body = body.decode('utf-8')

            emails.append({ 'id': id, 'subject': subject, 'body': body })

        return emails
    
    def delete_email(self, id):
        self.imap_server.store(id, '+FLAGS', '\\Deleted')
        self.imap_server.expunge()

    def send_email(self, subject = '', body = '', attachment = ''):
        message = MIMEMultipart()
        message['Subject'] = subject
        message['From'] = self.email_address
        message['To'] = self.email_address
        message.attach(MIMEText(body))
        
        if attachment:
            with open(attachment, 'rb') as file:
                part = MIMEApplication(file.read())

            part['Content-Disposition'] = f'attachment; filename="{basename(attachment)}"'
            message.attach(part)

        with smtplib.SMTP('smtp.gmail.com', 587) as smtp_server:
            smtp_server.starttls()
            smtp_server.login(self.email_address, self.email_password)
            smtp_server.send_message(message)