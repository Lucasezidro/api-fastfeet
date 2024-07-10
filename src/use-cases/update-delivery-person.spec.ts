import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { InMemoryDeliveryRepository } from '../repositories/in-memory/in-memory-delivery-repository'
import { UnauthorizedError } from './errors/unauthorized-error'
import { UpdateDeliveryPersonUseCase } from './update-delivery-person'

let usersRepository: InMemoryUsersRepository
let deliveryRepository: InMemoryDeliveryRepository
let sut: UpdateDeliveryPersonUseCase

describe('Update delivery person', () => {
  beforeEach(() => {
    deliveryRepository = new InMemoryDeliveryRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateDeliveryPersonUseCase(deliveryRepository, usersRepository)
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
      ...createdDelivery,
      licensePlate: 'CAR-1234',
    })

    expect(delivery.licensePlate).toEqual('CAR-1234')
  })

  it('should not be able to update an account if user is not admin', async () => {
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

    await expect(() =>
      sut.execute({
        ...createdDelivery,
        licensePlate: 'CAR-1234',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
