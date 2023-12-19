import pyautogui

pyautogui.FAILSAFE = False

def doubleclick(coord, _):
    x, y = None, None
    if coord:
      x, y = coord.split(',')

    pyautogui.doubleClick(int(x), int(y))