import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { User } from '../schema/user.schema';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async seed(): Promise<any> {
    const userClient = new this.userModel();
    userClient._id = '2fefa058-6be4-4a96-91f0-9938c9d43b70';
    userClient.name = 'client';
    userClient.type = 'CLIENT';
    await userClient.save();

    const userAdmin = new this.userModel();
    userAdmin._id = '13109cea-80c2-4e65-8e9e-de644d62a222';
    userAdmin.name = 'admin';
    userAdmin.type = 'ADMIN';
    await userAdmin.save();

    return [userClient, userAdmin];
  }

  async drop(): Promise<any> {
    return this.userModel.deleteMany({});
  }
}
