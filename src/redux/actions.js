// export const LOG = 'LOG';

export function log(text) {
  return {
    type: 'LOG',
    text
  };
}
