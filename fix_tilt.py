from PIL import Image
import math

def get_angle(path):
    img = Image.open(path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
        
    alpha = img.split()[-1]
    
    # Get bounding box points
    width, height = img.size
    pixels = alpha.load()
    
    # Find top edge
    top_left = None
    top_right = None
    
    # scan top to bottom
    for y in range(height):
        if top_left and top_right:
            break
        for x in range(width):
            if pixels[x, y] > 0:
                if top_left is None:
                    top_left = (x, y)
                else:
                    # just keep track of the first pixel in this row from the left,
                    # and the last pixel in this row from the right.
                    pass
    
    # A better way is to find the corners of the rotated rectangle.
    # Top-most point
    top_point = None
    for y in range(height):
        for x in range(width):
            if pixels[x, y] > 0:
                top_point = (x, y)
                break
        if top_point: break
        
    # Left-most point
    left_point = None
    for x in range(width):
        for y in range(height):
            if pixels[x, y] > 0:
                left_point = (x, y)
                break
        if left_point: break
        
    # Right-most point
    right_point = None
    for x in range(width-1, -1, -1):
        for y in range(height):
            if pixels[x, y] > 0:
                right_point = (x, y)
                break
        if right_point: break
        
    print(f"{path}: top={top_point}, left={left_point}, right={right_point}")
    
    # Calculate angle using top and right points if it tilted clockwise
    # Or top and left points if tilted counter-clockwise
    if top_point[0] < width / 2:
        # Top point is on the left -> tilted counter-clockwise
        dx = right_point[0] - top_point[0]
        dy = right_point[1] - top_point[1]
        angle = math.degrees(math.atan2(dy, dx))
        print(f"{path}: tilted CCW. Angle between top and right = {angle}")
    else:
        # Top point is on the right -> tilted clockwise
        dx = top_point[0] - left_point[0]
        dy = top_point[1] - left_point[1]
        angle = math.degrees(math.atan2(-dy, dx))
        print(f"{path}: tilted CW. Angle between left and top = {angle}")

for p in ["public/hands-on.png", "public/vortex1.png", "public/Uddeshya.png", "public/Orcus 1.png"]:
    get_angle(p)
