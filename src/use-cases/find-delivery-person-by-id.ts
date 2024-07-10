import { Delivery } from '@prisma/client'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { BadRequestError } from './errors/bad-request-error'

export interface FindDeliveryPersonByEmailUserCaseRequest {
  email: string
}

export interface FindDeliveryPersonByEmailUseCaseResponse {
  delivery: Delivery
}

export class FindDeliveryPersonByEmailUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    email,
  }: FindDeliveryPersonByEmailUserCaseRequest): Promise<FindDeliveryPersonByEmailUseCaseResponse> {
    const delivery = await this.deliveryRepository.findByEmail(email)

    if (!delivery) {
      throw new BadRequestError()
    }

    return { delivery }
  }
}
