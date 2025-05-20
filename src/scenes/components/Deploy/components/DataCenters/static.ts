export const clusterFields = {
  name: {
    value: '',
    isRequired: true,
  },
  region: {
    value: '',
    isRequired: true,
  },
  availability_zone: {
    value: '',
  },
  provider: {
    value: '',
  },
  country: {
    value: '',
  },
  city: {
    value: '',
  },
  address: {
    value: '',
  },
};
export const clusterKeys = Object.keys(
  clusterFields,
) as (keyof typeof clusterFields)[];
