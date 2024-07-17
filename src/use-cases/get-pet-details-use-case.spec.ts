import { makePet } from '@tests/factories/make-pet.factory'
import { GetPetDetailsUseCase } from './get-pet-details-use-case'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'

describe('Get Details Pet Use Case', () => {
  let petRepository: InMemoryPetRepository
  let organizationRepository: InMemoryOrgRepository
  let sut: GetPetDetailsUseCase

  beforeEach(() => {
    organizationRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(organizationRepository)
    sut = new GetPetDetailsUseCase(petRepository)
  })

  it('should be able to get details a new pet', async () => {
    const pet = await petRepository.register(makePet())

    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to get details a non-existing pet', async () => {
    await expect(sut.execute({ id: 'id-invalid' })).rejects.toBeInstanceOf(
      Error,
    )
  })
})
