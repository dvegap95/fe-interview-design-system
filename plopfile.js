export default function (plop) {
  plop.setGenerator("component", {
    description: "Scaffold a design-system component (Tab-style directory layout)",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase, e.g. Button):",
        validate: (value) => {
          if (!value?.trim()) return "Name is required";
          if (!/^[A-Z][A-Za-z0-9]*$/.test(value.trim())) {
            return "Use PascalCase starting with an uppercase letter (e.g. Button)";
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "src/components/{{pascalCase name}}",
        base: ".plop-templates/component",
        templateFiles: ".plop-templates/component/**/*.hbs",
      },
    ],
  });
}
