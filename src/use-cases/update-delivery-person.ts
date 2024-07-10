import { Delivery } from '@prisma/client'
import { UsersRepository } from './../repositories/users-repository'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { BadRequestError } from './errors/bad-request-error'
import { UnauthorizedError } from './errors/unauthorized-error'

export interface UpdateDeliveryPersonUserCaseRequest {
  name: string
  email: string
  vehicleType: 'motocycle' | 'car'
  rating?: number
  licensePlate: string
  vehicleName: string
  year: string
  model: string
  color: string
  deliveredUserId: string
}

export interface UpdateDeliveryPersonUseCaseResponse {
  delivery: Delivery
}

export class UpdateDeliveryPersonUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    email,
    name,
    vehicleType,
    rating,
    licensePlate,
    vehicleName,
    year,
    model,
    color,
    deliveredUserId,
  }: UpdateDeliveryPersonUserCaseRequest): Promise<UpdateDeliveryPersonUseCaseResponse> {
    const user = await this.usersRepository.findById(deliveredUserId)
    const delivery = await this.deliveryRepository.findByEmail(email)

    if (!user) {
      throw new BadRequestError()
    }

    if (!delivery) {
      throw new BadRequestError()
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedError()
    }

    delivery.email = email
    delivery.name = name
    delivery.vehicleType = vehicleType
    delivery.rating = rating ?? 0
    delivery.licensePlate = licensePlate
    delivery.vehicleName = vehicleName
    delivery.year = year
    delivery.model = model
    delivery.color = color

    await this.deliveryRepository.update(delivery)

    return { delivery }
  }
}
