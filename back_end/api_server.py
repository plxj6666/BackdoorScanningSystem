#!/usr/bin/env python3
"""
简化的后门检测API服务
根据模型ID执行后门检测
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import time
import random
from db import init_db, get_user, update_user
from werkzeug.security import check_password_hash

app = Flask(__name__)
CORS(app) # 这里为整个应用启用CORS

# 启动时初始化数据库
init_db()

# 加载模型映射数据
def load_model_mapping():
    try:
        with open('../models/model_mapping.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return {}

# 模拟后门检测函数
def detect_backdoor(model_id):
    """
    模拟后门检测过程
    返回检测结果
    """
    # 模拟检测时间
    time.sleep(random.uniform(2, 5))
    
    # 根据模型ID返回不同的检测结果
    # 这里可以替换为真实的检测算法
    
    # 根据模型ID判断模型类型
    model_types = {
        'model_1': 'LLM',
        'model_2': 'LLM', 
        'model_3': 'Image Classification',
        'model_4': 'Image Classification',
        'model_5': 'LLM',
        'model_6': 'Image Classification',
        'model_7': 'LLM',
        'model_8': 'Image Classification',
        'model_9': 'LLM',
        'model_10': 'Image Classification'
    }
    
    model_architectures = {
        'model_1': 'Transformer-based',
        'model_2': 'Llama-3 Architecture',
        'model_3': 'CNN-based',
        'model_4': 'ResNet-50',
        'model_5': 'Mistral-7B',
        'model_6': 'Vision Transformer',
        'model_7': 'Llama-3 8B',
        'model_8': 'EfficientNet',
        'model_9': 'Mistral-7B Fine-tuned',
        'model_10': 'ResNet-101'
    }
    
    model_type = model_types.get(model_id, 'Unknown')
    model_architecture = model_architectures.get(model_id, 'Unknown')
    
    # 生成触发器信息
    triggers = [
        "特定的文本模式触发",
        "图像中的隐藏标记",
        "权重异常分布",
        "激活函数异常",
        "注意力机制异常"
    ]
    
    # 生成分析说明
    reasoning_templates = {
        'LLM': [
            "检测到Transformer架构中的注意力权重异常分布，可能存在后门触发器",
            "发现模型对特定文本序列的响应异常，疑似存在后门攻击",
            "权重矩阵中存在明显的异常模式，可能被恶意修改"
        ],
        'Image Classification': [
            "CNN特征图中检测到异常激活模式，可能存在图像后门",
            "发现模型对特定图像模式的过度敏感，疑似后门触发器",
            "卷积层权重分布异常，可能存在恶意植入的后门"
        ]
    }
    
    reasoning = random.choice(reasoning_templates.get(model_type, ["检测到模型行为异常"]))
    
    # 生成安全建议
    recommendations = [
        "建议对模型进行重新训练",
        "使用可信的数据源重新验证模型",
        "实施额外的安全检测机制",
        "考虑使用模型蒸馏技术",
        "定期进行安全审计"
    ]
    
    is_backdoor = random.choice([True, False])
    confidence = random.uniform(0.7, 0.99)
    
    detection_results = {
        'model_id': model_id,
        'status': 'completed',
        'backdoor_detected': is_backdoor,
        'confidence': confidence,
        'suspicious_patterns': random.randint(0, 5),
        'scan_time': time.time(),
        'model_type': model_type,
        'model_architecture': model_architecture,
        'trigger': random.choice(triggers),
        'reasoning': reasoning,
        'recommendations': random.sample(recommendations, 3),
        'details': {
            'weight_analysis': 'Completed',
            'pattern_matching': 'Completed',
            'statistical_analysis': 'Completed',
            'anomaly_detection': 'Completed',
            'signature_verification': 'Completed'
        }
    }
    
    return detection_results

@app.route('/api/scan', methods=['POST'])
def start_scan():
    """
    开始后门扫描
    请求格式: {"model_id": "id-0001"}
    """
    try:
        data = request.get_json()
        model_id = data.get('model_id')
        
        if not model_id:
            return jsonify({'error': 'model_id is required'}), 400
        
        # 执行检测
        result = detect_backdoor(model_id)
        
        return jsonify({
            'success': True,
            'result': result
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/models', methods=['GET'])
def get_models():
    """
    获取可用的模型列表
    """
    try:
        mapping = load_model_mapping()
        return jsonify({
            'success': True,
            'models': mapping
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    健康检查
    """
    return jsonify({
        'status': 'healthy',
        'service': 'backdoor-detection-api',
        'timestamp': time.time()
    })

@app.route('/api/history', methods=['GET'])
def get_scan_history():
    """
    获取扫描历史记录
    """
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        data_path = os.path.join(base_dir, '../data/scan_history.json')
        with open(data_path, 'r', encoding='utf-8') as f:
            history = json.load(f)
        return jsonify(history)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/<username>', methods=['GET'])
def api_get_user(username):
    user = get_user(username)
    if user:
        return jsonify({
            'id': user['id'],
            'username': user['username'],
            'nickname': user['nickname']
        })
    else:
        return jsonify({'error': '用户不存在'}), 404

@app.route('/api/user/<username>', methods=['PUT'])
def api_update_user(username):
    data = request.get_json()
    nickname = data.get('nickname')
    password = data.get('password')
    if not nickname and not password:
        return jsonify({'error': '没有需要更新的内容'}), 400
    ok = update_user(username, nickname=nickname, password=password)
    if ok:
        return jsonify({'success': True})
    else:
        return jsonify({'error': '更新失败'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = get_user(username)
    if user and check_password_hash(user['password'], password):
        return jsonify({'success': True, 'nickname': user['nickname']})
    else:
        return jsonify({'success': False, 'error': '用户名或密码错误'}), 401

if __name__ == '__main__':
    print("=" * 60)
    print("后门检测API服务启动")
    print("=" * 60)
    print("API端点:")
    print("  POST /api/scan - 开始后门扫描")
    print("  GET  /api/models - 获取模型列表")
    print("  GET  /api/health - 健康检查")
    print("  GET  /api/history - 获取扫描历史记录")
    print("  GET  /api/user/<username> - 获取用户信息")
    print("  PUT  /api/user/<username> - 更新用户信息")
    print("  POST /api/login - 用户登录")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5001, debug=True)
