#!/usr/bin/env bash
set -euo pipefail

mkdir -p public/images

curl -L "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=80&auto=format&fit=crop" -o public/images/hero-dashboard.jpg
curl -L "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80&auto=format&fit=crop" -o public/images/instagram-growth.jpg
curl -L "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80&auto=format&fit=crop" -o public/images/whatsapp-reply.jpg
curl -L "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=900&q=80&auto=format&fit=crop" -o public/images/voice-assistant.jpg
curl -L "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&q=80&auto=format&fit=crop" -o public/images/email-automation.jpg
curl -L "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop" -o public/images/ecommerce-orders.jpg
curl -L "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop" -o public/images/customer-support.jpg

echo "Downloaded landing page images into public/images"
