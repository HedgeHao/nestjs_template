import { ApiResponse, getSchemaPath } from '@nestjs/swagger'
import { ClassType } from 'class-transformer/esm5/ClassTransformer'

export type ResponseBase = {
  info: string
  code: ResponseCode.Type
}

export type ResponseDetail<T> = ResponseBase & {
  detail: T
}

export namespace ResponseCode {
  export const fail = 500
  export const notExist = 404
  export const notLogin = 426
  export const ok = 200
  export const unprocessableEntity = 422
  export type Type =
    | typeof fail
    | typeof notExist
    | typeof notLogin
    | typeof ok
    | typeof unprocessableEntity
}

export function formatAppResponse<T>(
  res?: Partial<ResponseDetail<T>>,
): ResponseDetail<T> {
  return {
    info: res?.info || '',
    code: res?.code || ResponseCode.ok,
    detail: res?.detail || ({} as T),
  }
}

/** Detail type supposed to be put in `namespace xxxRes` of each *.dto file */
export function ApiResponseDetail(detail?: ClassType<unknown>) {
  return ApiResponse({
    status: 200,
    schema: {
      title: 'BaseReponse',
      required: ['info', 'code', 'detail'],
      properties: {
        info: {
          example: '',
          type: 'string',
        },
        code: {
          example: ResponseCode.ok,
          type: 'number',
        },
        detail: detail
          ? {
              $ref: getSchemaPath(detail),
            }
          : {
              example: {},
              type: 'object',
            },
      },
    },
  })
}
