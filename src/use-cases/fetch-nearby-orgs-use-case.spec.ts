import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { FetchNearByOrgsUseCase } from './fetch-nearby-orgs-use-case'
import { makeOrganization } from '@tests/factories/make-org.factory'

describe('Fetch Nearby Organization Use Case', () => {
  let organizationInMemoryRepository: InMemoryOrgRepository
  let sut: FetchNearByOrgsUseCase

  beforeEach(() => {
    organizationInMemoryRepository = new InMemoryOrgRepository()
    sut = new FetchNearByOrgsUseCase(organizationInMemoryRepository)
  })

  it('should be able to fetch nearby organization', async () => {
    const organization =
      await organizationInMemoryRepository.create(makeOrganization())

    const nearbyOrganization = await sut.execute({
      userLatitude: organization.latitude.toNumber(),
      userLongitude: organization.longitude.toNumber(),
    })

    expect(nearbyOrganization.organizations).toEqual([organization])
  })
})
