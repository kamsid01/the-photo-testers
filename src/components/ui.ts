import type { CSSProperties } from 'react';

export const SERIF = 'Newsreader,Georgia,serif';

export const container: CSSProperties = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: 'clamp(48px,6vw,80px) clamp(16px,4vw,40px)',
};

export const h2Serif: CSSProperties = {
  margin: '0 0 8px',
  fontFamily: SERIF,
  fontWeight: 500,
  fontSize: 'clamp(28px,3vw,38px)',
  lineHeight: 1.1,
  letterSpacing: '-0.01em',
};

export const sectionHead: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'end',
  gap: '16px 40px',
  marginBottom: '32px',
};

export const lede: CSSProperties = { margin: 0, fontSize: '17px', color: '#60645F', maxWidth: '36em' };

export const eyebrowRule: CSSProperties = {
  margin: '0 0 4px',
  paddingBottom: '10px',
  borderBottom: '1px solid #20221F',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '.04em',
  textTransform: 'uppercase',
};

export const linkStrong: CSSProperties = { fontWeight: 600, fontSize: '15px' };

export const btnPrimary: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  height: '48px',
  padding: '0 22px',
  background: '#3159D7',
  color: '#FFFFFF',
  borderRadius: '4px',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '16px',
};

export const btnSecondary: CSSProperties = {
  ...btnPrimary,
  background: '#FFFFFF',
  color: '#20221F',
  border: '1px solid #B9BDB4',
};

export const breadcrumbNav: CSSProperties = {
  fontSize: '14px',
  color: '#60645F',
  marginBottom: 'clamp(24px,4vw,40px)',
};

export const breadcrumbOl: CSSProperties = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px 8px',
};
