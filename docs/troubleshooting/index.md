# Troubleshooting

Common issues and solutions for DClaw Deploy.

## Quick Diagnostics

```bash
# Check app pods
kubectl get pods -n dclaw-deploy

# Check logs
kubectl logs -n dclaw-deploy deployment/dclaw-deploy-backend

# Check database
kubectl get clusters -n dclaw-deploy
```

## Sections

- [Common Issues](./common-issues)
- [FAQ](./faq)
