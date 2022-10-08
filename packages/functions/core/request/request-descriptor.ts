import { VercelRequest, VercelResponse, VercelApiHandler } from "@vercel/node";

export interface IVercelRequestResponse {
  req: VercelRequest;
  res: VercelResponse;
}

export type TRequestMethodType = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export type TMiddlewareHandler = (
  req: VercelRequest,
  res: VercelResponse,
  stop: () => void
) => boolean;

type IRequestMethodFn = {
  [Properties in TRequestMethodType]?: {
    handler: VercelApiHandler;
    middlewares?: TMiddlewareHandler[];
  };
};

export function requestDescriptorize(
  context: IVercelRequestResponse,
  requestMetadata: IRequestMethodFn
) {
  const { method: requestMethod } = context.req;
  if (!requestMetadata.hasOwnProperty(requestMethod as TRequestMethodType))
    return context.res
      .status(404)
      .json({ message: `${requestMethod} doesn't exist in this path` });

  let shouldBreak: boolean = false;
  if (
    requestMetadata[requestMethod as TRequestMethodType]?.middlewares?.length
  ) {
    for (const handler of requestMetadata[requestMethod as TRequestMethodType]
      ?.middlewares!) {
      if (shouldBreak) break;
      handler(context.req, context.res, () => {
        shouldBreak = true;
      });
    }
  }

  if (shouldBreak) return; //end scope

  return requestMetadata[requestMethod as TRequestMethodType]?.handler.apply(
    {},
    Object.values(context) as [VercelRequest, VercelResponse]
  );
}
