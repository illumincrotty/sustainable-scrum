from getdata.models import *

fh = open("campus_all.csv")
for line in fh:
    line = line.split(',')
    newentry = All(line[0], line[1], line[2])
    try:
        newentry.save()
    except:
        print("problem ugh: ",line[0], line[1] )
fh.close()
