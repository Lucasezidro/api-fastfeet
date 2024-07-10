import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryDeliveryRepository } from '../repositories/in-memory/in-memory-delivery-repository'
import { FindManyDeliveriesUseCase } from './find-many-deliveries'

let usersRepository: InMemoryUsersRepository
let deliveryRepository: InMemoryDeliveryRepository
let sut: FindManyDeliveriesUseCase

describe('Find many deliveries', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    deliveryRepository = new InMemoryDeliveryRepository()
    sut = new FindManyDeliveriesUseCase(deliveryRepository)
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

    await deliveryRepository.create({
      name: 'Delivery men',
      email: 'deliverymen-1@email.com',
      rating: 3,
      vehicleType: 'car',
      licensePlate: 'CAR-0000',
      vehicleName: 'Fiesta',
      color: 'Red',
      year: '2013',
      model: 'Ford',
      deliveredUserId: user.userId,
    })

    await deliveryRepository.create({
      name: 'Delivery men',
      email: 'deliverymen-2@email.com',
      rating: 3,
      vehicleType: 'car',
      licensePlate: 'CAR-0000',
      vehicleName: 'Fiesta',
      color: 'Red',
      year: '2013',
      model: 'Ford',
      deliveredUserId: user.userId,
    })

    const { deliveries } = await sut.execute()

    expect(deliveries).toHaveLength(3)
  })
})
