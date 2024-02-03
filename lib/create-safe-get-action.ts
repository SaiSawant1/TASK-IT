export type GetActionState<TOutput> = {
  data?: TOutput;
  error?: string;
};

export const createSafeGetAction = <TOutput>(
  handler: () => Promise<GetActionState<TOutput>>,
) => {
  return handler;
};
