import pyautogui

pyautogui.FAILSAFE = False

def click(coord, _):
    x, y = None, None
    if coord:
      x, y = coord.split(',')

    pyautogui.click(int(x), int(y))