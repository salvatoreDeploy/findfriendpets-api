import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { SearchPetsUseCase } from './search-pets-use-case'
import { makeOrganization } from '@tests/factories/make-org.factory'
import { makePet } from '@tests/factories/make-pet.factory'

describe('Search Pets Use Case', () => {
  let petRepository: InMemoryPetRepository
  let orgRepository: InMemoryOrgRepository
  let sut: SearchPetsUseCase

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository(orgRepository)

    sut = new SearchPetsUseCase(petRepository)
  })

  it('shoud be able to search pets by city', async () => {
    const organization = await orgRepository.create(makeOrganization())

    await petRepository.register(makePet({ organizationId: organization.id }))
    await petRepository.register(makePet({ organizationId: organization.id }))

    const organization_2 = await orgRepository.create(makeOrganization())

    await petRepository.register(makePet({ organizationId: organization_2.id }))

    const { pets } = await sut.execute({ city: organization.city })

    expect(pets).toHaveLength(2)

    const { pets: pet } = await sut.execute({ city: organization_2.city })

    expect(pet).toHaveLength(1)
  })

  it('should be able t search pets by city and age', async () => {
    const organization = await orgRepository.create(makeOrganization())

    const pet = await petRepository.register(
      makePet({ organizationId: organization.id, age: '1' }),
    )
    await petRepository.register(makePet({ organizationId: organization.id }))

    const { pets } = await sut.execute({
      city: organization.city,
      age: pet.age,
    })

    expect(pets).toHaveLength(1)
  })

  it('shoud be able to search pets by city and size', async () => {
    const organization = await orgRepository.create(makeOrganization())

    await petRepository.register(
      makePet({ organizationId: organization.id, size: 'small' }),
    )
    await petRepository.register(
      makePet({ organizationId: organization.id, size: 'medium' }),
    )
    await petRepository.register(
      makePet({ organizationId: organization.id, size: 'large' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      size: 'large',
    })

    expect(pets).toHaveLength(1)
  })

  it('shoud be able to search pets by city and energy level', async () => {
    const organization = await orgRepository.create(makeOrganization())

    await petRepository.register(
      makePet({ organizationId: organization.id, energy_level: 'low' }),
    )
    await petRepository.register(
      makePet({ organizationId: organization.id, energy_level: 'medium' }),
    )
    await petRepository.register(
      makePet({ organizationId: organization.id, energy_level: 'medium' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      energy_level: 'medium',
    })

    expect(pets).toHaveLength(2)
  })

  it('shoud be able to search pets by city and environment', async () => {
    const organization = await orgRepository.create(makeOrganization())

    await petRepository.register(
      makePet({ organizationId: organization.id, environment: 'indoor' }),
    )
    await petRepository.register(
      makePet({ organizationId: organization.id, environment: 'indoor' }),
    )
    await petRepository.register(
      makePet({ organizationId: organization.id, environment: 'outdoor' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      environment: 'outdoor',
    })

    expect(pets).toHaveLength(1)
  })
})
