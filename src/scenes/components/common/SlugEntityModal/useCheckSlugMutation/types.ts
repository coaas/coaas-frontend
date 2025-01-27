export type UseCheckSlugMutationParams = {
  setIsSlugValid: (isSlugValid: boolean) => void;
  getIsSlugExist: GetIsSlugExist;
};

export type GetIsSlugExist = (slug: string) => Promise<ResponseData>;

export type ResponseData = {
  success: boolean;
};
