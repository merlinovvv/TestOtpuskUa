import { Button, Card, Dropdown } from "@/shared/ui";
import { Form, Formik, type FormikValues } from "formik";
import { useSearchToursStore } from "../model/store";
import styles from "./SearchToursForm.module.scss";

export const SearchToursForm = () => {
  const { searchToursDropdownOptions, fetchSearchToursOptions, loading } =
    useSearchToursStore();

  function submit(values: FormikValues) {
    console.log("Search submitted:", values.search);
  }

  function handleOpenChange(open: boolean, value: string) {
    if (!open) return;
    const selected = searchToursDropdownOptions.find((o) => o.id === value);
    if (!selected || selected.type === "country" || selected.flag) {
      fetchSearchToursOptions();
    }
  }

  return (
    <Card title="Форма пошуку турів">
      <Formik
        initialValues={{ search: "" }}
        enableReinitialize
        onSubmit={submit}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <Dropdown
              loading={loading}
              value={values.search}
              onChange={(value) => setFieldValue("search", value)}
              placeholder="Search..."
              options={searchToursDropdownOptions}
              optionLabel="name"
              optionValue="id"
              optionIcon="icon"
              onSearch={(value) => fetchSearchToursOptions(value)}
              onOpenChange={(open) => handleOpenChange(open, values.search)}
            />
            <Button type="submit">Знайти</Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
