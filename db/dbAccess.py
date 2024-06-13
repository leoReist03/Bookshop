#!/usr/bin/env python
print("test")

def getFile():
    print("./books.json", "r")
    return open("./books.json", "r")
