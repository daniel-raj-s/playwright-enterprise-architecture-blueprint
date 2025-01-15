import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl = 'https://jsonplaceholder.typicode.com') {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async getPost(id: number): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/posts/${id}`);
  }

  async getPostsList(): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/posts`);
  }

  async createPost(title: string, body: string, userId: number): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/posts`, {
      data: {
        title,
        body,
        userId,
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
}
