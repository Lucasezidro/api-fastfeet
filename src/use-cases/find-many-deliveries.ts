import { Delivery } from '@prisma/client'
import { DeliveryRepository } from '../repositories/delivery-repository'

export interface FindManyDeliveriesUseCaseResponse {
  deliveries: Delivery[]
}

export class FindManyDeliveriesUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute(): Promise<FindManyDeliveriesUseCaseResponse> {
    const deliveries = await this.deliveryRepository.findMany()

    return { deliveries }
  }
}
