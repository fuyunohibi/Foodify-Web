from flask import jsonify

def apiResponse(data: dict):
    if 'error' in data:
        return jsonify({'error': data['error']}), data['status_code']
    if 'data' not in data:
        return jsonify({'error', 'Internal Server Error'})
    if 'status_code' in data:
        return jsonify({'data': data['data']}), data['status_code']
    return jsonify({'data': data['data']})