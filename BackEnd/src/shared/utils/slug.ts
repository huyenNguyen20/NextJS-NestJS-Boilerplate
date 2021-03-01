import * as lodash from 'lodash';

const createUniqueSlug = async (Model, slug, count) => {
  const user = await Model.findOne({ username: slug });
  if (user) return createUniqueSlug(Model, slug, count + 1);
  return `${slug}-${count}`;
};
const generateSlug = async (Model, name) => {
  const originalSlug = lodash.camelCase(name);
  const user = await Model.findOne({ username: originalSlug });
  if (user) return createUniqueSlug(Model, originalSlug, 1);
  return originalSlug;
};

export { generateSlug };
