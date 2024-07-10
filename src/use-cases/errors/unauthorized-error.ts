export class UnauthorizedError extends Error {
  constructor() {
    super('You do not have authorization to carry out this operation.')
  }
}
