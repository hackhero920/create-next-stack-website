import {
  Box,
  Checkbox,
  CheckboxGroup,
  Code,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Anchor } from "../../components/Anchor";
import { Section } from "../../components/Section";
import { arrayToKeyToKeyMap } from "../../utils/arrayToKeyToKeyMap";
import { objectToKeyToKeyMap } from "../../utils/objectToKeyToKeyMap";

const globalStyles = css`
  body {
    background-color: #eee;
  }
`;

const packageManagers = arrayToKeyToKeyMap(["yarn", "npm"]);
const stylingMethods = arrayToKeyToKeyMap([
  "emotion",
  "styled-components",
  "css-modules",
  "css-modules-with-sass",
]);
const formStateManagementLibraries = arrayToKeyToKeyMap([
  "react-hook-form",
  "formik",
]);
const formattingLibraries = arrayToKeyToKeyMap(["prettier"]);
const componentLibraries = arrayToKeyToKeyMap(["chakra"]);
const animationLibraries = arrayToKeyToKeyMap(["framer-motion"]);
const continuousIntegrations = arrayToKeyToKeyMap(["github-actions"]);
const miscellaneousOptions = arrayToKeyToKeyMap(["formatting-pre-commit-hook"]);

type FormData = {
  packageManager: keyof typeof packageManagers;
  stylingMethod: keyof typeof stylingMethods;
  formStateManagement: Array<keyof typeof formStateManagementLibraries>;
  formatting: Array<keyof typeof formattingLibraries>;
  componentLibraries: Array<keyof typeof componentLibraries>;
  animationLibraries: Array<keyof typeof animationLibraries>;
  continuousIntegrations: Array<keyof typeof continuousIntegrations>;
  miscellaneousOptions: Array<keyof typeof miscellaneousOptions>;
};
const defaultFormData: FormData = {
  packageManager: "yarn",
  stylingMethod: "emotion",
  formStateManagement: [formStateManagementLibraries["react-hook-form"]],
  formatting: [formattingLibraries.prettier],
  componentLibraries: [componentLibraries.chakra],
  animationLibraries: [animationLibraries["framer-motion"]],
  continuousIntegrations: [continuousIntegrations["github-actions"]],
  miscellaneousOptions: [miscellaneousOptions["formatting-pre-commit-hook"]],
};
const formDataKeys = objectToKeyToKeyMap(defaultFormData);

const LandingPageTemplate = () => {
  const { control, watch, handleSubmit } = useForm<FormData>({
    defaultValues: defaultFormData,
  });

  const [output, setOutput] = useState<string>("");

  const formData = watch();

  const updateCommand: SubmitHandler<FormData> = useCallback((formData) => {
    const args = ["npx", "create-next-stack@0.1.4"];

    // Package manager
    args.push(`--packageManager=${formData.packageManager}`);

    // Styling method
    args.push(`--stylingMethod=${formData.stylingMethod}`);

    // Form State Management
    if (formData.formStateManagement.includes("react-hook-form")) {
      args.push("--react-hook-form");
    }
    if (formData.formStateManagement.includes("formik")) {
      args.push("--formik");
    }

    // Formatting
    if (formData.formatting.includes("prettier")) {
      args.push("--prettier");
    }

    // Component Libraries
    if (formData.componentLibraries.includes("chakra")) {
      args.push("--chakra");
    }

    // Animation Libraries
    if (formData.animationLibraries.includes("framer-motion")) {
      args.push("--framer-motion");
    }

    // Continuous Integrations
    if (formData.continuousIntegrations.includes("github-actions")) {
      args.push("--github-actions");
    }

    // Miscellaneous Options
    if (formData.miscellaneousOptions.includes("formatting-pre-commit-hook")) {
      args.push("--formatting-pre-commit-hook");
    }

    setOutput(args.join(" "));
  }, []);

  useEffect(() => {
    updateCommand(formData);
  }, [updateCommand, formData]);

  return (
    <>
      <Global styles={globalStyles} />
      <main>
        <Section>
          <Stack spacing="16" align="center">
            <Stack align="center" spacing="1">
              <Heading
                as="h1"
                size="3xl"
                bgGradient="linear(to-bl, #ED88FD, #5B45E4)"
                bgClip="text"
                textAlign="center"
                fontWeight="800"
              >
                Create Next Stack
              </Heading>
              <Text
                fontSize="1.25em"
                fontWeight="bold"
                bgGradient="linear(to-bl, #ED88FD, #5B45E4)"
                bgClip="text"
                textAlign="center"
              >
                The ultimate starter kit for Next.js
              </Text>
            </Stack>

            {/* TODO: Insert social icons */}

            <Stack maxWidth="600" spacing="4">
              <Text>
                <b>Create Next Stack</b> is a website and CLI tool used to
                easily set up the boilerplate of new{" "}
                <Anchor href="https://nextjs.org/docs/api-reference/create-next-app">
                  Next.js
                </Anchor>{" "}
                apps.
              </Text>
              <Text>
                Where{" "}
                <Anchor href="https://nextjs.org/docs/api-reference/create-next-app">
                  Create Next App
                </Anchor>{" "}
                lets you choose a single template only, Create Next Stack lets
                you pick and choose an array of technologies often used
                alongside Next.js, and free you of the pain of making them work
                together.
              </Text>
            </Stack>

            <Box
              width="100%"
              borderRadius="50"
              padding="70"
              background="white"
              boxShadow="0 10px 50px rgba(0,0,0,0.1)"
            >
              <form>
                <Heading as="h2" size="lg" marginBottom="6">
                  Pick your technologies
                </Heading>

                <Stack
                  spacing={["8", "8", "16"]}
                  direction={["column", "column", "row"]}
                >
                  <Stack spacing="8" flexBasis="100%">
                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Package manager
                      </Heading>
                      <Controller
                        name={formDataKeys.packageManager}
                        control={control}
                        render={({ field }) => (
                          <RadioGroup {...field}>
                            <Stack direction="column">
                              {Object.keys(packageManagers).map(
                                (packageManager) => (
                                  <Radio
                                    key={packageManager}
                                    id={`radio-${packageManager}`}
                                    value={packageManager}
                                  >
                                    {packageManager}
                                  </Radio>
                                )
                              )}
                            </Stack>
                          </RadioGroup>
                        )}
                      />
                    </Stack>
                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Styling method
                      </Heading>
                      <Controller
                        name={formDataKeys.stylingMethod}
                        control={control}
                        render={({ field }) => (
                          <RadioGroup {...field}>
                            <Stack direction="column">
                              {Object.keys(stylingMethods).map(
                                (stylingMethod) => (
                                  <Radio
                                    key={stylingMethod}
                                    id={`radio-${stylingMethod}`}
                                    value={stylingMethod}
                                  >
                                    {stylingMethod}
                                  </Radio>
                                )
                              )}
                            </Stack>
                          </RadioGroup>
                        )}
                      />
                    </Stack>
                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Form state management
                      </Heading>
                      <Controller
                        name={formDataKeys.formStateManagement}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.keys(formStateManagementLibraries).map(
                                (formStateManagementLibrary) => (
                                  <Checkbox
                                    key={formStateManagementLibrary}
                                    id={`radio-${formStateManagementLibrary}`}
                                    value={formStateManagementLibrary}
                                  >
                                    {formStateManagementLibrary}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>
                  </Stack>

                  <Stack spacing="8" flexBasis="100%">
                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Formatting
                      </Heading>
                      <Controller
                        name={formDataKeys.formatting}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.keys(formattingLibraries).map(
                                (formattingLibrary) => (
                                  <Checkbox
                                    key={formattingLibrary}
                                    id={`radio-${formattingLibrary}`}
                                    value={formattingLibrary}
                                  >
                                    {formattingLibrary}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>

                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Component libraries
                      </Heading>
                      <Controller
                        name={formDataKeys.componentLibraries}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.keys(componentLibraries).map(
                                (componentLibrary) => (
                                  <Checkbox
                                    key={componentLibrary}
                                    id={`radio-${componentLibrary}`}
                                    value={componentLibrary}
                                  >
                                    {componentLibrary}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>

                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Animation
                      </Heading>
                      <Controller
                        name={formDataKeys.animationLibraries}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.keys(animationLibraries).map(
                                (animationLibrary) => (
                                  <Checkbox
                                    key={animationLibrary}
                                    id={`radio-${animationLibrary}`}
                                    value={animationLibrary}
                                  >
                                    {animationLibrary}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>

                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Continuous integration
                      </Heading>
                      <Controller
                        name={formDataKeys.continuousIntegrations}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.keys(continuousIntegrations).map(
                                (continuousIntegration) => (
                                  <Checkbox
                                    key={continuousIntegration}
                                    id={`radio-${continuousIntegration}`}
                                    value={continuousIntegration}
                                  >
                                    {continuousIntegration}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>

                    <Stack spacing="4">
                      <Heading as="h3" size="md">
                        Miscellaneous
                      </Heading>
                      <Controller
                        name={formDataKeys.miscellaneousOptions}
                        control={control}
                        render={({ field }) => (
                          <CheckboxGroup {...field}>
                            <Stack direction="column">
                              {Object.keys(miscellaneousOptions).map(
                                (miscellaneousOption) => (
                                  <Checkbox
                                    key={miscellaneousOption}
                                    id={`radio-${miscellaneousOption}`}
                                    value={miscellaneousOption}
                                  >
                                    {miscellaneousOption}
                                  </Checkbox>
                                )
                              )}
                            </Stack>
                          </CheckboxGroup>
                        )}
                      />
                    </Stack>
                  </Stack>
                </Stack>

                <Stack marginTop="16">
                  {output !== "" ? (
                    <>
                      <Heading as="h2" size="lg">
                        Command
                      </Heading>
                      <Text>
                        Run the following command in your preferred directory:
                      </Text>
                      <Stack>
                        <Code padding="4">{output}</Code>
                      </Stack>
                      {/* TODO: Add Copy button:
                        <Button>Copy</Button>
                      */}
                    </>
                  ) : null}
                </Stack>
              </form>
            </Box>

            <Text>
              Created by{" "}
              <Anchor href="https://twitter.com/akd_io">@akd_io</Anchor>
            </Text>
          </Stack>
        </Section>
      </main>
    </>
  );
};

export default LandingPageTemplate;
