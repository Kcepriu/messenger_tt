import { cva, type VariantProps } from "class-variance-authority";

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

export const buttonVariants = cva(
  ["border-2  p-2 flex justify-center gap-2 items-center hover:bg-hover_main"],
  {
    variants: {
      size: {
        small: ["h-6", "min-w-6"],
        medium: ["h-8", "min-w-8"],
        big: ["h-12", "min-w-12"],
      },
      circle: {
        true: "rounded-full",
        false: "rounded-lg",
      },

      checked: {
        true: "bg-fill_main",
        false: "bg-white",
      },
    },

    compoundVariants: [],
    defaultVariants: {
      size: "small",
      checked: false,
      circle: true,
    },
  }
);
