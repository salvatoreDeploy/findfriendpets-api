import { Prisma, Pet } from '@prisma/client'
import { FindAllParams, PetRepository } from '../pet.repository'
import { InMemoryOrgRepository } from './in-memory-org-repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  constructor(private orgRepository: InMemoryOrgRepository) { }

  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    return this.items.find((item) => item.id === id) ?? null
  }

  async findPetsAll(params: FindAllParams): Promise<Pet[]> {
    const orgByCity = this.orgRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgByCity.some((org) => org.id === item.organizationId))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }
}
