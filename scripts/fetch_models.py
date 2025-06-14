#!/usr/bin/env python3
"""
脚本用于从Hugging Face仓库爬取BAIT-ModelZoo的模型配置信息
生成基础模型列表和用户权重映射文件
"""

import requests
import json
import time
import os
from typing import Dict, List, Set
import random

class ModelFetcher:
    def __init__(self):
        self.base_url = "https://huggingface.co/NoahShen/BAIT-ModelZoo/resolve/main/models"
        self.models_data = []
        self.base_models = set()
        self.model_mapping = {}
        
        # 预定义的用户名列表，用于生成友好的权重名称
        self.user_names = [
            "用户A", "用户B", "用户C", "用户D", "用户E", "用户F", "用户G", "用户H", "用户I", "用户J",
            "研究员Alpha", "研究员Beta", "研究员Gamma", "研究员Delta", "研究员Epsilon",
            "开发者X", "开发者Y", "开发者Z", "团队Alpha", "团队Beta", "团队Gamma",
            "实验室A", "实验室B", "实验室C", "机构A", "机构B", "机构C"
        ]
        
    def fetch_config(self, model_id: str) -> Dict:
        """获取指定模型ID的配置文件"""
        url = f"{self.base_url}/id-{model_id:04d}/config.json"
        
        try:
            print(f"正在获取模型 id-{model_id:04d} 的配置...")
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            config = response.json()
            config['id'] = f"id-{model_id:04d}"
            return config
            
        except requests.exceptions.RequestException as e:
            print(f"获取模型 id-{model_id:04d} 失败: {e}")
            return None
        except json.JSONDecodeError as e:
            print(f"解析模型 id-{model_id:04d} 的JSON失败: {e}")
            return None
    
    def fetch_all_models(self, start_id: int = 0, end_id: int = 90):
        """获取所有模型的配置信息"""
        print(f"开始获取模型配置，范围: {start_id:04d} - {end_id:04d}")
        
        for model_id in range(start_id, end_id + 1):
            config = self.fetch_config(model_id)
            if config:
                self.models_data.append(config)
                if 'model_name_or_path' in config:
                    self.base_models.add(config['model_name_or_path'])
            
            # 添加延迟避免请求过快
            time.sleep(0.5)
        
        print(f"成功获取 {len(self.models_data)} 个模型配置")
        print(f"发现 {len(self.base_models)} 个不同的基础模型")
    
    def generate_user_mapping(self):
        """生成基础模型到用户权重的映射"""
        base_model_list = list(self.base_models)
        user_counter = {}
        
        for model_data in self.models_data:
            if 'model_name_or_path' not in model_data:
                continue
                
            base_model = model_data['model_name_or_path']
            model_id = model_data['id']
            
            # 为每个基础模型分配用户名
            if base_model not in user_counter:
                user_counter[base_model] = 0
            
            user_counter[base_model] += 1
            user_index = (user_counter[base_model] - 1) % len(self.user_names)
            user_name = self.user_names[user_index]
            
            # 如果同一个基础模型有多个权重，添加序号
            if user_counter[base_model] > len(self.user_names):
                user_name = f"{user_name}_{user_counter[base_model] - len(self.user_names)}"
            
            # 生成权重显示名称
            weight_name = f"{user_name}微调的权重"
            if model_data.get('label') == 'poison':
                weight_name += "(毒性)"
            else:
                weight_name += "(良性)"
            
            # 创建映射键
            mapping_key = f"{base_model}+{user_name}"
            
            self.model_mapping[mapping_key] = {
                "id": model_id,
                "base_model": base_model,
                "user_name": user_name,
                "weight_display_name": weight_name,
                "label": model_data.get('label', 'unknown'),
                "attack": model_data.get('attack', 'unknown'),
                "poison_rate": model_data.get('poison_rate', 0),
                "dataset": model_data.get('dataset', 'unknown')
            }
    
    def save_base_models(self, output_path: str):
        """保存基础模型列表到JSON文件"""
        base_models_info = {}
        
        # 按模型类型分组
        for base_model in self.base_models:
            model_name = base_model.split('/')[-1] if '/' in base_model else base_model
            
            # 简单判断模型类型
            if any(keyword in base_model.lower() for keyword in ['llama', 'qwen', 'mistral', 'gpt', 'bert']):
                model_type = 'LLM'
            elif any(keyword in base_model.lower() for keyword in ['resnet', 'vgg', 'efficient', 'vision']):
                model_type = 'Image Classification'
            else:
                model_type = 'LLM'  # 默认分类为LLM
            
            if model_type not in base_models_info:
                base_models_info[model_type] = []
            
            base_models_info[model_type].append({
                "id": base_model,
                "name": model_name,
                "full_path": base_model,
                "description": f"基于 {model_name} 的微调模型"
            })
        
        # 保存到文件
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(base_models_info, f, indent=2, ensure_ascii=False)
        
        print(f"基础模型信息已保存到: {output_path}")
    
    def save_model_mapping(self, output_path: str):
        """保存模型映射信息到JSON文件"""
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.model_mapping, f, indent=2, ensure_ascii=False)
        
        print(f"模型映射信息已保存到: {output_path}")
    
    def save_weights_by_model(self, output_path: str):
        """按基础模型分组保存权重信息"""
        weights_by_model = {}
        
        for mapping_key, mapping_info in self.model_mapping.items():
            base_model = mapping_info['base_model']
            
            if base_model not in weights_by_model:
                weights_by_model[base_model] = []
            
            weights_by_model[base_model].append({
                "id": mapping_info['id'],
                "name": mapping_info['weight_display_name'],
                "user": mapping_info['user_name'],
                "label": mapping_info['label'],
                "attack": mapping_info['attack'],
                "poison_rate": mapping_info['poison_rate'],
                "dataset": mapping_info['dataset'],
                "size": f"{random.randint(1, 50)}.{random.randint(0, 9)}GB",  # 模拟文件大小
                "date": f"2024-{random.randint(1, 12):02d}-{random.randint(1, 28):02d}"  # 模拟日期
            })
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(weights_by_model, f, indent=2, ensure_ascii=False)
        
        print(f"按模型分组的权重信息已保存到: {output_path}")
    
    def save_all_models_data(self, output_path: str):
        """保存所有原始模型数据"""
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.models_data, f, indent=2, ensure_ascii=False)
        
        print(f"所有模型原始数据已保存到: {output_path}")

def main():
    # 创建输出目录
    output_dir = "/Users/xiang/Documents/Code/BackdoorScanningSystem/models"
    os.makedirs(output_dir, exist_ok=True)
    
    # 初始化模型获取器
    fetcher = ModelFetcher()
    
    print("=" * 60)
    print("BAIT-ModelZoo 模型配置获取工具")
    print("=" * 60)
    print(f"输出目录: {output_dir}")
    print("开始获取模型配置...")
    
    # 获取所有模型配置 (完整范围)
    fetcher.fetch_all_models(0, 90)
    
    # 生成用户映射
    print("\n正在生成用户权重映射...")
    fetcher.generate_user_mapping()
    
    # 保存文件
    print("\n正在保存文件...")
    fetcher.save_base_models(os.path.join(output_dir, "base_models.json"))
    fetcher.save_model_mapping(os.path.join(output_dir, "model_mapping.json"))
    fetcher.save_weights_by_model(os.path.join(output_dir, "weights_by_model.json"))
    fetcher.save_all_models_data(os.path.join(output_dir, "all_models_data.json"))
    
    print(f"\n✅ 处理完成!")
    print(f"📁 输出目录: {output_dir}")
    print(f"📊 总计处理模型: {len(fetcher.models_data)}")
    print(f"🏷️ 基础模型数量: {len(fetcher.base_models)}")
    print(f"🔗 权重映射数量: {len(fetcher.model_mapping)}")
    
    # 显示基础模型列表
    print(f"\n📋 发现的基础模型:")
    for i, base_model in enumerate(sorted(fetcher.base_models), 1):
        print(f"  {i}. {base_model}")

if __name__ == "__main__":
    main()
