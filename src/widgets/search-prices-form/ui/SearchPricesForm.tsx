import { Button, Card, Dropdown } from "@/shared/ui";
import { Form, Formik, type FormikValues } from "formik";
import { useDropdownOptionsStore } from "../model/store";
import styles from "./SearchPricesForm.module.scss";
import { useSearchPricesStore } from "@/widgets/prices-list";

export const SearchPricesForm = () => {
  const { dropdownOptions, fetchDropdownOptions, loading } =
    useDropdownOptionsStore();
  const { searchPrices } = useSearchPricesStore();

  function submit(values: FormikValues) {
    const countryId = dropdownOptions.find(
      (o) => o.id === values.search
    )?.countryId;
    searchPrices(countryId);
  }

  function handleOpenChange(open: boolean, value: string) {
    if (!open) return;
    const selected = dropdownOptions.find((o) => o.id === value);
    if (!selected || selected.type === "country" || selected.flag) {
      fetchDropdownOptions();
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
              options={dropdownOptions}
              optionLabel="name"
              optionValue="id"
              optionIcon="icon"
              onSearch={(value) => fetchDropdownOptions(value)}
              onOpenChange={(open) => handleOpenChange(open, values.search)}
            />
            <Button type="submit">Знайти</Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
