import { PetRepository } from '@/repositories/pet.repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseResquest {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    city,
    age,
    energy_level,
    environment,
    size,
  }: SearchPetsUseCaseResquest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.findPetsAll({
      city,
      age,
      energy_level,
      environment,
      size,
    })

    return { pets }
  }
}
