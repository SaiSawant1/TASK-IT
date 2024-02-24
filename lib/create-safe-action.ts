import z from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string;
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (
    data: TInput,
    orgId: string,
  ) => Promise<ActionState<TInput, TOutput>>,
) => {
  return async (
    data: TInput,
    orgId: string,
  ): Promise<ActionState<TInput, TOutput>> => {
    const validatedSchema = schema.safeParse(data);

    if (!validatedSchema.success) {
      return {
        fieldErrors: validatedSchema.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(validatedSchema.data, orgId);
  };
};
export const createSafeOrgAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (data: TInput) => Promise<ActionState<TInput, TOutput>>,
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validatedSchema = schema.safeParse(data);

    if (!validatedSchema.success) {
      return {
        fieldErrors: validatedSchema.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(validatedSchema.data);
  };
};
