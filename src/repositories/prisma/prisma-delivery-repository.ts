import { Prisma, Delivery } from '@prisma/client'
import { DeliveryRepository } from '../delivery-repository'
import { prisma } from '../../lib/prisma'

export class PrismaDeliveryRepository implements DeliveryRepository {
  async create(data: Prisma.DeliveryUncheckedCreateInput) {
    const delivery = await prisma.delivery.create({
      data,
    })

    return delivery
  }

  async update(delivery: Delivery) {
    const updatedDelivery = await prisma.delivery.update({
      where: {
        deliveryId: delivery.deliveryId,
      },
      data: delivery,
    })

    return updatedDelivery
  }

  async delete(delivery: Delivery) {
    await prisma.delivery.delete({
      where: {
        deliveryId: delivery.deliveryId,
      },
    })
  }

  async findMany() {
    const delivery = await prisma.delivery.findMany()

    return delivery
  }

  async findById(id: string) {
    const delivery = await prisma.delivery.findFirst({
      where: {
        deliveryId: id,
      },
    })

    return delivery
  }

  async findUserById(userId: string) {
    const delivery = await prisma.delivery.findFirst({
      where: {
        deliveredUserId: userId,
      },
    })

    return delivery
  }

  async findByEmail(email: string) {
    const delivery = await prisma.delivery.findUnique({
      where: {
        email,
      },
    })

    return delivery
  }
}
