import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { AddProduct } from './add-product'
import { Button } from './components/ui/button'
import { api } from './lib/axios'

import { EditProduct } from './edit-product'

type Product = {
  name: string
  description: string
  id: string
  price: string
}

export const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>()

  const fetchProducts = async () => {
    const { data } = await api.get('/products')
    const productList = data.reverse()
    setProducts(productList)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteProduct = async (productId: string) => {
    await api.delete(`/products/${productId}`)

    await fetchProducts()
  }

  return (
    <div className='bg-zinc-950 text-zinc-100 w-full min-h-screen flex items-center'>
      <main className='items-center max-w-6xl w-full justify-center p-5 mx-auto flex h-full flex-col gap-10'>
        <AddProduct onAddProduct={fetchProducts} />

        <Table className='max-h-[600px] overflow-y-scroll'>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className='text-right mr-40'>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='overflow-y-scroll max-h-[500px]'>
            {products && products.length > 0 && (
              <>
                {products.map((product: Product) => {
                  return (
                    <TableRow key={product.id}>
                      <TableCell className='font-medium'>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell className='text-right'>
                        <div className='flex gap-2 items-center justify-end'>
                          <Button
                            variant='destructive'
                            className='w-24'
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Deletar
                          </Button>

                          <EditProduct
                            onEditProduct={fetchProducts}
                            productId={product.id}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </>
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}
