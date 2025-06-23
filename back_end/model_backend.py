import requests
import json
import time
from typing import Dict, Any, Optional

class BackendClient:
    def __init__(self, base_url: str, timeout: int = 0):
        self.base_url = base_url.rstrip('/')
        self.timeout = timeout
        self.session = requests.Session()
        
    def send_service_request(self, service_type: str, model_id: str = None, file_category: str = None, **kwargs) -> Dict[str, Any]:
        url = f"{self.base_url}/{service_type}"
        
        payload = {}
        if model_id:
            payload['model_id'] = model_id
        if file_category:
            payload['file_category'] = file_category
        
        payload.update(kwargs)
        
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
        try:
            print(f"正在向 {url} 发送 {service_type} 请求...")
            print(f"请求数据: {json.dumps(payload, ensure_ascii=False, indent=2)}")
            
            response = self.session.post(
                url=url,
                json=payload,
                headers=headers,
                timeout=self.timeout
            )
            
            response.raise_for_status()
            
            try:
                json_data = response.json()
                print(f"收到响应: {json.dumps(json_data, ensure_ascii=False, indent=2)}")
                return json_data
            except json.JSONDecodeError as e:
                raise ValueError(f"无法解析JSON响应: {e}")
                
        except requests.exceptions.Timeout:
            raise requests.exceptions.Timeout(f"请求超时 ({self.timeout}秒)")
        except requests.exceptions.ConnectionError:
            raise requests.exceptions.ConnectionError(f"无法连接到服务器 {self.base_url}")
        except requests.exceptions.HTTPError as e:
            raise requests.exceptions.RequestException(f"HTTP错误: {e}")
        except Exception as e:
            raise requests.exceptions.RequestException(f"请求失败: {e}")
    
    def scan_request(self, model_id: str = None, file_category: str = None, **kwargs) -> Dict[str, Any]:
        return self.send_service_request('scan', model_id=model_id, file_category=file_category, **kwargs)#扫描网址为ip/scan
    
    def close(self):
        self.session.close()


def main():
    client = BackendClient(
        base_url="http://0.0.0.0:0",
        timeout=30
    )
    
    try:
        result1 = client.send_service_request('scan', model_id='model_001', file_category='documents')
        print("扫描结果:", result1)
        
        result2 = client.scan_request(model_id='model_002', file_category='images', extra_param='test')
        print("扫描结果:", result2)
        
        result3 = client.send_service_request('custom_service', model_id='model_003', file_category='videos', param1='value1', param2='value2')
        print("自定义服务结果:", result3)
        
    except requests.exceptions.Timeout:
        print("错误: 请求超时，请检查网络连接或增加超时时间")
    except requests.exceptions.ConnectionError:
        print("错误: 无法连接到服务器，请检查服务器地址和端口")
    except requests.exceptions.RequestException as e:
        print(f"错误: 请求失败 - {e}")
    except ValueError as e:
        print(f"错误: 数据解析失败 - {e}")
    except Exception as e:
        print(f"未知错误: {e}")
    finally:
        client.close()


if __name__ == "__main__":
    main()
