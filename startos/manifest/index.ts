import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'crossbill',
  title: 'Crossbill',
  license: 'Apache-2.0',
  packageRepo: 'https://github.com/crossbill-wallet/crossbill-startos',
  upstreamRepo: 'https://github.com/crossbill-wallet/crossbill',
  marketingUrl: 'https://github.com/crossbill-wallet/crossbill',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    crossbill: {
      source: {
        dockerBuild: {
          workdir: './upstream-project',
          dockerfile: './upstream-project/server/Dockerfile',
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
