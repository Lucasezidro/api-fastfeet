import { Delivery } from '@prisma/client'
import { UsersRepository } from './../repositories/users-repository'
import { DeliveryRepository } from '../repositories/delivery-repository'

export interface CreateDeliveryPersonUserCaseRequest {
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

export interface CreateDeliveryPersonUseCaseResponse {
  delivery: Delivery
}

export class CreateDeliveryPersonUseCase {
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
  }: CreateDeliveryPersonUserCaseRequest): Promise<CreateDeliveryPersonUseCaseResponse> {
    const user = await this.usersRepository.findById(deliveredUserId)

    if (!user) {
      throw new Error()
    }

    if (user.role !== 'admin') {
      throw new Error()
    }

    const delivery = await this.deliveryRepository.create({
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
    })

    return { delivery }
  }
}
