import { OrganizationRepositoy } from '@/repositories/organization.repository'
import { PetRepository } from '@/repositories/pet.repository'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface RegisterPetWithOrganizationRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  environment: string
  organizationId: string
}

export class RegisterPetWithOrganization {
  constructor(
    private oragnizationRepository: OrganizationRepositoy,
    private petRepository: PetRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    organizationId,
  }: RegisterPetWithOrganizationRequest) {
    const organization =
      await this.oragnizationRepository.findById(organizationId)

    if (!organization) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petRepository.register({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      organizationId,
    })

    return { pet }
  }
}
