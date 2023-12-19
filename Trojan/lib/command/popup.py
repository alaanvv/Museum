import ctypes

def popup(message, _):
    ctypes.windll.user32.MessageBoxW(0, message, "", 0)
