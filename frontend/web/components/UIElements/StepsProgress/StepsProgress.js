import { Fragment } from 'react';
import styles from './StepsProgress.module.scss';

const StepsProgress = ({ steps = [], currentStep = 1, style, ...props }) => {
  return (
    <div className={styles.progress}>
      <ul className={styles.steps}>
        {steps.map((step, index) => (
          <li className={currentStep === index + 1 && styles.active}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepsProgress;

{
  /* <div
      className={styles.progress}
      data-at-step={currentStep}
      data-has-steps={steps.length}
    >
      <div className={styles.progress__track}></div>
      {steps.map((step, index) => (
        <Fragment>
          <a href="#">
            <div
              className={`${styles.progress__step} ${
                styles[`progress__step--${index + 1}`]
              }`}
            ></div>
            <div
              className={`${styles['progress__step-text']} ${
                styles[`text-${index + 1}`]
              }`}
            >
              {step}
            </div>
          </a>
        </Fragment>
      ))}
    </div> */
}
