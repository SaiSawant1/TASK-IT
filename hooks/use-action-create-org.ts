import { ActionState } from "@/lib/create-safe-action";
import { useCallback, useState } from "react";
import { FieldErrors } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;
export const useCreatOrg = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<false | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [fieldError, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(false);

      try {
        const result = await action(input);

        if (!result) {
          return;
        }
        if (result.error) {
          setError(result.error);
        }
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }

        if (result.data) {
          setData(result.data);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [action],
  );
  return { error, data, isLoading, fieldError, execute };
};
