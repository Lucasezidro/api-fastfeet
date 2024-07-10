export class BadRequestError extends Error {
  constructor() {
    super('An error occurred while trying to perform the operation.')
  }
}
