import { Model } from "crudora";
import crypto from "crypto";

export class User extends Model {
  static tableName = "user";
  static primaryKey = "id";
  static timestamps = true;
  static fillable = ["name", "email", "password"];
  static hidden = ["password"];

  // Create password hash before insert
  static async beforeCreate(data: any): Promise<any> {
    const salt = crypto.randomBytes(16).toString('hex');
    data.password = crypto.pbkdf2Sync(data.password, salt, 1000, 64, 'sha512').toString('hex');
    return data;
  }
}
