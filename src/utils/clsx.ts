type Classname = string | undefined | boolean | null

export default function clsx(...classes: Classname[]) {
  return classes.filter(Boolean).join(' ')
}