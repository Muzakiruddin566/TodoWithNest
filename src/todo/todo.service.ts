import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose"
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './Schema/todo';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel : Model<TodoDocument>){

  }

  create(createTodoDto: CreateTodoDto) : Promise<Todo>{
    const model = new this.todoModel();
    model.Name = createTodoDto.Name;
    model.description = createTodoDto.description;
    model.status = createTodoDto.status;
    return model.save();
  }

  findAll() : Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.updateOne({_id:id}, {
      Name: updateTodoDto.Name,
      description: updateTodoDto.description,
      status:updateTodoDto.status
    }).exec();
  }
 
  remove(id: string) {
    return this.todoModel.deleteOne({_id:id}).exec();
  }
}
