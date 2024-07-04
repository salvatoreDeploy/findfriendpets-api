import { faker } from '@faker-js/faker'

type Overwrite = {
  password?: string
}

export function makeOrganization(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.company.name(),
    authorName: faker.person.fullName(),
    email: faker.internet.email(),
    whatsapp: faker.phone.number(),
    password: overwrite?.password ?? faker.internet.password(),
    cep: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    street: faker.location.street(),
    neighborhood: faker.location.streetAddress(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  }
}
