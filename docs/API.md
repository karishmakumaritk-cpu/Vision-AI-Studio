# API Documentation

## Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/refresh`

## Products
- `GET /api/products`
- `GET /api/products/my-products`
- `POST /api/products/activate`
- `DELETE /api/products/:user_product_id`

## Workflows
- `GET /api/workflows`
- `POST /api/workflows/:workflow_id/execute`
- `GET /api/workflows/:workflow_id/executions`
- `PATCH /api/workflows/:workflow_id/toggle`
- `GET /api/workflows/usage-stats`

## Payments
- `POST /api/payments/stripe/checkout`
- `POST /api/payments/razorpay/order`
- `POST /api/payments/razorpay/verify`
- `POST /api/payments/stripe/webhook`

## Admin
- `GET /api/admin/users`
- `GET /api/admin/revenue`
- `PATCH /api/admin/subscription/toggle`
