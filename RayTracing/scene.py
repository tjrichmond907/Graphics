class Scene:
    def __init__(self, camera, objects, lights, width, height, back, left, right, bottom, top, near):
        self.camera = camera
        self.objects = objects
        self.lights = lights
        self.width = width
        self.height = height
        self.back = back
        self.left = left
        self.right = right
        self.bottom = bottom
        self.top = top
        self.near = -1*near

