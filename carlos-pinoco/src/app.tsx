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

import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from './components/ui/input'

type Product = {
  name: string
  description: string
  id: string
  price: string
}

export const App = () => {
  const [products, setProducts] = useState<Product[]>()
  // const [currentOpenId, setCurrentOpenId] = useState('')

  const [newProductName, setNewProductName] = useState('')
  const [newProductDescription, setNewProductDescription] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')

  const fetchProducts = async () => {
    const { data } = await api.get('/products')
    const productList = data.reverse()
    setProducts(productList)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  console.log(products)

  const handleDeleteProduct = async (productId: string) => {
    await api.delete(`/products/${productId}`)

    await fetchProducts()
  }

  const handleEditProduct = async (productId: string) => {
    await api.put(`/products/${productId}`, {
      name: newProductName,
      description: newProductDescription,
      price: newProductPrice,
    })

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

                          <Dialog>
                            <DialogTrigger
                              asChild
                              // onClick={() => setCurrentOpenId(product.id)}
                            >
                              <Button
                                variant='secondary'
                                className='w-24'
                              >
                                Editar
                              </Button>
                            </DialogTrigger>

                            <DialogContent className='bg-zinc-900 border-zinc-500'>
                              <div className='flex flex-col gap-2'>
                                <Input
                                  placeholder='Nome'
                                  onChange={(e) => setNewProductName(e.target.value)}
                                  value={newProductName}
                                  className='text-zinc-100'
                                />
                                <Input
                                  placeholder='Preço'
                                  onChange={(e) => setNewProductPrice(e.target.value)}
                                  value={newProductPrice}
                                  className='text-zinc-100'
                                />
                                <Input
                                  placeholder='Descrição'
                                  onChange={(e) => setNewProductDescription(e.target.value)}
                                  value={newProductDescription}
                                  className='text-zinc-100'
                                />

                                <DialogClose asChild>
                                  <Button
                                    onClick={() => handleEditProduct(product.id)}
                                    variant='secondary'
                                  >
                                    Editar
                                  </Button>
                                </DialogClose>
                              </div>
                            </DialogContent>
                          </Dialog>
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
