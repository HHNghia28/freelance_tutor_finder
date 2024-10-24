import slugify from 'slugify';

export function toSlug(value: string) {
  return slugify(value, {
    locale: 'vi',
    trim: true,
    lower: true,
  });
}
