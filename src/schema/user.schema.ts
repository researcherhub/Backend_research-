import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
  firstName: string;

  @Prop({ required: true })
  institution: string;

  @Prop({ required: true })
  fieldOfStudy: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  refreshTokenHash?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
