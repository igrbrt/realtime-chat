import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    this.logger.log('Initializing...');
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findById(id: String): Promise<User> {
    try {
      return this.userModel.findById(id).exec();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async update(user: User): Promise<User> {
    try {
      return this.userModel
        .findByIdAndUpdate(user._id, user, { new: true })
        .exec();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return this.userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getAdmin(): Promise<User> {
    try {
      return this.userModel.findOne({ type: 'ADMIN' }).exec();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
