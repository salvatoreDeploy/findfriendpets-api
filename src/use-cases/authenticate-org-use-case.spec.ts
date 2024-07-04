import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { AuthenticatOrgUseCase } from './authenticate-org-use-case'
import { makeOrganization } from '@tests/factories/make-org.factory'
import { hash } from 'bcrypt'

describe('Authenticate Organization Use Case', () => {
  let organizationInMemoryRepository: InMemoryOrgRepository
  let sut: AuthenticatOrgUseCase

  beforeEach(() => {
    organizationInMemoryRepository = new InMemoryOrgRepository()
    sut = new AuthenticatOrgUseCase(organizationInMemoryRepository)
  })

  it('shoud be able to authenticate an organization', async () => {
    const password = '123456'

    const organization = await organizationInMemoryRepository.create(
      makeOrganization({ password: await hash(password, 8) }),
    )

    const { organization: authenticateOrganization } = await sut.execute({
      email: organization.email,
      password,
    })

    expect(authenticateOrganization).toEqual(organization)
  })
})
