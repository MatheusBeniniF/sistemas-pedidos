import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios, { AxiosError } from 'axios'
import { useToast } from 'vue-toast-notification'

interface ApiResponse {
  message: string
}

const API_URL = 'http://localhost:3000/products'

const fetchProducts = async () => {
  const { data } = await axios.get(API_URL)
  return data.products
}

const createProduct = async (product) => {
  const { data } = await axios.post(API_URL, product)
  return data
}

const updateProduct = async (id, product) => {
  const { data } = await axios.put(`${API_URL}/${id}`, product)
  return data
}

const deleteProduct = async (id) => {
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
      queryClient.invalidateQueries(['products'])
      toast.success(data.message, { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error?.response?.data?.message || 'Erro desconhecido', { position: 'top-right' })
    },
  })
}

export function useEditProduct() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, product }) => updateProduct(id, product),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products'])
      toast.success(data.message, { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data?.message || 'Erro desconhecido', { position: 'top-right' })
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products'])
      toast.success(data.message, { position: 'top-right' })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Erro desconhecido', { position: 'top-right' })
    },
  })
}
