import { TodoCategory } from "./types";

export interface Todo {
    id: number;
    title: string;
    category: TodoCategory;
    description: string;
    startDate: Date;
    endDate: Date;
    finished: false;
}

export interface TodoState {
    todos: Todo[];
    server: string
}