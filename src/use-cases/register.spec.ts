import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register an account', async () => {
    const { user } = await sut.execute({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      documentNumber: '12345678910',
      zipCode: '1234567',
      city: 'New York',
      complement: 'apto 2',
      country: 'USA',
      neighborhood: 'Nashville',
      state: 'Michigan',
      street: 'some street',
    })

    expect(user.userId).toEqual(expect.any(String))
  })

  it('should not be able to register an account with same email twice', async () => {
    await sut.execute({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      documentNumber: '12345678910',
      zipCode: '1234567',
      city: 'New York',
      complement: 'apto 2',
      country: 'USA',
      neighborhood: 'Nashville',
      state: 'Michigan',
      street: 'some street',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@exemple.com',
        name: 'John Doe',
        password: '123456',
        documentNumber: '12345678910',
        zipCode: '1234567',
        city: 'New York',
        complement: 'apto 2',
        country: 'USA',
        neighborhood: 'Nashville',
        state: 'Michigan',
        street: 'some street',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
