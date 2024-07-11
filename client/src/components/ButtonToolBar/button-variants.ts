import { cva, type VariantProps } from "class-variance-authority";

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(
  [
    "border-2 rounded-lg p-1 flex justify-center gap-2 items-center hover:bg-slate-400",
  ],
  {
    variants: {
      size: {
        small: ["h-6", "min-w-6"],
        medium: ["h-8", "min-w-8"],
        big: ["h-12", "min-w-12"],
      },
      checked: {
        true: "bg-blue-300",
        false: "bg-white",
      },
    },

    compoundVariants: [],
    defaultVariants: {
      size: "small",
      checked: false,
    },
  }
);
