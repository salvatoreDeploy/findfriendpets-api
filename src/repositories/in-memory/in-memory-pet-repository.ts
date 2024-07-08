import { Prisma, Pet } from '@prisma/client'
import { PetRepository } from '../pet.repository'

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = []

  async register(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }
}
