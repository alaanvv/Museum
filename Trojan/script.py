from lib.mail import Email
from lib.process import *
from time import sleep

email = Email('alanvalelegal@gmail.com', 'minhasenha157')
email.login()

while 1:
  print('Checking')

  for message in email.get_emails():
      command = message['subject']
      parameters = message['body']

      if command.find('/I') >= 0: continue

      process(command, parameters, email)

      if command.find('/K') == -1: email.delete_email(message['id'])

  sleep(5)