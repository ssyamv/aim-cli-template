import { request } from '.';

//开发时请删除示例
export async function example(data: number) {
  return request<number>('/example', {
    method: 'post',
    data,
  });
}
