import React from "react";

export function Title({children, ...props}: React.ComponentProps<"h2">) {
  return (
  <>
    <h2 className="tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5"{...props} >{children}</h2>
  </>
  )
}
