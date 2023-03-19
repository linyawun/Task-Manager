import { marked } from 'marked';
import MdEditor from 'react-markdown-editor-lite';

const MdTextarea = ({
  Controller,
  labelText,
  id,
  control,
  rules
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <Controller
        name={id}
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { invalid, error },
        }) => (
          <div>
            <MdEditor
              style={{ height: '300px' }}
              value={value}
              onChange={async (e) => {
                onChange(e.text);
              }}
              onBlur={onBlur}
              inputRef={ref}
              name={id}
              id={id}
              renderHTML={(text) => marked(text)}
              placeholder="Type here..."
              error={invalid}
              className={`form-control ${error?.message ? 'is-invalid' : ''}`}
            />
            {<div className="invalid-feedback d-block">{error?.message}</div>}
          </div>
        )}
      />
    </>
  );
};

export default MdTextarea;