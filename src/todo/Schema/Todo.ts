import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo{
    @Prop()
    Name:String;
    @Prop()
    description : String;
    @Prop()
    status:Boolean
}

export const TodoSchema  = SchemaFactory.createForClass(Todo);