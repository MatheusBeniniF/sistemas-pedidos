import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios, { AxiosError } from 'axios'
import { useToast } from 'vue-toast-notification'

interface ApiResponse {
  error: string
}

interface Product {
  id: number
  name: string
  price: number
}

const API_URL = 'http://localhost:3000/products'

const fetchProducts = async () => {
  const { data } = await axios.get(API_URL)
  return data.products
}

const createProduct = async (product: Product) => {
  const { data } = await axios.post(API_URL, product)
  return data
}

const updateProduct = async (id: number, product: Product) => {
  const { data } = await axios.put(`${API_URL}/${id}`, product)
  return data
}

const deleteProduct = async (id: number) => {
  const { data } = await axios.delete(`${API_URL}/${id}`)
  return data
}

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success(data.message, { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data.error || 'Erro desconhecido', { position: 'top-right' })
    },
  })
}

export function useEditProduct() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: Product }) => updateProduct(id, product),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success(data.message, { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data.error || 'Erro desconhecido', { position: 'top-right' })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success(data.message, { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      const errorMessage = error.response?.data.error || 'Erro desconhecido'
      toast.error(errorMessage, { position: 'top-right' })
    },
  })
}
