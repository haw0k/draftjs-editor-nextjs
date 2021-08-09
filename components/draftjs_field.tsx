import cs from "classnames";
import { FieldInputProps, FormikProps } from "formik";
import { FC } from "react";
import DraftjsEditor from "./draftjs_editor";

interface IProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  label: string;
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
}

const DraftjsField: FC<IProps> = ({ field, form, label, onChange }) => {
  const isErrors = !!!(form?.errors && field.name);
  const isInvalid = form?.touched && field.name && isErrors;
  return (
    <label
      className={cs("draftjs__field", {
        "draftjs__field--error": isInvalid,
      })}
    >
      <p className='draftjs__label'>{label}</p>
      <DraftjsEditor
        initialValue={field?.value}
        onChange={(msg) => {
          onChange(field.name, msg);
        }}
        onBlur={form?.handleBlur(field.name)}
        wrapperClassName={cs("drafjs__wrapper", {
          "drafjs__wrapper--error": isInvalid,
        })}
      />
      {isInvalid && <span className='input__error'>{isErrors}</span>}
    </label>
  );
};
export default DraftjsField;
