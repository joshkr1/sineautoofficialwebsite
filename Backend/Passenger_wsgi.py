import sys
import os

# Adjust the path to your application folder
sys.path.insert(0, os.path.dirname(__file__))

from app import app as application
