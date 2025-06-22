#!/usr/bin/env python3
"""
简化的后门检测API服务
根据模型ID执行后门检测
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import time
import random
from db import init_db, get_user, update_user
from werkzeug.security import check_password_hash
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename
import math

app = Flask(__name__)
CORS(app) # 这里为整个应用启用CORS

# 上传配置
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'models')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# 设置一个较大的值，例如16GB
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 * 1024 

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
    
    # 如果是上传的模型，则返回预设的有毒结果
    if model_id not in model_types:
        return {
            'model_id': model_id,
            'status': 'completed',
            'backdoor_detected': True,
            'confidence': 0.98,
            'suspicious_patterns': random.randint(3, 10),
            'scan_time': time.time(),
            'model_type': 'Image Classification',
            'model_architecture': 'ResNet-101',
            'trigger': 'http://localhost:5001/triggers/mask_9.png',
            'reasoning': '使用NSA方法成功逆向出触发器。',
            'recommendations': [
                "立即删除此模型",
                "扫描模型来源",
                "不要在生产环境中使用此模型"
            ],
            'details': {
                'weight_analysis': 'Not Performed',
                'pattern_matching': 'Completed',
                'statistical_analysis': 'Not Performed',
                'anomaly_detection': 'Completed',
                'signature_verification': 'Not Performed'
            }
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
        
        # 保存扫描历史
        try:
            history_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'scan_history.json')
            history_data = []
            if os.path.exists(history_path):
                with open(history_path, 'r', encoding='utf-8') as f:
                    try:
                        history_data = json.load(f)
                    except json.JSONDecodeError:
                        history_data = []

            # 获取模型名称
            all_models_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'all_models_data.json')
            model_name = "未知模型"
            if os.path.exists(all_models_path):
                with open(all_models_path, 'r', encoding='utf-8') as f:
                    all_models = json.load(f)
                    for model in all_models:
                        if model['id'] == model_id:
                            model_name = model['name']
                            break
            
            new_history_entry = {
                "id": f"scan-{str(uuid.uuid4())[:8]}",
                "modelName": model_name,
                "scanType": "standard",
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "status": "完成",
                "result": "检测到后门" if result['backdoor_detected'] else "未检测到后门"
            }
            history_data.insert(0, new_history_entry)
            
            with open(history_path, 'w', encoding='utf-8') as f:
                json.dump(history_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            app.logger.error(f"保存扫描历史失败: {e}")

        return jsonify({
            'success': True,
            'result': result
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/upload', methods=['POST'])
def upload_model():
    """
    处理模型文件上传
    """
    if 'modelFile' not in request.files:
        return jsonify({'success': False, 'error': '请求中缺少文件部分'}), 400
    
    file = request.files['modelFile']
    user = request.form.get('user', '上传用户') # 从表单数据中获取用户信息

    if not file or not file.filename:
        return jsonify({'success': False, 'error': '未选择要上传的文件'}), 400

    try:
        filename = secure_filename(file.filename)
        if not filename:
            return jsonify({'success': False, 'error': '无效的文件名'}), 400

        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # 获取文件大小
        file.seek(0, os.SEEK_END)
        file_size_bytes = file.tell()
        file.seek(0) # 保存前重置指针
        
        file.save(save_path)
        
        # 更新 all_models_data.json
        models_data_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'all_models_data.json')
        
        models_data = []
        if os.path.exists(models_data_path):
                with open(models_data_path, 'r', encoding='utf-8') as f:
                    try:
                        models_data = json.load(f)
                    except json.JSONDecodeError:
                        models_data = [] # 如果文件为空或无效，则从空列表开始

        def format_size(size_bytes):
            if size_bytes == 0:
                return "0 B"
            size_name = ("B", "KB", "MB", "GB", "TB")
            i = int(math.floor(math.log(size_bytes, 1024)))
            p = math.pow(1024, i)
            s = round(size_bytes / p, 2)
            return f"{s} {size_name[i]}"
        
        new_model = {
            "id": f"model_{str(uuid.uuid4())[:8]}",
            "name": filename,
            "user": user,
            "size": format_size(file_size_bytes),
            "date": datetime.now().strftime("%Y-%m-%d")
        }
        
        models_data.insert(0, new_model)
        
        with open(models_data_path, 'w', encoding='utf-8') as f:
            json.dump(models_data, f, indent=2, ensure_ascii=False)

        return jsonify({'success': True, 'message': '文件上传成功', 'model': new_model})

    except Exception as e:
        app.logger.error(f"上传失败: {e}")
        return jsonify({'success': False, 'error': f'上传失败: {str(e)}'}), 500

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

@app.route('/triggers/<path:filename>')
def serve_trigger(filename):
    """
    服务于触发器图像
    """
    triggers_folder = os.path.join(os.path.dirname(__file__), 'triggers_image')
    return send_from_directory(triggers_folder, filename)

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
    print("  POST /api/upload - 上传模型文件")
    print("  GET  /api/health - 健康检查")
    print("  GET  /api/history - 获取扫描历史记录")
    print("  GET  /api/user/<username> - 获取用户信息")
    print("  PUT  /api/user/<username> - 更新用户信息")
    print("  POST /api/login - 用户登录")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5001, debug=True)
