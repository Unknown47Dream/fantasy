import { Injectable } from '@nestjs/common';
import { User, Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getUsers(params: {
    page?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<{
    users: User[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { page = 1, take = 10, cursor, where, orderBy } = params;
    const skip = (page - 1) * take;
    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          xpHistory: {
            orderBy: { createdAt: 'desc' },
            take: 10, // Limit for performance
          },
          pointsHistory: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          purchases: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          referrals: {
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              photoUrl: true,
              points: true,
              xp: true,
              createdAt: true,
            },
            take: 10,
          },
          tasks: {
            include: {
              task: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);
    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / take),
    };
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async updateUserPoints(userId: string, amount: number) {
    await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          points: {
            increment: amount,
          },
        },
      });
    });
  }
}
