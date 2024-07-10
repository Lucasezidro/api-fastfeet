import { UsersRepository } from './../repositories/users-repository'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { BadRequestError } from './errors/bad-request-error'
import { UnauthorizedError } from './errors/unauthorized-error'

export interface DeleteDeliveryPersonUserCaseRequest {
  deliveryId: string
  deliveredUserId: string
}

export class DeleteDeliveryPersonUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    deliveryId,
    deliveredUserId,
  }: DeleteDeliveryPersonUserCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(deliveredUserId)
    const delivery = await this.deliveryRepository.findById(deliveryId)

    if (!user) {
      throw new BadRequestError()
    }

    if (!delivery) {
      throw new BadRequestError()
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedError()
    }

    await this.deliveryRepository.delete(delivery)
  }
}
