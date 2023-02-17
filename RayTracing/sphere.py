from math import sqrt
from vector import Vector
class Sphere:
    def __init__(self, center, radius, properties):
        self.center = center
        self.radius = radius 
        self.properties = properties

    def toStr(self):
        print('Sphere center: {}, Sphere Radius: {}'.format(self.center, self.radius))
        self.properties.toStr()

    def intersects(self, ray):
        sphere_to_ray = ray.origin.__subtract__(self.center)
        b = 2* ray.direction.dot(sphere_to_ray)
        c = sphere_to_ray.dot(sphere_to_ray) - self.radius * self.radius
        discriminant = b * b - 4* c
        if(discriminant >= 0):
            dist = (-b - sqrt(discriminant))/ 2
            if(dist > 0):
                return dist
        return None
    
    def normal(self, surface_point):
        return (surface_point.__subtract__(self.center)).normalize()