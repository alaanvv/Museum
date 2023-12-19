from random import choice
from winsound import Beep

keys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ']
key_presses = 0

historic = ''
save_amount = 20

query = input('Query:\n|> ')

while 1:
    key = choice(keys)
    key_presses += 1
    
    historic += key
    if len(historic) > save_amount + len(query): historic = historic[1:]

    if query in historic:
        Beep(1000, 1000)
        print(f'\n{historic}')
        print(f'\nYour monkey pressed {key_presses} times')
        break

input()
