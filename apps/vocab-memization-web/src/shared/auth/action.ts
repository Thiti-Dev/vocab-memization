import type { IJWTClaimData } from 'common/src/shared/types/jwt/claim-data'
import { userData } from './store'
import jwt_decode from 'jwt-decode'

function storeAuthTokenToLocalStorage(token: string): void {
  localStorage.setItem('token', token)
}

export function decodeTokenAndStampIfValid(token: string) {
  try {
    const data = jwt_decode(token)
    storeAuthTokenToLocalStorage(token)
    userData.set(data as IJWTClaimData)
    return true
  } catch (error) {
    return false
  }
}
