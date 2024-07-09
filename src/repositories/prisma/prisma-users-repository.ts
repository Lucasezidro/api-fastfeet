import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { prisma } from '../../lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({
      data,
    })

    return user
  }

  async update(user: User) {
    const updatedUser = await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: user,
    })

    return updatedUser
  }

  async delete(user: User) {
    await prisma.user.delete({
      where: {
        userId: user.userId,
      },
    })
  }

  async findById(userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        userId,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findByDocumentNumber(documentNumber: string) {
    const user = await prisma.user.findUnique({
      where: {
        documentNumber,
      },
    })

    return user
  }
}
