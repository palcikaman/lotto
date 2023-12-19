type AkceProps = {
  value: number;
};

export const Akce = ({ value }: AkceProps) => (
  <span>
    <strong>{value}</strong> akçe
  </span>
);
