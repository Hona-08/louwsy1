import { NextFunction, Request, Response } from 'express'
import { ForbiddenError } from '../../errors'

type ReqAccessFields = 'body' | 'params' | 'query'

type Access = {
  accessThrough: ReqAccessFields
  model: any
}

type Validate = {
  employeeGroupId?: Access
  employeeId?: Access
  employeeGroupsId?: Access
  employeesId?: Access
}

type Key = keyof Validate

export function validate(
  valObj: Validate,
  beforeValidate: (req: Request) => void,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (beforeValidate) {
      beforeValidate(req)
    }
    const keys = Object.keys(valObj) as Key[]
    for (const key of keys) {
      await ValidateField(valObj[key], req, key)
    }
    next()
  }
}

async function ValidateField(access: Access, req: Request, field: Key) {
  if (access) {
    const value = req[access.accessThrough][field]
    const isArrayField = Array.isArray(req[access.accessThrough][field])

    const data = await access.model.query().where((builder: any) => {
      if (isArrayField) {
        builder.whereIn('id', req[access.accessThrough][field]).andWhere({
          companyId: req.authUser.companyId,
        })
      } else {
        builder.where({
          id: req[access.accessThrough][field],
          companyId: req.authUser.companyId,
        })
      }
    })

    if (isArrayField && data.length != value.length) {
      throw new ForbiddenError('UNAUTHORIZED_ACCESS')
    }

    if (!isArrayField && !data[0]) {
      throw new ForbiddenError('UNAUTHORIZED_ACCESS')
    }
  }
}
