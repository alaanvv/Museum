from subprocess import run as _run

def run(parameters, _):
  _run(parameters, shell=True)