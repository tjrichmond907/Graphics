
class Properties:
    def __init__(self, color, ambient, diffuse, specular, reflective, specExp):
        self.color = color
        self.ambient = ambient
        self.diffuse = diffuse
        self.specular = specular
        self.reflective = reflective
        self.specExp = specExp
    
    def toStr(self):
        print('Color: {}, ambient: {}, diffuse: {}, specular: {}, specExp: {}'.format(self.color, self.ambient, self.diffuse, self.specular, self.reflective, self.specExp))

    def color_at(self, position):
        return self.color 

    
