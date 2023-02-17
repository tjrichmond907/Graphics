class Ray:
    def __init__(self, origin, direction):
        self.origin = origin
        self.direction = direction.normalize()
    
    def toStr(self):
        print('Origin: {}, direction: {}'.format(self.origin, self.direction))