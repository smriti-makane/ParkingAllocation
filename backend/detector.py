from ultralytics import YOLO

model = YOLO("yolov8n.pt")

vehicle_classes = [2, 3, 5, 7] 

def detect_vehicles(frame):

    results = model(frame)

    vehicles = []

    boxes = results[0].boxes

    if boxes is not None:

        for box in boxes:

            cls = int(box.cls[0])

            if cls in vehicle_classes:

                x1, y1, x2, y2 = map(int, box.xyxy[0])

                vehicles.append((x1, y1, x2, y2))

    return vehicles
