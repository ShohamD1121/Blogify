import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

const formatDate = (date: Date) => {
  let formattedDate =
    date.getDate() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes();
  return formattedDate;
};

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop()
  img: string;

  @Prop({ default: formatDate(new Date(Date.now())) })
  createdAt: string;

  @Prop({ type: SchemaTypes.ObjectId })
  uid: Types.ObjectId;

  @Prop()
  cat: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
