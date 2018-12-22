type Dictionary = {
  value: string;
  set: (newValue: string) => void;
  remove: () => void;
};
export default function useLocalstorage(
  key: string,
  defaultValue: any
): Dictionary;
