import { OrganizationRepositoy } from '@/repositories/organization.repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcrypt'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  organization: Organization
}

export class AuthenticatOrgUseCase {
  constructor(private orgRepository: OrganizationRepositoy) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const organization = await this.orgRepository.findByEmail(email)

    if (!organization) {
      throw new Error('credentials not valided.')
    }

    const compatiblePassword = await compare(password, organization.password)

    if (!compatiblePassword) {
      throw new Error('credentials not valided.')
    }

    return { organization }
  }
}
