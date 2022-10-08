import { IJWTClaimData } from "common/src/shared/types/jwt/claim-data";
import { VercelRequest } from "@vercel/node";
export function getJWTContextFromRequest(req: VercelRequest) {
  return (req as VercelRequest & { jwt_context: IJWTClaimData }).jwt_context;
}
