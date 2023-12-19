import pyautogui

pyautogui.FAILSAFE = False

def move(coord, _):
    x, y = coord.split(',')

    pyautogui.moveTo(int(x), int(y))