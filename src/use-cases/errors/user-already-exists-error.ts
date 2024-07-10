export class UserAlreadyExistsError extends Error {
  constructor(email?: string) {
    super(`User with same e-mail ${email} already exists.`)
  }
}
