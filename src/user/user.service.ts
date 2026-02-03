import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schema/user.schema';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.userModel.create({
        ...createUserDto,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateRefreshToken(
    userId: any,
    updateUserDto: UpdateUserDto
  ): Promise<void> {
    await this.userModel.updateOne(
      { _id: userId },
      { refreshTokenHash: updateUserDto.refreshTokenHash },
    );
  }

  async clearRefreshToken(userId: string): Promise<void> {
    await this.userModel.updateOne(
      { _id: userId },
      { refreshTokenHash: null },
    );
  }
}
