import styles from './FilterListItems.module.scss';
import SelectBox from '../../UIElements/FormElements/SelectBox';
import Row from '../../UIElements/Grid/Row';
import Col from '../../UIElements/Grid/Col';
import CheckInput from '../../UIElements/FormElements/CheckInput';
import Input from '../../UIElements/FormElements/Input';
import FilterListItem from './FilterListItem';
import RangeInput from '../../UIElements/FormElements/RangeInput';

const FilterListItems = ({ options, formik, title, type = 'top-options' }) => {
  // Other value is options list

  return (
    <div className={type === 'top-options' && 'px-1'}>
      {title && <h4 className={styles.title}>{title}</h4>}
      {options.map((option, index) => (
        <>
          {type === 'top-options' && (
            <div>
              {(option.type === 'single-select' ||
                option.type === 'multi-select') && (
                <SelectBox
                  id={option.name}
                  name={option.name}
                  placeholder={option.label}
                  label={option.label}
                  options={option.options}
                  value={formik.values[option.name]}
                  onChange={(r) => {
                    if (option.type === 'multi-select') {
                      formik.setFieldValue(
                        option.name,
                        r.map((r) => r.value)
                      );
                    } else {
                      formik.setFieldValue(option.name, r.value);
                    }
                    //changeHandler(r);
                  }}
                />
              )}

              {option.type === 'min-max-input' && (
                <>
                  {/* <label>{option.label}</label> */}
                  <Row>
                    <Col span={6}>
                      <Input
                        id={'min_' + option.name}
                        name={'min_' + option.name}
                        value={formik.values['min_' + option.name]}
                        type="tel"
                        //label={field.label}
                        placeholder="From"
                        onChange={formik.handleChange}
                        error={
                          formik.touched['min_' + option.name] &&
                          formik.errors['min_' + option.name]
                            ? formik.errors['min_' + option.name]
                            : null
                        }
                      />
                    </Col>
                    <Col span={6}>
                      <Input
                        id={'max_' + option.name}
                        name={'max_' + option.name}
                        value={formik.values['max_' + option.name]}
                        type="tel"
                        //label={field.label}
                        placeholder="To"
                        onChange={formik.handleChange}
                        error={
                          formik.touched['max_' + option.name] &&
                          formik.errors['max_' + option.name]
                            ? formik.errors['max_' + option.name]
                            : null
                        }
                      />
                    </Col>
                  </Row>
                  {option.type === 'min-max-select' && (
                    <Row>
                      <Col span={6}>
                        <select
                          id={'min_' + option.name}
                          name={'min_' + option.name}
                          placeholder="From"
                          onChange={formik.handleChange}
                          error={
                            formik.touched['min_' + option.name] &&
                            formik.errors['min_' + option.name]
                              ? formik.errors['min_' + option.name]
                              : null
                          }
                          value={formik.values['min_' + option.name]}
                        >
                          {Array.from(
                            new Array(option.max),
                            (_, index) => index + 1
                          ).map((o) => (
                            <option value={o}>{o}</option>
                          ))}
                        </select>
                      </Col>
                      <Col span={6}>
                        <select
                          id={'max_' + option.name}
                          name={'max_' + option.name}
                          placeholder="From"
                          onChange={formik.handleChange}
                          error={
                            formik.touched['max_' + option.name] &&
                            formik.errors['max_' + option.name]
                              ? formik.errors['max_' + option.name]
                              : null
                          }
                          value={formik.values['max_' + option.name]}
                        >
                          {Array.from(
                            new Array(option.max),
                            (_, index) => index + 1
                          ).map((o) => (
                            <option value={o}>{o}</option>
                          ))}
                        </select>
                      </Col>
                    </Row>
                  )}
                </>
              )}
              {option.type === 'single-check' && (
                <CheckInput
                  id={option.name}
                  name={option.name}
                  value={option.default}
                  checked={formik.values[option.name]}
                  label={option.label}
                  onChange={formik.handleChange}
                  error={
                    formik.touched[option.name] && formik.errors[option.name]
                      ? formik.errors[option.name]
                      : null
                  }
                />
              )}
            </div>
          )}
          {type === 'options-list' && (
            <div>
              {option.type == 'single-check' && (
                <FilterListItem title={option.label}>
                  {option.options.map((o) => (
                    <CheckInput
                      id={o.value}
                      name={option.name}
                      value={o.value}
                      checked={
                        Array.isArray(formik.values[option.name])
                          ? formik.values[option.name].length > 0 &&
                            formik.values[option.name].includes(o.value)
                          : formik.values[option.name]
                      }
                      label={o.label}
                      onChange={formik.handleChange}
                      error={
                        formik.touched[option.name] &&
                        formik.errors[option.name]
                          ? formik.errors[option.name]
                          : null
                      }
                    />
                  ))}
                </FilterListItem>
              )}
              {option.type === 'min-max-input' && (
                <>
                  <FilterListItem title={option.label}>
                    {/* <label>{option.label}</label> */}
                    <Row>
                      <Col span={6}>
                        <Input
                          id={'min_' + option.name}
                          name={'min_' + option.name}
                          value={formik.values['min_' + option.name]}
                          type="tel"
                          //label={field.label}
                          placeholder="From"
                          onChange={formik.handleChange}
                          error={
                            formik.touched['min_' + option.name] &&
                            formik.errors['min_' + option.name]
                              ? formik.errors['min_' + option.name]
                              : null
                          }
                        />
                      </Col>
                      <Col span={6}>
                        <Input
                          id={'max_' + option.name}
                          name={'max_' + option.name}
                          value={formik.values['max_' + option.name]}
                          type="tel"
                          //label={field.label}
                          placeholder="To"
                          onChange={formik.handleChange}
                          error={
                            formik.touched['max_' + option.name] &&
                            formik.errors['max_' + option.name]
                              ? formik.errors['max_' + option.name]
                              : null
                          }
                        />
                      </Col>
                    </Row>
                  </FilterListItem>
                </>
              )}
              {option.type === 'min-max-select' && (
                <FilterListItem title={option.label}>
                  <Row>
                    <Col span={6}>
                      <select
                        id={'min_' + option.name}
                        name={'min_' + option.name}
                        placeholder="From"
                        onChange={formik.handleChange}
                        error={
                          formik.touched['min_' + option.name] &&
                          formik.errors['min_' + option.name]
                            ? formik.errors['min_' + option.name]
                            : null
                        }
                        value={formik.values['min_' + option.name]}
                      >
                        {Array.from(
                          new Array(option.max),
                          (_, index) => index + 1
                        ).map((o) => (
                          <option value={o}>{o}</option>
                        ))}
                      </select>
                    </Col>
                    <Col span={6}>
                      <select
                        id={'max_' + option.name}
                        name={'max_' + option.name}
                        placeholder="From"
                        onChange={formik.handleChange}
                        error={
                          formik.touched['max_' + option.name] &&
                          formik.errors['max_' + option.name]
                            ? formik.errors['max_' + option.name]
                            : null
                        }
                        value={formik.values['max_' + option.name]}
                      >
                        {Array.from(
                          new Array(option.max),
                          (_, index) => index + 1
                        ).map((o) => (
                          <option value={o}>{o}</option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                </FilterListItem>
              )}
              {(option.type === 'single-select' ||
                option.type === 'multi-select') && (
                <FilterListItem title={option.label}>
                  <SelectBox
                    id={option.name}
                    name={option.name}
                    placeholder={option.label}
                    label={option.label}
                    options={option.options}
                    value={formik.values[option.name]}
                    isMulti={option.type === 'multi-select'}
                    onChange={(r) => {
                      if (option.type === 'multi-select') {
                        formik.setFieldValue(
                          option.name,
                          r.map((r) => r.value)
                        );
                      } else {
                        formik.setFieldValue(option.name, r.value);
                      }
                      changeHandler(r);
                    }}
                  />
                </FilterListItem>
              )}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default FilterListItems;
