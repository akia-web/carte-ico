import { typeToast } from '@/app/provider/toastProvider';
import { UserDto } from '@/app/interfaces/user.dto';

export interface UserContextType {
   setIsConnected: (value: boolean) => void;
  user: UserDto | null,
  isConnected: boolean,
  setConnectedUser:(user: UserDto | null) => void,
}