import math
class Vector:

    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
    
    def __str__(self):
        return "({}, {}, {})".format(self.x, self.y, self.z)

    def dot(self, other):
        return self.x * other.x + self.y * other.y + self.z * other.z

    def magnitude(self):
        return math.sqrt(self.dot(self))

    def normalize(self):
        return self / self.magnitude()

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y, self.z + other.z)

    def __subtract__(self, other):
        return Vector(self.x - other.x, self.y - other.y, self.z -other.z)
    
    def __mull__(self, other):
        assert not isinstance(other, Vector)
        return Vector(self.x * other, self.y * other, self.z * other)
    
    def __rmul__(self, other):
        return self.__mull__(other)
    
    def __truediv__(self, other):
        assert not isinstance(other, Vector)
        return Vector(self.x / other, self.y / other, self.z / other)
    
    def exp(self, other):
        assert not isinstance(other, Vector)
        return Vector(self.x ** other, self.y ** other, self.z ** other)



