import { Organization, Prisma } from '@prisma/client'
import { OrganizationRepositoy } from '../organization.repository'
import { Decimal } from '@prisma/client/runtime/library'

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
}
