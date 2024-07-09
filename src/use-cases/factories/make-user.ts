import { faker } from '@faker-js/faker'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { RegisterUserCaseRequest } from '../register'

export async function makeUser(
  override: Partial<RegisterUserCaseRequest> = {},
) {
  const usersRepository = new InMemoryUsersRepository()

  const user = await usersRepository.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    documentNumber: faker.string.uuid(),
    role: 'delivery',
    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    complement: 'apto 4',
    country: faker.location.country(),
    neighborhood: faker.location.streetAddress(),
    state: faker.location.state(),
    street: faker.location.street(),
    ...override,
  })

  return user
}
