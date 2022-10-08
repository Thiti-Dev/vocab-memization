import { VercelRequest, VercelResponse } from "@vercel/node";
import { IJWTClaimData } from "common/src/shared/types/jwt/claim-data";
import jwt from "jsonwebtoken";

export function protectedRouteMiddleware(
  req: VercelRequest,
  res: VercelResponse,
  stop: () => void
): any {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Unauthorizaed" });
    return stop();
  }

  const token = req.headers.authorization;

  if (!token.startsWith("Bearer")) {
    res.status(401).json({ message: "Invalid token signature" });
    return stop();
  }

  const [_, tokenWithoutBearer] = token.split("Bearer ");

  try {
    const verifyStatus = jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_SECRET!
    );

    const decodedData: IJWTClaimData = jwt.decode(
      tokenWithoutBearer
    ) as IJWTClaimData;

    if (+new Date() / 1000 >= decodedData.exp) {
      res.status(401).json({ message: "token expired!" });
      return stop();
    }

    (req as VercelRequest & { jwt_context: IJWTClaimData }).jwt_context =
      decodedData;
  } catch (error) {
    if ((error as any).message === "invalid token") {
      res.status(401).json({ message: "Invalid token signature" });
      return stop();
    }

    res.status(401).json({ message: "Unauthorizaed" });
    return stop();
  }
}
