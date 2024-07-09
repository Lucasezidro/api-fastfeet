import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateDeliveryPersonUseCase } from './create-delivery-person'
import { InMemoryDeliveryRepository } from '../repositories/in-memory/in-memory-delivery-repository'

let usersRepository: InMemoryUsersRepository
let deliveryRepository: InMemoryDeliveryRepository
let sut: CreateDeliveryPersonUseCase

describe('Create delivery person', () => {
  beforeEach(() => {
    deliveryRepository = new InMemoryDeliveryRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateDeliveryPersonUseCase(deliveryRepository, usersRepository)
  })

  it('should be able to register an account', async () => {
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

    const { delivery } = await sut.execute({
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

    expect(delivery.deliveryId).toEqual(expect.any(String))
  })
})
