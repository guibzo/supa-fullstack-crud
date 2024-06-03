import { useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { api } from './lib/axios'

type AddProductProps = {
  onAddProduct: () => void
}

export const AddProduct = ({ onAddProduct }: AddProductProps) => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const handleAddProduct = async () => {
    setIsAddingProduct(true)

    await api.post('/products', {
      name: productName,
      price: productPrice,
      description: productDescription,
    })

    setProductDescription('')
    setProductPrice('')
    setProductName('')
    setIsAddingProduct(false)
    onAddProduct()
  }

  return (
    <div className='flex flex-col gap-2 min-h-[50vh] justify-center'>
      <h1 className='text-3xl'>Adicionar produto</h1>

      <Input
        placeholder='Nome'
        onChange={(e) => setProductName(e.target.value)}
        value={productName}
      />
      <Input
        placeholder='Preço'
        onChange={(e) => setProductPrice(e.target.value)}
        value={productPrice}
      />
      <Input
        placeholder='Descrição'
        onChange={(e) => setProductDescription(e.target.value)}
        value={productDescription}
      />

      <Button
        onClick={handleAddProduct}
        disabled={isAddingProduct}
      >
        Adicionar
      </Button>
    </div>
  )
}
