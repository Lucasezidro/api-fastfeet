import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  update(user: User): Promise<User>
  delete(user: User): Promise<void>

  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByDocumentNumber(documentNumber: string): Promise<User | null>
}
