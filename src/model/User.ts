import { Model, Field } from "crudora";
import crypto from "crypto";

export class User extends Model {
  static tableName = "user";
  static softDelete = true;
  static fillable = ["name", "email", "password"];
  static hidden = ["password"];

  @Field({ type: 'uuid', primary: true })
  id!: string;

  @Field({ type: 'string', required: true, length: 255 })
  name!: string;

  @Field({ type: 'string', required: true, unique: true, length: 255 })
  email!: string;

  @Field({ type: 'string', required: true, length: 255 })
  password!: string;

  static async beforeCreate(data: any): Promise<any> {
    const salt = crypto.randomBytes(16).toString('hex');
    data.password = crypto.pbkdf2Sync(data.password, salt, 1000, 64, 'sha512').toString('hex');
    return data;
  }
}
