from image import Image
from point import Point
from ray import Ray
from color import Color
from vector import Vector


class RenderEngine:

    def find_nearest(self, ray, scene):
        dist_min = None
        obj_hit = None
        for obj in scene.objects:
            dist = obj.intersects(ray)
            if(dist is not None and (obj_hit is None or dist < dist_min)):
                dist_min = dist
                obj_hit = obj
        return (dist_min, obj_hit)

    def color_at(self, obj_hit, hit_pos, normal, scene):
        properties = obj_hit.properties
        obj_color = properties.color_at(hit_pos)
        to_cam = scene.camera.__subtract__(hit_pos)
        specular_k = properties.specExp
        #ambient
        color = properties.ambient * properties.color 
        for light in scene.lights:
            to_light = Ray(hit_pos, light.position.__subtract__(hit_pos))
            #diffuse
            color += (obj_color.__mull__(properties.diffuse)).__mull__(max(normal.dot(to_light.direction), 0))
            #specular
            half_vector = (to_light.direction.__add__(to_cam)).normalize()
            color += (light.intensity.__mull__(properties.specular)).__mull__(max(normal.dot(half_vector), 0)**specular_k)
        return color 

    def ray_trace(self, ray, scene,depth=0):
        color = scene.back
        dist_hit, obj_hit = self.find_nearest(ray, scene)
        if(obj_hit is None):
            return color
        hit_pos = dist_hit * ray.origin.__add__(ray.direction)
        hit_normal = obj_hit.normal(hit_pos)
        color = self.color_at(obj_hit, hit_pos, hit_normal, scene)
        return color 

    def render(self, scene):
        width = scene.width
        height = scene.height
        x0 = scene.left
        x1 = scene.right
        y0 = scene.bottom
        y1 = scene.top
        xStep = (x1-x0)/(width -1)
        yStep = (y1-y0)/(height-1)
        camera = scene.camera
        pixels = Image(width, height)
        for j in range(height):
            y = y0 + j * yStep
            for i in range(width):
                x = x0 + i * xStep
                temp = Point(x,y,scene.near).__subtract__(camera)
                temp = temp.normalize()
                ray = Ray(camera,temp)
                pixels.setPixel(i,j,self.ray_trace(ray,scene))
            print("{:3.0f}%".format(float(j)/float(height) * 100), end="\r")
        return pixels





