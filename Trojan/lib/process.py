from lib.command.popup import *
from lib.command.run import *
from lib.command.click import *
from lib.command.doubleclick import *
from lib.command.screenshot import *
from lib.command.move import *

def process(command, parameters, email):
    command = command.split(' ')[0]

    command_function = None

    if command == 'popup': command_function = popup
    elif command == 'run': command_function = run
    elif command == 'click': command_function = click
    elif command == 'doubleclick': command_function = doubleclick
    elif command == 'screenshot': command_function = screenshot
    elif command == 'move': command_function = move
    
    command_function(parameters, email)