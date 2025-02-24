import { callHandler, OverrideComponentProps } from "@kobalte/utils";
import { JSX, splitProps } from "solid-js";

import { FormControlLabel } from "../form-control";
import { As, AsChildProp, Polymorphic } from "../polymorphic";
import { useSelectContext } from "./select-context";

export interface SelectLabelProps extends OverrideComponentProps<"span", AsChildProp> {}

/**
 * The label that gives the user information on the select.
 */
export function SelectLabel(props: SelectLabelProps) {
  const context = useSelectContext();

  const [local, others] = splitProps(props, ["onClick"]);

  const onClick: JSX.EventHandlerUnion<any, MouseEvent> = e => {
    callHandler(e, local.onClick);

    if (!context.isDisabled()) {
      context.triggerRef()?.focus();
    }
  };

  return (
    <FormControlLabel asChild>
      <As component={Polymorphic} fallback="span" onClick={onClick} {...others} />
    </FormControlLabel>
  );
}
