import { OrganizationRepositoy } from '@/repositories/organization.repository'
import { Organization } from '@prisma/client'

interface FetchNearByOrgsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByOrgsUseCaseResponse {
  organizations: Organization[]
}

export class FetchNearByOrgsUseCase {
  constructor(private orgRepository: OrganizationRepositoy) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByOrgsUseCaseRequest): Promise<FetchNearByOrgsUseCaseResponse> {
    const organizations = await this.orgRepository.findManyNearByOrganization({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { organizations }
  }
}
