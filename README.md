[![journy.io](https://raw.githubusercontent.com/journy-io/brand/main/githubbanner.png)](https://journy.io/?utm_source=github&utm_content=readme-user-agent-parser)

# User Agent Parser

![npm](https://img.shields.io/npm/v/@journyio/user-agent-parser?color=%234d84f5&style=flat-square)
[![npm downloads](https://img.shields.io/npm/dm/@journyio/user-agent-parser?style=flat-square)](https://www.npmjs.com/package/@journyio/user-agent-parser)

Inspired by [faisalman/ua-parser-js](https://github.com/faisalman/ua-parser-js).

In fact, most code is copy and 🍝. We've added TypeScript types and adopted modern syntax.

We decided to publish our own version because the package was recently [highjacked](https://github.com/faisalman/ua-parser-js/issues/536).

Why choose this package over [faisalman/ua-parser-js](https://github.com/faisalman/ua-parser-js)?

* Modern syntax
* TypeScript types
* Written in TypeScript
* Not much of a target because less popular

Is this package maintained?

Yes and no, we won't add new devices or browsers but will fix any bugs. We should adopt [client hints](https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-client-hints-06) and use this library as a fallback.

## 💾 Installation

You can use your package manager (`npm` or `yarn`) to install:

```bash
npm install --save @journyio/user-agent-parser
```
or
```bash
yarn add @journyio/user-agent-parser
```

## 🔌 Getting started

```tsx
import { parse } from "@journyio/user-agent-parser";

const result = parse("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome Safari/537.36");

/*
{
  browser: { name: 'Chrome Headless', version: undefined, major: undefined },
  engine: { name: 'WebKit', version: '537.36' },
  os: { name: 'Linux', version: 'x86_64' },
  device: { vendor: undefined, model: undefined, type: undefined },
  cpu: { architecture: 'amd64' }
}*/
```

## 💯 Tests

To run the tests:

```bash
npm run test
```

## 🔒 Security

If you discover any security related issues, please email security at journy io instead of using the issue tracker.
