import { Field, Form, Formik, FormikErrors } from "formik";

export const Filter = ({
  setFilterValue,
}: {
  setFilterValue: (value: string) => void;
}) => {
  const initialValues: { filter: string } = {
    filter: "",
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<{ filter: string }>>
  ) => {
    setFilterValue(event.target.value);
    setFieldValue("filter", event.target.value);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ setFieldValue }) => (
          <Form>
            <Field
              name="filter"
              type="text"
              placeholder="filter"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterChange(event, setFieldValue)
              }
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
