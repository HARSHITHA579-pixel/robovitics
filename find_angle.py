import cv2
import numpy as np

def analyze_image(path):
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if img is None or img.shape[2] < 4:
        print(f"{path}: No alpha channel")
        return
    
    alpha = img[:, :, 3]
    # Find coordinates of non-transparent pixels
    coords = np.column_stack(np.where(alpha > 0))
    if len(coords) == 0:
        print(f"{path}: Empty alpha")
        return
        
    rect = cv2.minAreaRect(coords)
    angle = rect[-1]
    
    # Adjust angle to be between -45 and 45
    if angle > 45:
        angle -= 90
    elif angle < -45:
        angle += 90
        
    # the rect is (center, (width, height), angle)
    # the angle returned by minAreaRect is the rotation of the rectangle
    # to straighten it, we want the negative of that angle
    correction_angle = angle
    
    print(f"{path}: Tilt angle = {angle:.2f} deg, Correction = {-angle:.2f} deg")

for p in ["public/hands-on.png", "public/vortex1.png", "public/Uddeshya.png", "public/Orcus 1.png"]:
    analyze_image(p)
