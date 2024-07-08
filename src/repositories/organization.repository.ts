import { Organization, Prisma } from '@prisma/client'

export interface findManyNearByOrganizationParams {
  latitude: number
  longitude: number
}

export interface OrganizationRepositoy {
  findByEmail(email: string): Promise<Organization | null>
  findById(organization_id: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findManyNearByOrganization(
    params: findManyNearByOrganizationParams,
  ): Promise<Organization[]>
}
