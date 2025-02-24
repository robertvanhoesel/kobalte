import { mergeDefaultProps, OverrideComponentProps } from "@kobalte/utils";

import { AsChildProp, Polymorphic } from "../polymorphic";
import { useSelectContext } from "./select-context";

export interface SelectIconProps extends OverrideComponentProps<"div", AsChildProp> {}

/**
 * A small icon often displayed next to the value as a visual affordance for the fact it can be open.
 * It renders a `▼` by default, but you can use your own icon `children`.
 */
export function SelectIcon(props: SelectIconProps) {
  const context = useSelectContext();

  props = mergeDefaultProps({ children: "▼" }, props);

  return <Polymorphic fallback="div" aria-hidden="true" {...context.dataset()} {...props} />;
}
