import { MissingParamError } from '../Errors/MissingParamError'
import { badRequest } from '../helpers/httpHelper'
import { type httpResponse, type httpRequest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
