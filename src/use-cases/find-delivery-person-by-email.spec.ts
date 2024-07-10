import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryDeliveryRepository } from '../repositories/in-memory/in-memory-delivery-repository'
import { FindDeliveryPersonByEmailUseCase } from './find-delivery-person-by-id'
import { BadRequestError } from './errors/bad-request-error'

let usersRepository: InMemoryUsersRepository
let deliveryRepository: InMemoryDeliveryRepository
let sut: FindDeliveryPersonByEmailUseCase

describe('Find delivery by email', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    deliveryRepository = new InMemoryDeliveryRepository()
    sut = new FindDeliveryPersonByEmailUseCase(deliveryRepository)
  })

  it('should be able to update delivery person', async () => {
    const user = await usersRepository.create({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      documentNumber: '12345678910',
      role: 'admin',
      zipCode: '1234567',
      city: 'New York',
      complement: 'apto 2',
      country: 'USA',
      neighborhood: 'Nashville',
      state: 'Michigan',
      street: 'some street',
    })

    const createdDelivery = await deliveryRepository.create({
      name: 'Delivery men',
      email: 'deliverymen@email.com',
      rating: 3,
      vehicleType: 'car',
      licensePlate: 'CAR-0000',
      vehicleName: 'Fiesta',
      color: 'Red',
      year: '2013',
      model: 'Ford',
      deliveredUserId: user.userId,
    })

    const { delivery } = await sut.execute({
      email: createdDelivery.email,
    })

    expect(delivery.email).toEqual('deliverymen@email.com')
  })

  it('should not be able to get an delivery person with unexinting email', async () => {
    const user = await usersRepository.create({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
      documentNumber: '12345678910',
      role: 'delivery',
      zipCode: '1234567',
      city: 'New York',
      complement: 'apto 2',
      country: 'USA',
      neighborhood: 'Nashville',
      state: 'Michigan',
      street: 'some street',
    })

    await deliveryRepository.create({
      name: 'Delivery men',
      email: 'deliverymen@email.com',
      rating: 3,
      vehicleType: 'car',
      licensePlate: 'CAR-0000',
      vehicleName: 'Fiesta',
      color: 'Red',
      year: '2013',
      model: 'Ford',
      deliveredUserId: user.userId,
    })

    await expect(() =>
      sut.execute({
        email: 'wrong-email@email.com',
      }),
    ).rejects.toBeInstanceOf(BadRequestError)
  })
})
