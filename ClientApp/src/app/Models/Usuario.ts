import { Contato } from "./Contato"

export interface Usuario {
  id: number
  nome: string
  login: string
  email: string
  perfil?: number
  senha: string
  dataCadastro?: string
  dataAtualizalcao?: string
  contatos?: Contato[]
}
