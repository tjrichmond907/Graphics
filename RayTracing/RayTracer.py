import sys
import re
from image import Image
from color import Color
from vector import Vector
from point import Point
from sphere import Sphere
from scene import Scene
from render import RenderEngine
from light import Light
from properties import Properties

def readfile(file):
    dict1 = {}
    with open(file, 'r') as fileHandle:
        for line in fileHandle:
            line = line.rstrip()
            line = re.sub(r"[\n\t\s]+",' ', line)
            line = line.split(' ')
            newLine = []
            for item in line:
                if(item == False):
                    continue 
                else:
                    try:
                        if(item.isdigit()):
                            newLine.append(int(item))
                        else:
                            newLine.append(float(item))
                    except ValueError:
                        newLine.append(item)
                    if(line[0] == 'SPHERE' or line[0] == 'LIGHT'):
                        dict1[line[1]] = newLine[2:]
                    else:
                        dict1[line[0]] = newLine[1:]
        dict1.pop('', None)
    return dict1

def getObejcts(indict):
    objects = {}
    for k,v in indict.items():
        temp = {}
        if(k[0] == 's'):
            temp['pos'] = [v[0], v[1], v[2]]
            temp['scale'] = [v[3], v[4], v[5]]
            temp['color'] = [v[6], v[7], v[8]]
            temp['ambient'] = v[9]
            temp['diffuse'] = v[10]
            temp['specular'] = v[11]
            temp['reflection'] = v[12]
            temp['n'] = v[13]
            objects[k] = temp
    return objects

def getLights(inDict):
    lights = {}
    for k,v in inDict.items():
        temp = {}
        if(k[0] == 'l'):
            temp['pos'] = [v[0], v[1], v[2]]
            temp['intensity'] = [v[3], v[4], v[5]]
            lights[k] = temp
    return lights

def objToSphere(dict1):
    obj = []
    for k,v in dict1.items():
        temp = Sphere(Point(v['pos'][0], v['pos'][1], v['pos'][2]), float((v['scale'][0]+v['scale'][1]+v['scale'][2])/3),
                        Properties(Color(v['color'][0], v['color'][1], v['color'][2]), v['ambient'], v['diffuse'], v['specular'], v['reflection'], v['n']))
        obj.append(temp)
    return obj

def objToLights(dict1):
    obj = []
    for k,v in dict1.items():
        temp = Light(Point(v['pos'][0], v['pos'][1], v['pos'][2]), Color(v['intensity'][0], v['intensity'][1], v['intensity'][2])) 
        obj.append(temp)
    return obj


def main():
    filename = sys.argv[1:]
    for item in filename:
    #filename = sys.argv[1]
        vals = readfile(item)
        width = vals['RES'][0]
        height = vals['RES'][1]
        back = Color(float(vals['BACK'][0]), float(vals['BACK'][1]), float(vals['BACK'][2]))
        left = vals['LEFT'][0]
        right = vals['RIGHT'][0]
        bottom = vals['BOTTOM'][0]
        top = vals['TOP'][0]
        near = vals['NEAR'][0]

        camera = Point(0.0, 0.0, 0.0)
        objects = objToSphere(getObejcts(vals))
        lights = objToLights(getLights(vals))
        scene = Scene(camera, objects, lights, width, height, back, left, right, bottom, top, near)
        engine = RenderEngine()
        image = engine.render(scene)
        with open(vals['OUTPUT'][0], 'w') as imgFile:
            image.writePPM(imgFile)





if __name__ == "__main__":
    main()