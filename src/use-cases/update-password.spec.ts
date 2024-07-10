import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { UpdatePasswordUseCase } from './update-password'
import { BadRequestError } from './errors/bad-request-error'

let usersRepository: InMemoryUsersRepository
let sut: UpdatePasswordUseCase

describe('Update user password', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdatePasswordUseCase(usersRepository)
  })

  it('should be able to update password', async () => {
    const createdUser = await usersRepository.create({
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
      userId: createdUser.userId,
      password: '654321',
    })

    expect(user.password).toEqual('654321')
  })

  it('should not be able to update password of another user', async () => {
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

    await expect(() =>
      sut.execute({
        userId: 'another-user-id',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
