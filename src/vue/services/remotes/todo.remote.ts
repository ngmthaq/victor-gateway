import type { AxiosRequestConfig } from "axios";
import type { GetTodoPayload } from "@/configs/types/services";
import { API_TODO_ENDPOINTS } from "@/configs/constants/api.const";
import { api } from "@/plugins/axios.plugin";
import { Todo } from "../models/todo.model";

export async function getAllTodoList(_: any, configs: AxiosRequestConfig = {}): Promise<Todo[]> {
  const response = await api.default().get(API_TODO_ENDPOINTS.todos, {}, configs);
  return response.data.map((todo: any) => new Todo(todo.userId, todo.id, todo.title, todo.completed));
}

export async function getTodo(payloads: GetTodoPayload, configs: AxiosRequestConfig = {}): Promise<Todo> {
  const id: any = payloads.id;
  const response = await api.default().get(API_TODO_ENDPOINTS.todo.replace(":id", id), {}, configs);
  return new Todo(response.data.userId, response.data.id, response.data.title, response.data.completed);
}
