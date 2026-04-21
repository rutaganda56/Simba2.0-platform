# Simba Product Image Enrichment Agent

AI-powered image enrichment for 789 Simba Supermarket products using Claude Sonnet and multi-source image search.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Add your API keys to `.env`:
   - **Required**: `ANTHROPIC_API_KEY` (Claude Sonnet)
   - **Optional**: `UNSPLASH_ACCESS_KEY`, `PEXELS_API_KEY` for better results

## Usage

Run the enrichment:
```bash
npm run enrich
```

This will:
- Analyze all 789 product names using Claude Sonnet
- Search for high-quality images across multiple sources
- Generate `simba_products_enriched.json` with new image URLs
- Create `image-enrichment-report.json` with statistics

## How It Works

### Phase 1: Name Analysis (Claude Sonnet)
Cleans product names, extracts brands, and generates optimized search queries.

### Phase 2: Image Search Cascade
1. **Open Food Facts** (free, no key) - Best for packaged food/drinks
2. **Unsplash** (50 req/hr free) - Beautiful product photography
3. **Pexels** (200 req/hr free) - Commercial-use images
4. **Fallback** - Unsplash random image by query

### Phase 3: Output
- `simba_products_enriched.json` - Products with new image URLs
- `image-enrichment-report.json` - Detailed statistics and low-confidence items

## API Keys (Free Tiers)

- **Anthropic**: https://console.anthropic.com/
- **Unsplash**: https://unsplash.com/developers (50 requests/hour)
- **Pexels**: https://www.pexels.com/api/ (200 requests/hour)

## Rate Limits

The script respects all API rate limits:
- Unsplash: 72s between calls
- Pexels: 18s between calls
- Claude: 1.2s between calls
- Open Food Facts: 600ms between calls

Processing all 789 products takes approximately 2-3 hours.

## Output Format

```json
{
  "store": { "name": "Simba Supermarket", ... },
  "products": [
    {
      "id": 13001,
      "name": "Lentz Radiant Heater 80036",
      "image": "https://images.pexels.com/...",
      "_imageSource": "pexels",
      "_imageScore": 0.78,
      "_imageQuery": "electric radiant heater"
    }
  ]
}
```

## Validation

Check results:
```bash
node -e "const data = require('./simba_products_enriched.json'); const broken = data.products.filter(p => !p.image || p.image.includes('eskalate')); console.log('Still broken:', broken.length); console.log('Fixed:', data.products.length - broken.length);"
```
