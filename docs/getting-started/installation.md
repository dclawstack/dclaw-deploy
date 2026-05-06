# Installation

## Via DPanel

1. Open DPanel at `https://panel.yourdomain.com`
2. Find **DClaw Deploy** in the app grid
3. Click **Install**
4. The DClaw Operator will provision:
   - Namespace: `dclaw-deploy`
   - Frontend deployment (Next.js)
   - Backend deployment (FastAPI)
   - PostgreSQL database (CloudNativePG)
   - Ingress with TLS

## Via kubectl

```bash
# Apply the DClawApp CRD
kubectl apply -f - <<EOF
apiVersion: platform.dclaw.io/v1
kind: DClawApp
metadata:
  name: deploy
spec:
  appId: deploy
  appName: DClaw Deploy
  version: 0.1.0
  category: devops
  enabled: true
  frontend:
    image: ghcr.io/dclawstack/dclaw-deploy:latest
    replicas: 2
  backend:
    image: ghcr.io/dclawstack/dclaw-deploy-backend:latest
    replicas: 2
  database:
    enabled: true
    storage: 10Gi
  ingress:
    enabled: true
    host: deploy.yourdomain.com
    tls: true
EOF
```

## Verify

```bash
kubectl get pods -n dclaw-deploy
kubectl get ingress -n dclaw-deploy
```
