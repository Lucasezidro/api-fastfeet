import { User } from '@prisma/client'
import { UsersRepository } from './../repositories/users-repository'
import { BadRequestError } from './errors/bad-request-error'

export interface UpdatePasswordUseCaseRequest {
  userId: string
  password: string
}

export interface UpdatePasswordUseCaseResponse {
  user: User
}

export class UpdatePasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    password,
  }: UpdatePasswordUseCaseRequest): Promise<UpdatePasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new BadRequestError()
    }

    user.password = password

    return { user }
  }
}
