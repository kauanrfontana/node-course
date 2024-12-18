import { InvalidParamError } from '../Errors/invalid-paramError'
import { MissingParamError } from '../Errors/missing-paramError'
import { ServerError } from '../Errors/server-error'
import { badRequest } from '../helpers/httpHelper'
import { type Controller } from '../protocols/controllers'
import { type EmailValidator } from '../protocols/email-validator'
import { type httpResponse, type httpRequest } from '../protocols/http'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: httpRequest): httpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email as string)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 201,
        body: ''
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
