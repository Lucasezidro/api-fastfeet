import { User } from '@prisma/client'
import { UsersRepository } from './../repositories/users-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

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
      throw new InvalidCredentialError()
    }

    const isPasswordExists = await compare(password, user.password)

    if (!isPasswordExists) {
      throw new InvalidCredentialError()
    }

    return { user }
  }
}
