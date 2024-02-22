import { createLazyFileRoute } from '@tanstack/react-router'
import AddProduct from '../../components/pages/AddProduct'

export const Route = createLazyFileRoute('/_auth/add-product')({
  component: AddProduct
})