from flask import Flask, request, jsonify

app = Flask(__name__)

students = {}

@app.route('/')
def home():
    return "Flask Backend is Running"

@app.route('/grade', methods=['POST'])
def grade_checker():
    data = request.json
    score = int(data['score'])
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    elif score >= 60:
        grade = "D"
    else:
        grade = "F"
    return jsonify({'grade': grade})

@app.route('/student', methods=['POST', 'PUT'])
def manage_student():
    data = request.json
    name = data['name']
    grade = data['grade']
    students[name] = grade
    return jsonify(students)

@app.route('/students', methods=['GET'])
def list_students():
    return jsonify(students)

@app.route('/file/write', methods=['POST'])
def write_to_file():
    content = request.json['content']
    with open("sample.txt", "w") as f:
        f.write(content)
    return jsonify({"status": "Written to file"})

@app.route('/file/read', methods=['GET'])
def read_file():
    with open("sample.txt", "r") as f:
        content = f.read()
    return jsonify({"content": content})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
