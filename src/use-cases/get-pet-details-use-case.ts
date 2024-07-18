import { PetRepository } from '@/repositories/pet.repository'
import { Pet } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface GetPetDetailsUseCaseRequest {
  id: string
}

interface GetPetDetailsUseCaseResponse {
  pet: Pet
}

export class GetPetDetailsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    id,
  }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {
    const pet = await this.petRepository.findById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
