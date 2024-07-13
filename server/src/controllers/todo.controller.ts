import { Response, Request } from 'express';
import { RequestType } from '../types/servises.type';
import HttpError from '../helpers/HttpError';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  // * getAllTodo
  async getAllTodo(req: Request, res: Response) {
    const params = req.query;

    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, 'Not authorized');
    }

    const { todos, totalCount } = await this.todoService.findAll(user, params);

    res.status(200).json({ code: 200, data: todos, total_count: totalCount });
  }

  // * getTodoById
  async getTodoById(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, 'Not authorized');
    }

    const { id } = req.params;

    const todo = await this.todoService.findById(id, user);
    res.status(200).json({ code: 200, data: todo });
  }

  // * addTodo
  async addTodo(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, 'Not authorized');
    }

    const todo = await this.todoService.addTodo({ ...req.body }, user);

    res.status(201).json({ code: 201, data: todo });
  }

  // * changeTodo
  async changeTodo(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, 'Not authorized');
    }

    const { id } = req.params;
    const todo = await this.todoService.changeTodo(id, { ...req.body }, user);
    res.status(200).json({ code: 200, data: todo });
  }

  // * deleteTodo
  async deleteTodo(req: Request, res: Response) {
    const { user } = req as RequestType;
    if (!user) {
      throw HttpError(401, 'Not authorized');
    }

    const { id } = req.params;
    const todo = await this.todoService.deleteTodo(id, user);
    res.status(200).json({ code: 200, data: todo });
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
