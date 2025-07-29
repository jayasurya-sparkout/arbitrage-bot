import { Label } from "./ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "./ui/radio-group";

type RadioOption = {
  label: string;
  value: string;
  radionLablClass?: string; 
};

type CustomRadioGroupProps = {
  options: RadioOption[];
  defaultValue: string;
  addClass?: string;
  radioBtnCls?: string;
  groupName?: string;
  onChange?: (value: string) => void;
};

export function CustomRadioGroup({
  options,
  defaultValue,
  addClass = "",
  radioBtnCls = "",
  groupName = "radio",
  onChange,
}: CustomRadioGroupProps) {
  return (
    <RadioGroup defaultValue={defaultValue} className={addClass} onValueChange={(value) => {
        if (onChange) onChange(value);
    }}>
      {options.map((option, index) => {
        const id = `${groupName}-${index}`;
        return (
          <div key={id} className={`flex items-center gap-3 ${radioBtnCls}`}>
            <RadioGroupItem value={option.value} id={id} />
            <Label className={`${option.radionLablClass}`} htmlFor={id}>{option.label}</Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
