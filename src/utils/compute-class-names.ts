export default function computeClassNames(deps: Record<string, unknown>) {
  const classes = Object.entries(deps)
    .map((item) => {
      const [key, value] = item;
      return key && !!value ? key : '';
    })
    .filter((value) => value)
    .join(' ');

  return classes.length ? classes : '';
}
