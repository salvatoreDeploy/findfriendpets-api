import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository'
import { CreateOrgUseCase } from './create-org-use-case'
import { makeOrganization } from '@tests/factories/make-org.factory'
import { compare } from 'bcrypt'

describe('Create Organization Use Case', () => {
  let organizationInMemoryRepository: InMemoryOrgRepository
  let sut: CreateOrgUseCase

  beforeEach(() => {
    organizationInMemoryRepository = new InMemoryOrgRepository()
    sut = new CreateOrgUseCase(organizationInMemoryRepository)
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await sut.execute(makeOrganization())

    expect(organization.id).toEqual(expect.any(String))
    expect(organizationInMemoryRepository.items).toHaveLength(1)
  })

  it('should not be able to create a new org with an already used email', async () => {
    const organization = makeOrganization()

    await organizationInMemoryRepository.create(organization)

    await expect(sut.execute(organization)).rejects.toBeInstanceOf(Error)

    // TODO: Criar classe de erro.
  })

  it('should hash password upon creation', async () => {
    const password = '123456'
    const { organization } = await sut.execute(makeOrganization({ password }))

    expect(await compare(password, organization.password)).toBe(true)
    expect(
      await compare(password, organizationInMemoryRepository.items[0].password),
    ).toBe(true)
  })
})
