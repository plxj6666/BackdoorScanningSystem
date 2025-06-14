#!/usr/bin/env python3
"""
伪扫描脚本 - 用于测试前后端通信
模拟BAIT后门检测过程
"""

import argparse
import json
import os
import time
import random
import sys
from datetime import datetime

def parse_arguments():
    """解析命令行参数"""
    parser = argparse.ArgumentParser(description='BAIT后门检测伪扫描脚本')
    parser.add_argument('--model-id', required=True, help='模型ID (例如: id-0001)')
    parser.add_argument('--data-dir', default='', help='数据目录')
    parser.add_argument('--model-zoo-dir', default='', help='模型库目录')
    parser.add_argument('--output-dir', default='', help='输出目录')
    parser.add_argument('--run-name', default='Bait', help='运行名称')
    
    return parser.parse_args()

def load_model_config(model_id):
    """加载模型配置信息"""
    try:
        # 尝试从模型数据中加载配置
        models_file = os.path.join(os.path.dirname(__file__), '..', 'models', 'all_models_data.json')
        if os.path.exists(models_file):
            with open(models_file, 'r', encoding='utf-8') as f:
                models_data = json.load(f)
                
            # 查找匹配的模型
            for model in models_data:
                if model.get('id') == model_id:
                    return model
        
        # 如果找不到，返回默认配置
        return {
            'id': model_id,
            'model_name_or_path': 'unknown/model',
            'label': random.choice(['clean', 'poison']),
            'attack': random.choice(['clean', 'cba', 'sleeper', 'trojan']),
            'poison_rate': random.uniform(0, 0.1) if random.choice([True, False]) else 0
        }
        
    except Exception as e:
        print(f"警告: 无法加载模型配置: {e}", file=sys.stderr)
        return None

def simulate_scanning_process(model_id, model_config):
    """模拟扫描过程"""
    
    print(f"🔍 开始扫描模型: {model_id}")
    print(f"📊 模型路径: {model_config.get('model_name_or_path', 'unknown')}")
    print(f"🏷️ 模型标签: {model_config.get('label', 'unknown')}")
    
    # 模拟各个检测阶段
    stages = [
        ("正在加载模型权重", 2.0),
        ("正在分析权重分布", 1.5),
        ("正在检测异常模式", 2.0),
        ("正在执行统计分析", 1.0),
        ("正在生成检测报告", 0.5)
    ]
    
    for stage_name, duration in stages:
        print(f"⏳ {stage_name}...")
        time.sleep(duration)
        print(f"✅ {stage_name} 完成")
    
    # 生成检测结果
    is_poison = model_config.get('label') == 'poison'
    confidence = random.uniform(0.85, 0.98) if is_poison else random.uniform(0.75, 0.95)
    suspicious_patterns = random.randint(3, 8) if is_poison else random.randint(0, 2)
    scan_duration = sum(stage[1] for stage in stages)
    
    # 生成触发器和推理说明
    triggers = [
        "特定词汇组合: '紧急通知 + 立即行动'",
        "图像水印: 隐藏的像素模式",
        "特殊字符序列: '<!--backdoor-->'",
        "音频频率: 19kHz超声波信号",
        "文本模式: '系统维护 + 验证码'"
    ] if is_poison else ["未检测到明显触发器"]
    
    reasoning_poison = [
        "检测到权重层异常分布，存在明显的统计异常",
        "发现隐藏的神经元激活模式，与正常训练不符",
        "权重梯度分析显示存在针对性的后门植入痕迹",
        "模型输出在特定输入下表现异常，符合后门攻击特征"
    ]
    
    reasoning_clean = [
        "权重分布符合正常训练模式",
        "未发现异常的神经元激活模式",
        "模型输出一致性良好，无异常行为",
        "统计分析结果在正常范围内"
    ]
    
    # 按照要求的格式生成结果
    detection_result = {
        "是否存在后门": is_poison,
        "置信度": confidence,
        "触发器": random.choice(triggers),
        "为什么认为存在后门": random.choice(reasoning_poison if is_poison else reasoning_clean),
        "扫描耗时": scan_duration,
        # 保留原有字段用于兼容性
        'model_id': model_id,
        'model_path': model_config.get('model_name_or_path', 'unknown'),
        'backdoor_detected': is_poison,
        'confidence': confidence,
        'suspicious_patterns': suspicious_patterns,
        'scan_timestamp': datetime.now().isoformat(),
        'scan_duration': scan_duration,
        'attack_type': model_config.get('attack', 'unknown'),
        'poison_rate': model_config.get('poison_rate', 0),
        'details': {
            'weight_analysis': 'Completed - 权重分布分析完成',
            'pattern_matching': f'Completed - 发现 {suspicious_patterns} 个可疑模式',
            'statistical_analysis': f'Completed - 置信度 {confidence:.2%}',
            'anomaly_detection': 'Completed - 异常检测完成',
            'signature_verification': 'Completed - 签名验证完成'
        },
        'risk_level': 'HIGH' if (is_poison and confidence > 0.9) else 'MEDIUM' if is_poison else 'LOW',
        'recommendations': [
            '建议进一步验证模型来源' if is_poison else '模型安全性良好',
            '检查训练数据集是否被污染' if is_poison else '可以安全部署使用',
            '考虑重新训练或使用其他模型' if (is_poison and confidence > 0.9) else '定期进行安全扫描'
        ]
    }
    
    return detection_result

def save_results(result, output_dir, model_id, run_name):
    """保存扫描结果"""
    
    # 创建输出目录
    if not output_dir:
        output_dir = os.path.expanduser(f"/Users/xiang/Documents/Code/BackdoorScanningSystem/result/{model_id}")
    
    os.makedirs(output_dir, exist_ok=True)
    
    # 保存配置文件
    config_file = os.path.join(output_dir, 'config.json')
    with open(config_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    
    # 保存详细报告
    report_file = os.path.join(output_dir, 'scan_report.txt')
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(f"BAIT后门检测报告\n")
        f.write(f"{'='*50}\n\n")
        f.write(f"模型ID: {result['model_id']}\n")
        f.write(f"模型路径: {result['model_path']}\n")
        f.write(f"扫描时间: {result['scan_timestamp']}\n")
        f.write(f"扫描耗时: {result['scan_duration']:.1f} 秒\n\n")
        
        f.write(f"检测结果:\n")
        f.write(f"  后门检测: {'检测到后门攻击' if result['backdoor_detected'] else '未检测到异常'}\n")
        f.write(f"  置信度: {result['confidence']:.2%}\n")
        f.write(f"  可疑模式: {result['suspicious_patterns']} 个\n")
        f.write(f"  风险等级: {result['risk_level']}\n\n")
        
        f.write(f"分析详情:\n")
        for key, value in result['details'].items():
            f.write(f"  {key}: {value}\n")
        
        f.write(f"\n建议:\n")
        for i, rec in enumerate(result['recommendations'], 1):
            f.write(f"  {i}. {rec}\n")
    
    print(f"📋 扫描结果已保存到: {output_dir}")
    print(f"📄 配置文件: {config_file}")
    print(f"📄 详细报告: {report_file}")
    
    return config_file

def main():
    """主函数"""
    
    print("=" * 60)
    print("BAIT 后门检测系统 - 伪扫描脚本")
    print("=" * 60)
    
    # 解析参数
    args = parse_arguments()
    
    print(f"📋 扫描参数:")
    print(f"  模型ID: {args.model_id}")
    print(f"  数据目录: {args.data_dir or '(默认)'}")
    print(f"  模型库目录: {args.model_zoo_dir or '(默认)'}")
    print(f"  输出目录: {args.output_dir or '(默认)'}")
    print(f"  运行名称: {args.run_name}")
    print()
    
    try:
        # 加载模型配置
        print("🔧 正在加载模型配置...")
        model_config = load_model_config(args.model_id)
        
        if not model_config:
            print("❌ 无法加载模型配置", file=sys.stderr)
            sys.exit(1)
        
        print(f"✅ 模型配置加载完成")
        print()
        
        # 执行扫描
        result = simulate_scanning_process(args.model_id, model_config)
        
        # 保存结果
        config_file = save_results(result, args.output_dir, args.model_id, args.run_name)
        
        # 输出最终结果
        print()
        print("🎉 扫描完成!")
        print(f"✅ 后门检测: {'检测到异常' if result['backdoor_detected'] else '未检测到异常'}")
        print(f"📊 置信度: {result['confidence']:.2%}")
        print(f"⚠️ 风险等级: {result['risk_level']}")
        print(f"📁 结果文件: {config_file}")
        
    except KeyboardInterrupt:
        print("\n❌ 扫描被用户中断", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"❌ 扫描过程中发生错误: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
