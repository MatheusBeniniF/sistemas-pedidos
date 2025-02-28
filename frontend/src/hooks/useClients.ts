import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios, { AxiosError } from 'axios'
import { useToast } from 'vue-toast-notification'

interface ApiResponse {
  error: string
  message: string
}

interface Client {
  id: number
  name: string
  email: string
}

const API_URL = import.meta.env.VITE_API_URL
const CLIENTS_URL = `${API_URL}/clients`

const createCliente = async (client: Client) => {
  const { data } = await axios.post(CLIENTS_URL, client)
  return data
}

const updateClient = async ({ id, client }: { id: number; client: Client }) => {
  const { data } = await axios.put(`${CLIENTS_URL}/${id}`, client)
  return data
}

const deleteClient = async (id: number) => {
  const { data } = await axios.delete(`${CLIENTS_URL}/${id}`)
  return data
}

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data } = await axios.get(CLIENTS_URL)
      return data.clients
    },
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: createCliente,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success(data.message || 'Cliente criado com sucesso!', { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data.error || 'Erro ao criar cliente.', { position: 'top-right' })
    },
  })
}

export function useEditClient() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: updateClient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success(data.message || 'Cliente atualizado com sucesso!', { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data.error || 'Erro ao atualizar cliente.', {
        position: 'top-right',
      })
    },
  })
}

export function useDeleteClient() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: deleteClient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      toast.success(data.message || 'Cliente excluído com sucesso!', { position: 'top-right' })
    },
    onError: (error: AxiosError<ApiResponse>) => {
      toast.error(error.response?.data.error || 'Erro ao excluir cliente.', {
        position: 'top-right',
      })
    },
  })
}
