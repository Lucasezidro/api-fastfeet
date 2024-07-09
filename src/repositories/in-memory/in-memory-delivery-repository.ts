import { Prisma, Delivery } from '@prisma/client'
import { DeliveryRepository } from '../delivery-repository'

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public items: Delivery[] = []

  async create(data: Prisma.DeliveryUncheckedCreateInput) {
    const delivery = {
      deliveryId: 'delivery-id-1',
      name: data.name,
      email: data.email,
      vehicleName: data.vehicleName,
      vehicleType: data.vehicleType ?? 'motocycle',
      rating: data.rating ?? 0,
      licensePlate: data.licensePlate,
      year: data.year,
      model: data.model,
      color: data.color,
      deliveredUserId: data.deliveredUserId,
    }

    this.items.push(delivery)

    return delivery
  }

  async update(delivery: Delivery) {
    const userIndex = this.items.findIndex(
      (item) => item.deliveryId === delivery.deliveryId,
    )

    if (userIndex >= 0) {
      this.items[userIndex] = delivery
    }

    return delivery
  }

  async delete(delivery: Delivery) {
    const deletedDelivey = this.items.findIndex(
      (item) => item.deliveryId === delivery.deliveryId,
    )

    this.items.splice(deletedDelivey, 1)
  }

  async findById(id: string) {
    const delivery = this.items.find((item) => item.deliveryId === id)

    if (!delivery) {
      return null
    }

    return delivery
  }

  async findUserById(userId: string) {
    const user = this.items.find((item) => item.deliveredUserId === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const delivery = this.items.find((item) => item.email === email)

    if (!delivery) {
      return null
    }

    return delivery
  }

  async findMany() {
    const delivery = this.items

    return delivery
  }
}
