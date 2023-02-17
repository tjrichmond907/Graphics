
class Light:
    def __init__(self, position, intensity):
        self.position = position
        self.intensity = intensity
    
    def toStr(self):
        print('Position: {}, Color: {}'.format(self.position, self.intensity))