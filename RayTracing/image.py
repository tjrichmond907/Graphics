class Image:
    def __init__(self, width, height):
        self.width = width 
        self.height = height
        self.pixels = [[None for i in range(width)] for j in range(height)]

    def setPixel(self, x, y ,col):
        self.pixels[y][x] = col

    def writePPM(self, file):
        
        def convert(color):
            return round(max(min(color * 255, 255), 0))  
        
        file.write("P3\n{} {}\n255\n".format(self.width, self.height))
        for row in self.pixels:
            for color in row:
                file.write("{} {} {}  ".format(convert(color.x), convert(color.y), convert(color.z)))