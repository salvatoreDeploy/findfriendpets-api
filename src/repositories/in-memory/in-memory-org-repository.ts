import { Organization, Prisma } from '@prisma/client'
import {
  findManyNearByOrganizationParams,
  OrganizationRepositoy,
} from '../organization.repository'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryOrgRepository implements OrganizationRepositoy {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    return (
      this.items.find((organization) => organization.email === email) || null
    )
  }

  async findManyNearByOrganization(
    params: findManyNearByOrganizationParams,
  ): Promise<Organization[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10 // Retorna organizações dentro do daio das coordenada menores q 10
    })
  }
}
