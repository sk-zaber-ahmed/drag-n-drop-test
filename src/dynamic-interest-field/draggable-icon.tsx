//draggable icon

import type { SVGProps } from "react";

export function CarbonDraggable(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 32 32"
      {...props}>
      <path
        fill="currentColor"
        d="M10 6h4v4h-4zm8 0h4v4h-4zm-8 8h4v4h-4zm8 0h4v4h-4zm-8 8h4v4h-4zm8 0h4v4h-4z"></path>
    </svg>
  );
}
