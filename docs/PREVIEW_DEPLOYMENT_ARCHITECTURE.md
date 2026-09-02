# Preview & Deployment Architecture

## Overview
The preview and deployment architecture enables secure, isolated preview environments for customer review before final delivery. The system uses Cloudflare Workers for edge deployment, Cloudinary for asset storage, and token-based access control for security.

---

## Architecture Diagram

```
Developer Repository
       ↓
Build Process (CI/CD)
       ↓
Build Artifacts
       ↓
Cloudflare Workers Deployment
       ↓
Isolated Preview Environment
       ↓
Token-Based Access Control
       ↓
Customer Browser (with Preview Protection)
```

---

## Preview System

### Preview Environment

**Technology Stack:**
- **Platform**: Cloudflare Workers
- **Storage**: Cloudflare KV (for static assets)
- **CDN**: Cloudflare CDN
- **DNS**: Cloudflare DNS
- **SSL**: Automatic SSL certificates

**Preview URL Structure:**
```
https://preview-{project-id}-{version}.ferixbuilder.com
https://preview-{project-id}-{version}.workers.ferixbuilder.com
```

### Preview Creation Flow

```
1. Admin triggers preview creation
       ↓
2. System builds project (or uses existing build)
       ↓
3. Deploy to Cloudflare Workers
       ↓
4. Generate access token
       ↓
5. Set expiration (default 72 hours)
       ↓
6. Store preview record in database
       ↓
7. Notify customer
       ↓
8. Customer accesses via tokenized URL
```

### Preview Protection

**Client-Side Protections:**
- No screenshots (browser API detection)
- No text selection/copying
- No right-click context menu
- No keyboard shortcuts (PrintScreen, Ctrl+C, Ctrl+S, F12)
- Watermark overlay
- DevTools detection deterrent

**Server-Side Protections:**
- Token-based authentication
- URL expiration
- IP-based rate limiting
- Referrer checking
- User-agent validation

**Implementation:**
```typescript
// Preview protection middleware
export async function validatePreviewAccess(
  previewId: string,
  token: string,
  request: Request
): Promise<boolean> {
  const preview = await prisma.previewVersion.findUnique({
    where: { id: previewId },
  });
  
  if (!preview) return false;
  if (preview.accessToken !== token) return false;
  if (new Date() > preview.expiresAt) return false;
  
  // Additional checks
  const ip = request.headers.get("cf-connecting-ip");
  const referrer = request.headers.get("referer");
  
  // Validate referrer (optional)
  if (referrer && !referrer.includes("ferixbuilder.com")) {
    return false;
  }
  
  return true;
}
```

### Preview Version Management

**Version Naming:**
- v0.1, v0.2, v0.3, ... (development previews)
- v1.0 (final preview)

**Version Lifecycle:**
```
Created → Building → Ready → Expired → Archived
```

**Preview Metadata:**
```typescript
interface PreviewVersion {
  id: string;
  projectId: string;
  version: string;
  releaseNotes: string;
  changes: PreviewChange[];
  knownIssues?: string;
  previewUrl: string;
  accessToken: string;
  expiresAt: Date;
  reviewStatus: "PENDING" | "APPROVED" | "CHANGES_REQUESTED";
}
```

---

## Deployment Architecture

### Deployment Types

#### 1. Preview Deployment
- **Purpose**: Customer review
- **Environment**: Isolated, temporary
- **URL**: Token-based, expires after 72 hours
- **Access**: Customer only
- **Protection**: Full preview protection enabled

#### 2. Staging Deployment
- **Purpose**: Internal testing
- **Environment**: Stable, persistent
- **URL**: Internal subdomain
- **Access**: Admin team only
- **Protection**: Basic authentication

#### 3. Production Deployment
- **Purpose**: Final live site
- **Environment**: Production-grade
- **URL**: Customer's domain
- **Access**: Public
- **Protection**: None (after payment)

### Production Deployment Flow

```
1. Final payment confirmed
       ↓
2. Final approval received
       ↓
3. Source code packaged
       ↓
4. Deploy to production environment
       ↓
5. Configure customer domain
       ↓
6. SSL certificate provisioned
       ↓
7. DNS configured
       ↓
8. Monitoring enabled
       ↓
9. Handover documentation provided
```

---

## Cloudflare Workers Setup

### Worker Configuration

```typescript
// worker/index.ts
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Validate access token
    const token = url.searchParams.get("token");
    const previewId = url.searchParams.get("previewId");
    
    if (!token || !previewId) {
      return new Response("Unauthorized", { status: 401 });
    }
    
    const isValid = await validatePreviewAccess(previewId, token, request);
    if (!isValid) {
      return new Response("Unauthorized", { status: 401 });
    }
    
    // Serve static assets from KV
    const path = url.pathname;
    const asset = await env.ASSETS.get(path);
    
    if (asset) {
      return new Response(asset, {
        headers: {
          "Content-Type": getContentType(path),
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
    
    // Serve index.html for SPA routes
    const index = await env.ASSETS.get("/index.html");
    return new Response(index, {
      headers: { "Content-Type": "text/html" },
    });
  },
};
```

### Environment Variables

```toml
# wrangler.toml
name = "ferixbuilder-preview"
main = "worker/index.ts"
compatibility_date = "2024-01-01"

[vars]
ENVIRONMENT = "preview"

[[kv_namespaces]]
binding = "ASSETS"
id = "kv_namespace_id"
preview_id = "kv_preview_id"
```

### Deployment Script

```typescript
// scripts/deploy-preview.ts
import { deployPreview } from "./cloudflare";

export async function deployPreviewToCloudflare(
  projectId: string,
  version: string,
  buildPath: string
): Promise<string> {
  // Upload assets to KV
  const assets = await uploadAssetsToKV(buildPath);
  
  // Deploy worker
  const workerUrl = await deployWorker({
    name: `preview-${projectId}-${version}`,
    script: "./worker/index.ts",
    vars: {
      PREVIEW_ID: projectId,
      VERSION: version,
    },
  });
  
  // Configure custom domain (optional)
  const domain = `preview-${projectId}-${version}.ferixbuilder.com`;
  await configureCustomDomain(workerUrl, domain);
  
  return domain;
}
```

---

## Asset Management

### Asset Upload Flow

```
1. Build project generates static assets
       ↓
2. Assets uploaded to Cloudinary
       ↓
3. Assets synced to Cloudflare KV
       ↓
4. CDN caching configured
       ↓
5. Assets served from edge
```

### Asset Optimization

**Image Optimization:**
- Automatic format conversion (WebP, AVIF)
- Responsive image generation
- Lazy loading support
- Compression optimization

**Code Optimization:**
- JavaScript minification
- CSS minification
- Tree shaking
- Code splitting

### Asset Caching Strategy

```
Static Assets (JS, CSS, Images):
  - Cache: 1 year
  - Version: URL-based (filename hash)

HTML:
  - Cache: 1 hour
  - ETag: Content hash

API Responses:
  - Cache: 5 minutes
  - Vary: Authorization header
```

---

## Security Measures

### Preview Security

1. **Token-Based Access**
   - Unique token per preview
   - Token expiration (72 hours default)
   - Token rotation on suspicious activity

2. **IP-Based Restrictions**
   - Rate limiting per IP
   - IP whitelist (optional)
   - Geographic restrictions (optional)

3. **Referrer Validation**
   - Validate referrer header
   - Prevent hotlinking
   - Allowlist trusted domains

4. **User-Agent Validation**
   - Block suspicious user agents
   - Detect bots and scrapers
   - Allowlist legitimate browsers

### Production Security

1. **SSL/TLS**
   - Automatic SSL certificates
   - HSTS enabled
   - Certificate monitoring

2. **DDoS Protection**
   - Cloudflare DDoS protection
   - Rate limiting
   - Challenge pages

3. **WAF Rules**
   - SQL injection protection
   - XSS protection
   - CSRF protection

4. **Access Control**
   - IP whitelisting (optional)
   - Geographic restrictions (optional)
   - Basic authentication (staging)

---

## Monitoring & Logging

### Preview Monitoring

**Metrics Tracked:**
- Preview access count
- Preview duration
- Error rates
- Performance metrics
- User engagement

**Alerts:**
- Preview expiration warnings
- High error rates
- Performance degradation
- Security incidents

### Production Monitoring

**Metrics Tracked:**
- Uptime
- Response times
- Error rates
- Traffic patterns
- Resource usage

**Alerts:**
- Downtime
- High error rates
- Performance issues
- Security incidents

### Logging

**Log Types:**
- Access logs
- Error logs
- Security logs
- Deployment logs
- Performance logs

**Log Retention:**
- Preview logs: 30 days
- Production logs: 90 days
- Security logs: 1 year

---

## Disaster Recovery

### Backup Strategy

**Preview Backups:**
- Daily snapshots of KV storage
- Worker configuration backups
- DNS configuration backups

**Production Backups:**
- Daily database backups
- Asset backups
- Configuration backups
- Disaster recovery plan

### Recovery Procedures

**Preview Recovery:**
1. Restore from backup
2. Redeploy worker
3. Update DNS
4. Notify stakeholders

**Production Recovery:**
1. Activate standby environment
2. Restore database
3. Restore assets
4. Update DNS
5. Notify stakeholders
6. Post-incident review

---

## Scaling Strategy

### Horizontal Scaling

**Cloudflare Workers:**
- Auto-scaling at edge
- No server management
- Global distribution
- Automatic load balancing

**Database:**
- Read replicas
- Connection pooling
- Query optimization
- Caching layer

### Vertical Scaling

**Resource Allocation:**
- CPU limits
- Memory limits
- Storage limits
- Bandwidth limits

---

## Cost Optimization

### Preview Costs

**Cost Factors:**
- Worker requests
- KV storage
- Bandwidth
- DNS queries

**Optimization Strategies:**
- Cache static assets
- Minimize worker requests
- Use CDN effectively
- Compress assets

### Production Costs

**Cost Factors:**
- Worker requests
- KV storage
- Bandwidth
- DNS queries
- SSL certificates

**Optimization Strategies:**
- Cache aggressively
- Minimize requests
- Use CDN effectively
- Compress assets
- Monitor usage

---

## Future Enhancements

### Short-Term (3-6 months)

1. **Automated Testing**
   - E2E test integration
   - Visual regression testing
   - Performance testing

2. **Advanced Analytics**
   - User behavior tracking
   - Performance analytics
   - Error analytics

3. **Multi-Environment Support**
   - Development environment
   - Staging environment
   - Production environment

### Long-Term (6-12 months)

1. **Kubernetes Integration**
   - Container orchestration
   - Auto-scaling
   - Service mesh

2. **Advanced CI/CD**
   - Automated deployments
   - Rollback capabilities
   - Blue-green deployments

3. **Edge Computing**
   - Edge functions
   - Edge caching
   - Edge security

---

## Implementation Checklist

### Phase 1: Basic Preview System
- [ ] Set up Cloudflare Workers account
- [ ] Configure KV storage
- [ ] Implement preview deployment script
- [ ] Create preview access middleware
- [ ] Implement preview protection
- [ ] Test preview creation flow

### Phase 2: Production Deployment
- [ ] Set up production environment
- [ ] Configure custom domains
- [ ] Implement SSL certificates
- [ ] Set up DNS configuration
- [ ] Implement deployment automation
- [ ] Test production deployment

### Phase 3: Monitoring & Security
- [ ] Set up monitoring
- [ ] Configure alerts
- [ ] Implement logging
- [ ] Set up security measures
- [ ] Configure rate limiting
- [ ] Test security measures

### Phase 4: Optimization
- [ ] Implement caching
- [ ] Optimize assets
- [ ] Configure CDN
- [ ] Implement compression
- [ ] Test performance
- [ ] Optimize costs

---

## Troubleshooting

### Common Issues

**Preview Not Accessible:**
1. Check token validity
2. Check expiration time
3. Check worker status
4. Check KV storage
5. Check DNS configuration

**Slow Preview Performance:**
1. Check CDN caching
2. Check asset optimization
3. Check worker performance
4. Check network latency
5. Check resource limits

**Deployment Failures:**
1. Check build logs
2. Check worker configuration
3. Check KV storage limits
4. Check API rate limits
5. Check authentication

---

## Documentation

**Developer Documentation:**
- Preview deployment guide
- Production deployment guide
- Troubleshooting guide
- API documentation

**Customer Documentation:**
- Preview access guide
- Preview protection explanation
- Production handover guide
- Support contact information
