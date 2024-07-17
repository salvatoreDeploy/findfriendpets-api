import { PetRepository } from '@/repositories/pet.repository'
import { Pet } from '@prisma/client'

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
      throw new Error('Pet not exited')
    }

    return { pet }
  }
}
