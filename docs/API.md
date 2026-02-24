# API Documentation

## Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Products
- `GET /api/products`
- `GET /api/products/my-products`
- `POST /api/products/activate`

## Workflows
- `GET /api/workflows`
- `POST /api/workflows/:workflow_id/execute`
- `GET /api/workflows/:workflow_id/executions`

## Payments
- `POST /api/payments/stripe/checkout`
- `POST /api/payments/razorpay/order`
- `POST /api/payments/razorpay/verify`

## Admin
- `GET /api/admin/users`
- `GET /api/admin/revenue`


## Automation Marketplace
- `GET /api/automations` (frontend-only catalog in this scaffold)
- `POST /api/automation/request`
- `GET /api/automation/my-requests`
- `GET /api/projects`
- `POST /api/ai/chat`
