import React from "react";

type HtmlTag = keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>

type Props<T extends HtmlTag> = {
  tag?: T
} & React.ComponentProps<T>

export default function Container<T extends HtmlTag>({ tag: Component = 'div', ...props }: Props<T>) {
  return (
    <Component
      {...props}
      className='container mx-auto px-4'
    />
  )
}