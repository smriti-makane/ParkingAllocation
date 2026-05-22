from slots import get_slots

def is_inside(box, slot):

    x1, y1, x2, y2 = box
    sx, sy, sw, sh = slot

    if x1 > sx and y1 > sy and x2 < sx + sw and y2 < sy + sh:
        return True

    return False


def allocate_slots(vehicles):

    slots = get_slots()

    status = []

    for slot in slots:

        occupied = False

        for v in vehicles:

            if is_inside(v, slot):
                occupied = True

        status.append(occupied)

    return status