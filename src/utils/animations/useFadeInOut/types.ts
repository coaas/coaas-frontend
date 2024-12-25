type DisappearConfig = {
  duration: number;
};

export type AnimationConfig = {
  disappear: DisappearConfig;
  appear: DisappearConfig & {
    delay: number;
  };
};

export type UseFadeInOutParams<TData extends WithId> = {
  data: TData;
  animations: AnimationConfig;
};
