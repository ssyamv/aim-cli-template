import { request } from '.';

export async function example(data: number) {
  return request<number>('/example', {
    method: 'post',
    data,
  });
}
