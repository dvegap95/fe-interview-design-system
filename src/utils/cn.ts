const cn = (...classes: (string | false | null | undefined)[]) => {
  return classes.filter(Boolean).join(" ").trim();
};
export default cn;
