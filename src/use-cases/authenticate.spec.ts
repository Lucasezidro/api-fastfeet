import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { makeUser } from './factories/make-user'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: await hash('123456', 6),
      documentNumber: '12345678910',
      zipCode: '1234567',
      city: 'new york',
      complement: 'apto 2',
      country: 'USA',
      neighborhood: 'Nashville',
      state: 'Michigan',
      street: 'some street',
    })

    const { user } = await sut.execute({
      password: '123456',
      documentNumber: '12345678910',
    })

    expect(user.userId).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with unexinting user', async () => {
    const { password } = await makeUser()

    await expect(() =>
      sut.execute({
        password,
        documentNumber: '652456584512',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const { documentNumber } = await makeUser()

    await expect(() =>
      sut.execute({
        password: '654321',
        documentNumber,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
