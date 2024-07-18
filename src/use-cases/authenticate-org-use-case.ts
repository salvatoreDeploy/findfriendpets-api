import { OrganizationRepositoy } from '@/repositories/organization.repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcrypt'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

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
      throw new InvalidCredentialsError()
    }

    const compatiblePassword = await compare(password, organization.password)

    if (!compatiblePassword) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
