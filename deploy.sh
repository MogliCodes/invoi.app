#!/bin/bash
sudo git pull origin main
sudo pnpm install
sudo pnpm build
echo "Deployment complete"