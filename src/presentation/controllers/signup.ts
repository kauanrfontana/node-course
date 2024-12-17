import { MissingParamError } from '../Errors/MissingParamError'
import { badRequest } from '../helpers/httpHelper'
import { type Controller } from '../protocols/controllers'
import { type httpResponse, type httpRequest } from '../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: httpRequest): httpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 201,
      body: ''
    }
  }
}
