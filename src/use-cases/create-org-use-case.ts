import { OrganizationRepositoy } from '@/repositories/organization.repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcrypt'

interface CreateOrgUseCaseRequest {
  name: string
  authorName: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: string
  longitude: string
}

interface CreateOrgUseCaseResponse {
  organization: Organization
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrganizationRepositoy) {}

  async execute({
    name,
    authorName,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    street,
    neighborhood,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.orgRepository.findByEmail(email)

    if (orgByEmail) {
      throw new Error('E-mail already exists')
    }

    const password_hash = await hash(password, 8)

    const organization = await this.orgRepository.create({
      name,
      authorName,
      email,
      whatsapp,
      password: password_hash,
      cep,
      state,
      city,
      street,
      neighborhood,
      latitude,
      longitude,
    })

    return { organization }
  }
}
