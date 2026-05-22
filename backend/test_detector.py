import cv2

from detector import detect_vehicles
from allocator import allocate_slots
from slots import get_slots
from db import create_table, update_slots


cap = cv2.VideoCapture(0)

create_table()

while True:

    ret, frame = cap.read()

    vehicles = detect_vehicles(frame)

    status = allocate_slots(vehicles)

    update_slots(status)

    slots = get_slots()

    for i, (x, y, w, h) in enumerate(slots):

        color = (0, 255, 0)

        if status[i]:
            color = (0, 0, 255)

        cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)

        cv2.putText(
            frame,
            f"Slot {i+1}",
            (x, y - 5),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            color,
            2,
        )

    for x1, y1, x2, y2 in vehicles:
        cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)

    cv2.imshow("Parking", frame)

    if cv2.waitKey(1) == 27:
        break