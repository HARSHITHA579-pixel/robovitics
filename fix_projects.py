from PIL import Image
import math

def get_angle(path):
    img = Image.open(path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
        
    alpha = img.split()[-1]
    width, height = img.size
    pixels = alpha.load()
    
    top_point = None
    for y in range(height):
        for x in range(width):
            if pixels[x, y] > 0:
                top_point = (x, y)
                break
        if top_point: break
        
    if not top_point:
        print(f"{path}: No visible pixels")
        return

    left_point = None
    for x in range(width):
        for y in range(height):
            if pixels[x, y] > 0:
                left_point = (x, y)
                break
        if left_point: break
        
    right_point = None
    for x in range(width-1, -1, -1):
        for y in range(height):
            if pixels[x, y] > 0:
                right_point = (x, y)
                break
        if right_point: break
        
    if top_point[0] < width / 2:
        dx = right_point[0] - top_point[0]
        dy = right_point[1] - top_point[1]
        angle = math.degrees(math.atan2(dy, dx))
        # Tilted CCW. Correct by CW
        print(f"{path}: tilted CCW by {angle:.2f} deg. Fix: rotate({-angle:.2f}deg)")
    else:
        dx = top_point[0] - left_point[0]
        dy = top_point[1] - left_point[1]
        angle = math.degrees(math.atan2(-dy, dx))
        # Tilted CW. Correct by CCW
        print(f"{path}: tilted CW by {angle:.2f} deg. Fix: rotate({angle:.2f}deg)")

for i in range(1, 7):
    get_angle(f"public/project{i}.png")
