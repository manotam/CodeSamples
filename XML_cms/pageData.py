from dataPrepper import *

def setUpDataPrepper(directory: str):
    # link to pages
    # dataPrepper = DataPrepper("content/projects")
    dataPrepper = DataPrepper(directory)
    return dataPrepper
