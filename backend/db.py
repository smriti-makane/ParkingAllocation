import sqlite3


DB_NAME = "parking.db"


def connect():

    conn = sqlite3.connect(DB_NAME)

    return conn


def create_table():

    conn = connect()

    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS slots(
            id INTEGER PRIMARY KEY,
            status INTEGER
        )
        """
    )

    conn.commit()
    conn.close()


def update_slots(status_list):

    conn = connect()
    cur = conn.cursor()

    cur.execute("DELETE FROM slots")

    for i, s in enumerate(status_list):

        cur.execute(
            "INSERT INTO slots(id, status) VALUES(?,?)",
            (i, int(s)),
        )

    conn.commit()
    conn.close()


def get_slots():

    conn = connect()
    cur = conn.cursor()

    cur.execute("SELECT * FROM slots")

    data = cur.fetchall()

    conn.close()

    return data