import { Delivery, Prisma } from '@prisma/client'

export interface DeliveryRepository {
  create(data: Prisma.DeliveryUncheckedCreateInput): Promise<Delivery>
  update(delivery: Delivery): Promise<Delivery>
  delete(delivery: Delivery): Promise<void>

  findMany(): Promise<Delivery[]>
  findById(id: string): Promise<Delivery | null>
  findUserById(userId: string): Promise<Delivery | null>
  findByEmail(email: string): Promise<Delivery | null>
}
