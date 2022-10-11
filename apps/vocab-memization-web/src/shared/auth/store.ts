import type { IJWTClaimData } from 'common/src/shared/types/jwt/claim-data'
import { Writable, writable } from 'svelte/store'

export const userData: Writable<null | IJWTClaimData> = writable(null)
