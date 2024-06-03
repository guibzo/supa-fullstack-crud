import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { api } from './lib/axios'

type EditProductProps = {
  onEditProduct: () => void
  productId: string
}

export const EditProduct = ({ onEditProduct, productId }: EditProductProps) => {
  const [newProductName, setNewProductName] = useState('')
  const [newProductDescription, setNewProductDescription] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')

  const handleEditProduct = async (productId: string) => {
    await api.put(`/products/${productId}`, {
      name: newProductName,
      description: newProductDescription,
      price: newProductPrice,
    })

    onEditProduct()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
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
              onClick={() => handleEditProduct(productId)}
              variant='secondary'
            >
              Editar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
