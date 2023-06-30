# Air Lift

## Setup

### BuildKite API Key

You need to generate an API key if you don't already have one (`Personal Settings` > `API Access Tokens` > `New API Access Token`).

Use the following settings:

- `Organization Access` - check all organizations
- `REST API Scopes` - check all `read` scopes

### Required Environment Variable

#### `API_KEY`

The BuildKite API Key is a required environment variable.

```
export API_KEY=bkua_49186aec34bcxxxxxxxxxxxxxxx
```

#### `ORG_SLUG`

This is the organization id visible in the BuildKite URL (`https://buildkite.com/YOUR-ORG-SLUG`)

### Optional Environment Variables

#### `START_TIMESTAMP`

Start time of when to begin the search period. Defaults to 6 months ago if not supplied.

#### `END_TIMESTAMP`

End time period of the data fetch. Default to today if not provided.

## Run

### Docker

### Running With Node

Airlift can be run directly using Node v16+.

```
export API_KEY=bkua_476xxxxxxx
export ORG_SLUG=vandaley-industries
node app.js
```
