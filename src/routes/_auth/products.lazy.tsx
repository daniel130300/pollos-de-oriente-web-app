import { createLazyFileRoute } from '@tanstack/react-router'
import Products from '../../components/pages/Products'

export const Route = createLazyFileRoute('/_auth/products')({
  component: Products
})