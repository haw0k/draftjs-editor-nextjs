import { FC, ReactNode } from "react";
import {
  Field,
  FieldInputProps,
  FieldMetaProps,
  Form,
  Formik,
  FormikProps,
  useField,
} from "formik";
import DraftjsEditor from "./draftjs_editor";
import styles from "../styles/draftjs_field.module.css";

interface IProps {
  label: string;
  name: string;
  initialValue: string;
  FieldConfig: any;
  onChange(val: string): void
  // props: any;
}

const DraftjsField: FC<IProps> = ({ onChange, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={meta.touched && meta.error ? styles.draftjs__field_error : styles.draftjs__field}>
      <label className={styles.draftjs__label}>
        <DraftjsEditor {...field} {...props} onChange={onChange} />
      </label>
      {meta.touched && meta.error ? (
        <div className={styles.draftjs__error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
// const DraftjsField = ({
//   field, form, label, ...props
// }) => {
//   <label
//     className={get(form.touched, field.name)
//       && get(form.errors, field.name)styles.draftjs__label}

//   </label>
// }
export default DraftjsField;
