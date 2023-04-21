export type TFetchStatus = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
