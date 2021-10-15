// @NOTE: Import from libraries.
import { Controller, useFormContext } from "react-hook-form";
import {
    TextField as PolarisTextField,
    TextFieldProps,
} from "@shopify/polaris";

/**
 * ITextFieldProps - props for `TextField` component.
 */
export type ITextFieldProps = Partial<TextFieldProps> & {
    name: string;
    label: string;
};

/**
 * Wrapper for `react-hook-form` Controller component.
 *
 * @param {ITextFieldProps} props
 *
 * @return {JSX.Element}
 */
export default function TextField({ name, ...rest }: ITextFieldProps) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { onChange, ...field } }) => {
                return (
                    <PolarisTextField
                        {...field}
                        {...rest}
                        error={errors[name]?.message}
                        onChange={onChange as (val: string, id: string) => void}
                    />
                );
            }}
        />
    );
}
