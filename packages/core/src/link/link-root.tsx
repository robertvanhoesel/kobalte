/*!
 * Portions of this file are based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/b35d5c02fe900badccd0cf1a8f23bb593419f238/packages/@react-aria/link/src/useLink.ts
 */

import { callHandler, mergeRefs, OverrideComponentProps } from "@kobalte/utils";
import { JSX, splitProps } from "solid-js";

import { AsChildProp, Polymorphic } from "../polymorphic";
import { createTagName } from "../primitives";

export interface LinkRootOptions extends AsChildProp {
  /** Whether the link is disabled. */
  isDisabled?: boolean;
}

export interface LinkRootProps extends OverrideComponentProps<"a", LinkRootOptions> {}

/**
 * Link allows a user to navigate to another page or resource within a web page or application.
 */
export function LinkRoot(props: LinkRootProps) {
  let ref: HTMLAnchorElement | undefined;

  const [local, others] = splitProps(props, ["ref", "type", "isDisabled", "onClick"]);

  const tagName = createTagName(
    () => ref,
    () => "a"
  );

  const onClick: JSX.EventHandlerUnion<any, MouseEvent> = e => {
    if (local.isDisabled) {
      e.preventDefault();
      return;
    }

    callHandler(e, local.onClick);
  };

  return (
    <Polymorphic
      fallback="a"
      ref={mergeRefs(el => (ref = el), local.ref)}
      role={tagName() !== "a" ? "link" : undefined}
      tabIndex={tagName() !== "a" && !local.isDisabled ? 0 : undefined}
      aria-disabled={local.isDisabled ? true : undefined}
      data-disabled={local.isDisabled ? "" : undefined}
      onClick={onClick}
      {...others}
    />
  );
}
