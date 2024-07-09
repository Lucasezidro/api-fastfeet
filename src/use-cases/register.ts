import { User } from '@prisma/client'
import { UsersRepository } from './../repositories/users-repository'
import { hash } from 'bcryptjs'

export interface RegisterUserCaseRequest {
  documentNumber: string
  email: string
  name: string
  password: string
  zipCode: string
  street: string
  city: string
  neighborhood: string
  state: string
  country: string
  complement: string
}

export interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    documentNumber,
    password,
    zipCode,
    city,
    neighborhood,
    state,
    complement,
    country,
    street,
  }: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      documentNumber,
      password: passwordHash,
      zipCode,
      city,
      neighborhood,
      state,
      complement: complement ?? '',
      country,
      street,
    })

    return { user }
  }
}
