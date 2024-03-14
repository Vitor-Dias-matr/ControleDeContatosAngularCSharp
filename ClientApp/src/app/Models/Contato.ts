import { Usuario } from "./Usuario";

export interface Contato {
  id: number;
  nome: string;
  email: string;
  celular: string;
  usuarioId: number;
  usuario?: Usuario;
}
