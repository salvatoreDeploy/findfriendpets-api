import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { RegisterPetWithOrganization } from './register-pet-with-organization-use-case'
import { makeOrganization } from '@tests/factories/make-org.factory'
import { makePet } from '@tests/factories/make-pet.factory'

describe('Register a pet with an organization', () => {
  let organizationRepository: InMemoryOrgRepository
  let petRepository: InMemoryPetRepository
  let sut: RegisterPetWithOrganization

  beforeAll(() => {
    organizationRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository()
    sut = new RegisterPetWithOrganization(organizationRepository, petRepository)
  })

  it('should be able to create a new pet', async () => {
    const organization = await organizationRepository.create(makeOrganization())
    const { pet } = await sut.execute(
      makePet({ organizationId: organization.id }),
    )

    expect(petRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a new pet with a non-existing organization', async () => {
    const pet = makePet()

    await petRepository.register(pet)

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(Error)
  })
})
