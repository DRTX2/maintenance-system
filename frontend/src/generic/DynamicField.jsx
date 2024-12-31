import fieldRenderers from "./Dictionary";

const DynamicField = ({
  field,
  value,
  onChange,
  onFetch,
  onAdd,
  error,
  helperText,
  readOnly,
}) => {
  const Renderer = fieldRenderers[field.type];
  if (!Renderer) {
    return null;
  }

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      {Renderer({
        field,
        value,
        onChange,
        onFetch,
        onAdd,
        error,
        helperText,
        readOnly,
      })}
    </div>
  );
};

export default DynamicField;
