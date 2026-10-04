/** Joins truthy class name fragments into a single className string. */
const cn = (...classes: (string | false | null | undefined)[]) => {
  return classes.filter(Boolean).join(" ").trim();
};

export default cn;
