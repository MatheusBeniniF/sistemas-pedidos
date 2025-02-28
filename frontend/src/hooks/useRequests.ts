import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios, { AxiosError } from 'axios'
import { useToast } from 'vue-toast-notification'

interface OrderResponse {
  message: string
}

interface ApiResponse {
  error: string
  message: string
}

interface Order {
  id: number
}

interface OrderItem {
  id: number
  request_id: number
  product_id: number
  quantity: number
}

const API_URL = import.meta.env.VITE_API_URL
const API_ORDERS = `${API_URL}/requests`
const API_ORDER_ITEMS = `${API_URL}/requests-items`


const createOrder = async (clientId: number) => {
  const { data } = await axios.post(API_ORDERS, {
    client_id: clientId,
  })
  return data
}

const editOrder = async (id: number, order: Order) => {
  const { data } = await axios.put(`${API_ORDERS}/${id}`, {
    id,
    client_id: order.id,
  })
  return data
}

export function useOrders() {
  return useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const { data } = await axios.get(API_ORDERS)
      return data.requests
    },
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      toast.success(data.message, { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data.error || 'Erro ao criar pedido.', { position: 'top-right' })
    },
  })
}

export function useEditOrder() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: ({ id, order }: { id: number; order: Order }) => editOrder(id, order),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      toast.success(data.message || 'Pedido atualizado com sucesso!', { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data.error || 'Erro ao atualizar pedido.', {
        position: 'top-right',
      })
    },
  })
}

const editOrderItem = async (orderItem: OrderItem) => {
  const { data } = await axios.put(`${API_ORDER_ITEMS}/${orderItem.request_id}`, {
    id: orderItem.id,
    request_id: orderItem.request_id,
    product_id: orderItem.product_id,
    quantity: orderItem.quantity
  })
  return data
}

export function useEditOrderItem() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: editOrderItem,
    onSuccess: (data: OrderResponse) => {
      queryClient.invalidateQueries({ queryKey: ['order-items'] })
      toast.success(data.message || 'Item do pedido atualizado com sucesso!', {
        position: 'top-right',
      })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data.error || 'Erro ao atualizar item do pedido.', {
        position: 'top-right',
      })
    },
  })
}

export function useDeleteOrder() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id) => axios.delete(`${API_ORDERS}/${id}`),
    onSuccess: (data: OrderResponse) => {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      toast.success(data.message || 'Pedido excluído com sucesso!', { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data?.message || 'Erro ao excluir pedido.', {
        position: 'top-right',
      })
    },
  })
}

export async function useOrderItems() {
  const { data } = await axios.get(API_ORDER_ITEMS)
  return data.requests_item
}

export function useOrderItem(orderId: number | undefined) {
  return useQuery({
    queryKey: ['order-items', orderId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_ORDER_ITEMS}/${orderId}`)
      return [data]
    },
  })
}

export function useCreateOrderItem() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (newItem) => axios.post(API_ORDER_ITEMS, newItem),
    onSuccess: (data: OrderResponse) => {
      queryClient.invalidateQueries({ queryKey: ['order-items'] })
      toast.success(data.message || 'Item do pedido adicionado com sucesso!', {
        position: 'top-right',
      })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data.error || 'Erro ao adicionar item do pedido.', {
        position: 'top-right',
      })
    },
  })
}

export function useDeleteOrderItem() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id) => axios.delete(`${API_ORDER_ITEMS}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-items'] })
      toast.success('Item do pedido excluído com sucesso!', { position: 'top-right' })
    },
    onError: () => {
      toast.error('Erro ao excluir item do pedido.', { position: 'top-right' })
    },
  })
}
