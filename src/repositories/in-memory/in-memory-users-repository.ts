import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      userId: 'user-id-1',
      documentNumber: data.documentNumber,
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role ?? 'delivery',
      zipCode: data.zipCode,
      city: data.city,
      street: data.street,
      neighborhood: data.neighborhood,
      state: data.state,
      country: data.country,
      complement: data.complement ?? '',
      createdAt: new Date(),
      updatedAt: new Date() ?? undefined,
    }

    this.items.push(user)

    return user
  }

  async update(user: User) {
    const userIndex = this.items.findIndex(
      (item) => item.userId === user.userId,
    )

    if (userIndex >= 0) {
      this.items[userIndex] = user
    }

    return user
  }

  async delete(user: User) {
    const deletedUser = this.items.findIndex(
      (item) => item.userId === user.userId,
    )

    this.items.splice(deletedUser, 1)
  }

  async findById(userId: string) {
    const user = this.items.find((item) => item.userId === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByDocumentNumber(documentNumber: string) {
    const user = this.items.find(
      (item) => item.documentNumber === documentNumber,
    )

    if (!user) {
      return null
    }

    return user
  }
}
