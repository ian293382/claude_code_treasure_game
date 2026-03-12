# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a multi-project development workspace. Each subdirectory is a separate project. Key projects:

| Directory | Type | Stack |
|-----------|------|-------|
| `claude_code_treasure_game/` | Game | React + TypeScript + Vite |
| `snake_game/` | Game | Vanilla JS + Python server |
| `dev_portal/` | Web SPA | Vue 3 + TypeScript + Vite |
| `enterprise_portal/` | Web App | Multi-package Node.js (Express + frontend) |
| `cashub_terraform/` | Infrastructure | Terraform (AWS) |
| `dev_service/` | Service | Docker + PKCS11/HSM |
| `ian_wallet/` | Payment Gateway | CI/CD via Drone |

---

## Project Commands

### claude_code_treasure_game (React/Vite)
```bash
npm run dev       # Start dev server
npm run build     # Production build
```

### snake_game
```bash
python3 server.py  # Start server on port 3000
```

### dev_portal (Vue 3/Vite)
```bash
npm run dev        # Start dev server
npm run build      # Production build (type-check + vite build)
npm run build-only # Vite build only
npm run type-check # TypeScript validation only
npm run lint       # ESLint + Prettier + Stylelint
```
- Pre-commit hooks via Husky + lint-staged enforce linting on staged files
- Use `git cz` (Commitizen) for structured commit messages

### enterprise_portal (multi-package)
```bash
npm run dev    # Dev server (runs app/)
npm start      # Production start (runs app/)
npm run build  # Production build (runs portal/)
```

### cashub_terraform (AWS Infrastructure)
- Run terraform scripts in numerical order
- Configure global variables before applying
- Modules: EC2, RDS, ElastiCache, Route53, ACM, ALB, CloudFront, VPC, EKS

### dev_service (Docker)
- See `dev_service/README.md` for the full docker run command
- Requires mounted config files and PKCS11 certificates for HSM (FutureX) integration

---

## Architecture Notes

### dev_portal
- Vue 3 SPA with Pinia for state management
- VXE-Table for data grids, ECharts fo charts, rich text editors
- TypeScript throughout; strict linting enforced

### enterprise_portal
- Monorepo: `app/` is an Express backend, `portal/` is the frontend build
- Started via `app/bin/www`

### cashub_terraform
- Multi-environment (Dev, UAT, Staging, Prod) and multi-region (APAC, EU, US)
- Covers CasHUB, Elavon, SoftPOS, and QRSOnline deployment infrastructure

### dev_service
- Docker container with cryptographic certificate support
- Integrates with FutureX HSM via PKCS11
