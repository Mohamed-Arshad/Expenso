import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop()
  Name: string;

  @Prop()
  UserName: string;

  @Prop()
  Password: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);