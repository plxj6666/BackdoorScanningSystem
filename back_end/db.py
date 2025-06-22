import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import os

def get_db_path():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(base_dir, 'users.db')

def init_db():
    db_path = get_db_path()
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            nickname TEXT
        )
    ''')
    # 如果没有admin用户则插入一个默认用户
    c.execute('SELECT * FROM users WHERE username=?', ('admin',))
    if not c.fetchone():
        c.execute('INSERT INTO users (username, password, nickname) VALUES (?, ?, ?)',
                  ('admin', generate_password_hash('admin123'), '管理员'))
    conn.commit()
    conn.close()

def get_user(username):
    db_path = get_db_path()
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('SELECT id, username, password, nickname FROM users WHERE username=?', (username,))
    row = c.fetchone()
    conn.close()
    if row:
        return {'id': row[0], 'username': row[1], 'password': row[2], 'nickname': row[3]}
    return None

def update_user(username, nickname=None, password=None):
    db_path = get_db_path()
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    if nickname and password:
        c.execute('UPDATE users SET nickname=?, password=? WHERE username=?',
                  (nickname, generate_password_hash(password), username))
    elif nickname:
        c.execute('UPDATE users SET nickname=? WHERE username=?', (nickname, username))
    elif password:
        c.execute('UPDATE users SET password=? WHERE username=?', (generate_password_hash(password), username))
    else:
        conn.close()
        return False
    conn.commit()
    conn.close()
    return True 