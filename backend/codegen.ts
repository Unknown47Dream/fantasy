import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'https://api-op.grid.gg/central-data/graphql': {
      headers: {
        'x-api-key': 'SeePzApsn3iOhFzno4sfaTZPQUX94HveDzIU3KF0',
      },
    },
  },
  documents: 'src/**/*.ts',
  // generates: {
  //   'src/common/gql/': {
  //     preset: 'client',
  //     plugins: [],
  //   },
  //   './graphql.schema.json': {
  //     plugins: ['introspection'],
  //   },
  // },
  generates: {
    'src/common/gql/grid-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
};

export default config;
