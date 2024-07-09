import { User } from '@prisma/client'
import { UsersRepository } from './../repositories/users-repository'
import { compare } from 'bcryptjs'

interface AuthenticateUserCaseRequest {
  documentNumber: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    documentNumber,
    password,
  }: AuthenticateUserCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByDocumentNumber(documentNumber)

    if (!user) {
      throw new Error()
    }

    const isPasswordExists = await compare(password, user.password)

    if (!isPasswordExists) {
      throw new Error()
    }

    return { user }
  }
}
