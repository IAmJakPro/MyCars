import Link from 'next/link';
import Col from '../Grid/Col';
import Row from '../Grid/Row';
import styles from './Card.module.scss';

const Card = ({
  style,
  href,
  header,
  footer,
  bodyStyle,
  headerStyle,
  titleStyle,
  footerStyle,
  title,
  subTitle,
  text,
  link,
  hrefLink,
  image,
  extraClasses,
  children,
  imageWidth,
  imageHeight,
  direction = 'vertical',
  ...props
}) => {
  const cardTitle = title && (
    <h3 className={styles['card__card-title']} style={titleStyle}>
      {title}
    </h3>
  );

  const cardHeader = header && (
    <div className={styles['card__card-header']} style={headerStyle}>
      {header}
    </div>
  );

  const cardFooter = footer && (
    <div className={styles['card__card-footer']} style={footerStyle}>
      {footer}
    </div>
  );

  const cardText = text && <p className={styles['card__card-text']}>{text}</p>;

  /* const cardLink = (
    <a href="#" className={styles['card__card-link']}>
      {link}
    </a>
  ); */

  const cardImage = image && (
    <img
      src={image}
      className={styles['card__card-img']}
      style={{ width: imageWidth, height: imageHeight || '100%' }}
    />
  );

  const cardSubTitle = subTitle && (
    <h4 className={styles['card__card-subtitle']}>{subTitle}</h4>
  );

  const cardBody = (cardTitle || cardSubTitle || cardText || children) && (
    <div className={`${styles['card__card-body']}`} style={bodyStyle}>
      {cardTitle}
      {cardSubTitle}
      {cardText}
      {children}
    </div>
  );

  if (hrefLink) {
    return (
      <Link href={hrefLink}>
        <a
          className={`${styles.card} ${extraClasses && extraClasses}`}
          style={style}
          {...props}
        >
          {direction !== 'horizontal' && (
            <div>
              {cardImage}
              {cardHeader}
              {cardBody}
              {cardFooter}
            </div>
          )}

          {direction === 'horizontal' && (
            <Row>
              <Col span={4} extraClasses="p-0">
                {cardImage}
              </Col>
              <Col span={8}>
                {cardHeader}
                {cardBody}
                {cardFooter}
              </Col>
            </Row>
          )}
        </a>
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={`${styles.card} ${extraClasses && extraClasses}`}
        style={style}
        {...props}
      >
        {direction !== 'horizontal' && (
          <div>
            {cardImage}
            {cardHeader}
            {cardBody}
            {cardFooter}
          </div>
        )}

        {direction === 'horizontal' && (
          <Row>
            <Col span={4} extraClasses="p-0">
              {cardImage}
            </Col>
            <Col span={8}>
              {cardHeader}
              {cardBody}
              {cardFooter}
            </Col>
          </Row>
        )}
      </a>
    );
  }

  return (
    <div
      className={`${styles.card} ${extraClasses && extraClasses}`}
      style={style}
      {...props}
    >
      {direction !== 'horizontal' && (
        <div>
          {cardImage}
          {cardHeader}
          {cardBody}
          {cardFooter}
        </div>
      )}

      {direction === 'horizontal' && (
        <Row>
          <Col span={4} extraClasses="p-0">
            {cardImage}
          </Col>
          <Col span={8}>
            {cardHeader}
            {cardBody}
            {cardFooter}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Card;
