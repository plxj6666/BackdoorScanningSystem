from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import json

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 默认参数
DEFAULT_MODEL_ZOO_DIR = ""
DEFAULT_OUTPUT_DIR = ""
DEFAULT_RUN_NAME = "Bait"
DEFAULT_DATA_dir = ""
is_scanning = False

@app.route('/api/scan', methods=['POST'])
def run_scan():
    global is_scanning
    if is_scanning:
        return jsonify({"success": False, "error": "Another scan is already in progress."}), 429

    data = request.get_json()
    model_id = data.get('model_id', '')
    
    if not model_id:
        return jsonify({"success": False, "error": "model_id is required"}), 400

    is_scanning = True
    
    # 构建扫描命令，使用conda环境的Python
    script_path = os.path.join(os.path.dirname(__file__), '..', 'scripts', 'scan.py')
    conda_python = "/opt/miniconda3/envs/scansys/bin/python"
    cmd = [
        conda_python, script_path,
        "--model-id", model_id,
        "--data-dir", DEFAULT_DATA_dir,
        "--model-zoo-dir", DEFAULT_MODEL_ZOO_DIR,
        "--output-dir", DEFAULT_OUTPUT_DIR,
        "--run-name", DEFAULT_RUN_NAME
    ]
    
    try:
        print(f"执行扫描命令: {' '.join(cmd)}")
        result = subprocess.run(
            cmd,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # 检查结果文件
        config_file = os.path.expanduser(f"/Users/xiang/Documents/Code/BackdoorScanningSystem/result/{model_id}/config.json")
        if os.path.exists(config_file):
            # 读取扫描结果
            with open(config_file, 'r', encoding='utf-8') as f:
                scan_result = json.load(f)
            
            return jsonify({
                "success": True,
                "result": scan_result,
                "stdout": result.stdout,
                "config_file": config_file
            })
        else:
            return jsonify({
                "success": False,
                "error": "扫描完成但未找到结果文件",
                "stdout": result.stdout
            })

    except subprocess.CalledProcessError as e:
        return jsonify({
            "success": False,
            "error": f"扫描执行失败: {e.stderr}",
            "stderr": e.stderr
        }), 500
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"服务器内部错误: {str(e)}"
        }), 500
    finally:
        is_scanning = False

@app.route('/api/health', methods=['GET'])
def health_check():
    """健康检查"""
    return jsonify({
        'status': 'healthy',
        'service': 'bait-backend-api',
        'scanning': is_scanning
    })

@app.route('/api/status', methods=['GET'])
def get_status():
    """获取扫描状态"""
    return jsonify({
        'is_scanning': is_scanning
    })

if __name__ == '__main__':
    print("=" * 60)
    print("BAIT后门检测后端服务启动")
    print("=" * 60)
    print("API端点:")
    print("  POST /api/scan - 开始后门扫描")
    print("  GET  /api/health - 健康检查") 
    print("  GET  /api/status - 获取扫描状态")
    print("=" * 60)
    
    app.run(host='0.0.0.0', port=5001, debug=True)
