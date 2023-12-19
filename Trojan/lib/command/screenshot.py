from pyautogui import screenshot as _screenshot
from lib.mail import Email

def screenshot(parameters, email: Email):
    screenshot_path = 'img/screenshot.png'
    
    _screenshot(screenshot_path)
    email.send_email('Screenshot /I', '', screenshot_path)