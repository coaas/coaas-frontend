import { cva } from 'class-variance-authority';

export type SelectVariant = 'filterView' | 'formView';

export const SelectVariantDict: Record<SelectVariant, string> = {
  filterView:
    "border-stroke bg-stroke-gray-light text-white [&_svg]:text-stroke [&>[data-selected='true']>svg]:text-white data-[selected='true']:bg-stroke-blue data-[selected='true']:border-blue",
  formView:
    "border-stroke-gray-lighter bg-stroke-gray text-white data-[selected='true']:bg-stroke-blue data-[selected='true']:border-blue ",
};

export const SelectVariants = cva('', {
  variants: {
    variant: SelectVariantDict,
  },
  defaultVariants: {
    variant: 'filterView',
  },
});
